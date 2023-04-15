import { moveToNextSong, moveToPreviousSong } from "./play-next";

// ! Play Controls
export const togglePlayer = (player, playToggleIcon) => {
  if (player.getPlayerState() == YT.PlayerState.PLAYING) {
    changePlayIcon(playToggleIcon, "paused"); // 빠른 반응을 위한 코드
    player.pauseVideo();
  } else {
    changePlayIcon(playToggleIcon, "played"); // 빠른 반응을 위한 코드
    player.playVideo();
  }
};

export const changePlayIcon = (icon, status) => {
  if (status === "played") {
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  } else if (status === "paused") {
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
  } else {
    console.error(`Unknown status: ${status}`);
  }
};

// ! Volume Controlls

const SAVED_VOLUME_KEY = "savedVolume";

const saveVolume = (volume) => {
  localStorage.setItem(SAVED_VOLUME_KEY, volume);
};

export const getSavedVolume = () => {
  const savedVolume = localStorage.getItem(SAVED_VOLUME_KEY);
  return savedVolume || 50;
};

const volumeSeekPlayer = (player, value) => {
  player.setVolume(value);
};

const isInputDragging = (volumeInput) => {
  return volumeInput.changing === true;
};

// INIT
export const initVolumeController = (volumeInput, player) => {
  volumeInput.changing = false;

  volumeInput.addEventListener("mousedown", () => {
    volumeInput.changing = true;
  });
  volumeInput.addEventListener("mouseup", () => {
    volumeInput.changing = false;
  });
  volumeInput.addEventListener("input", () => {
    setInputColor(volumeInput);
    const volume = parseInt(volumeInput.value, 10);
    if (volume === 0) {
      player.setVolume(0);
      player.mute();
    } else {
      volumeSeekPlayer(player, volume);
      player.unMute();
    }
  });
  volumeInput.addEventListener("change", () => {
    volumeInput.changing = true;
    setInputColor(volumeInput);
    const volume = parseInt(volumeInput.value, 10);
    if (volume === 0) {
      player.setVolume(0);
      player.mute();
    } else {
      volumeSeekPlayer(player, volume);
      saveVolume(volume);
    }
    volumeInput.changing = false;
  });

  const updateVolume = () => {
    if (!volumeInput.changing) {
      const volume = player.getVolume();
      if (!volume) {
        return;
      }
      if (!(volume < -1)) {
        volumeInput.value = volume;
        saveVolume(volume);
      }
      setInputColor(volumeInput);
    }
  };

  setInterval(updateVolume, 100);
};

// ! Progress Controls

const progressSeekPlayer = (player, value) => {
  player.seekTo(value, true);
};
const isProgressDragging = (progressInput) => {
  return progressInput.changing === true;
};

const getFormattedTime = (sec) => {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const setCurTime = (progress) => {
  const curTimeSpan = progress.querySelector(".music-progress__cur-time");
  const curTime = progress.querySelector(".music-progress__controller").value;
  curTimeSpan.innerText = getFormattedTime(Math.ceil(curTime));
};
export const setMaxTime = (progress, player) => {
  const maxTimeSpan = progress.querySelector(".music-progress__max-time");
  const maxTime = player.getDuration();
  maxTimeSpan.innerText = getFormattedTime(maxTime);
};

// ? INIT
export const initProgressController = (progress, player) => {
  const progressInput = progress.querySelector(".music-progress__controller");
  const curTime = progress.querySelector(".music-progress__cur-time");
  const maxTime = progress.querySelector(".music-progress__max-time");
  progressInput.changing = false;

  progressInput.addEventListener("mousedown", () => {
    if (player.playing) {
      progressInput.changing = true;
      player.pauseVideo();
    }
  });

  progressInput.addEventListener("mouseup", () => {
    if (player.playing) {
      progressInput.changing = false;
      player.playVideo();
    }
  });

  progressInput.addEventListener("input", () => {
    if (player.playing) {
      setInputColor(progressInput);
      if (progressInput.value > progressInput.max - 1) {
        return;
      }
      progressSeekPlayer(player, progressInput.value);
    }
  });

  progressInput.addEventListener("change", () => {
    progressInput.changing = true;
    if (player.playing) {
      setInputColor(progressInput);
      if (progressInput.value > progressInput.max - 1) {
        player.playing = false;
        player.stopVideo();
        curTime.innerText = maxTime.innerText;
        moveToNextSong("auto");
      } else {
        progressSeekPlayer(player, progressInput.value);
      }
    } else {
      progressInput.value = 0;
    }
    progressInput.changing = false;
  });

  const updateProgress = () => {
    if (
      player.getPlayerState() === YT.PlayerState.PLAYING &&
      !progressInput.changing
    ) {
      const progress = player.getCurrentTime();
      progressInput.value = progress;
    }
    setInputColor(progressInput);
    setCurTime(progress);

    if (player.playing) {
      progressInput.disabled = false;
    } else {
      progressInput.disabled = true;
    }
  };

  setInterval(updateProgress, 100);
};

// ! Volume + Progress
export const setInputColor = (progressInput) => {
  const beforeColor = "rgb(255, 255, 255)";
  const afterColor = "rgba(255, 255, 255, 0.5)";

  const value = progressInput.value;
  const min = progressInput.min;
  const max = progressInput.max;
  const percentage = ((value - min) / (max - min)) * 100;
  progressInput.style.background = `linear-gradient(to right, ${beforeColor} 0%, ${beforeColor} ${percentage}%, ${afterColor} ${percentage}%, ${afterColor} 100%)`;
};

// ! Move to next, previous song
export const initNextSongController = () => {
  const nextSongIcon = document.querySelector(
    ".music-controll__after-music > i"
  );
  nextSongIcon.addEventListener("click", () => {
    moveToNextSong("auto");
  });
};
export const initPreviousSongController = () => {
  const nextSongIcon = document.querySelector(
    ".music-controll__before-music > i"
  );
  nextSongIcon.addEventListener("click", () => {
    moveToPreviousSong("auto");
  });
};

console.log("musicController.js");
