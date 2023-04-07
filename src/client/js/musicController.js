// ! Play Controlls
export const togglePlayer = (player, playToggleIcon) => {
  if (player.getPlayerState() == YT.PlayerState.PLAYING) {
    player.pauseVideo();
    changePlayIcon(playToggleIcon, "paused"); // ? 필요없지만 빠른 반응을 위하여 임시 추가
  } else {
    player.playVideo();
    changePlayIcon(playToggleIcon, "played"); // ? 필요없지만 빠른 반응을 위하여 임시 추가
  }
};

export const changePlayIcon = (icon, status) => {
  if (status === "played") {
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  } else if (status === "paused") {
    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");
  } else {
    console.error(`I don't know this status : ${status}`);
  }
};

// ! Volume Controlls

const SAVED_VOLUME_KEY = "savedVolume";

const saveVolume = (volume) => {
  localStorage.setItem(SAVED_VOLUME_KEY, volume);
};
export const getSavedVolume = () => {
  const savedVolume = localStorage.getItem(SAVED_VOLUME_KEY);
  return savedVolume ? savedVolume : 50;
};

export const volumeSeekPlayer = (player, value) => {
  player.setVolume(value);
};

export const isInputDragging = (volumInput) => {
  return volumInput.changing === true;
};

// ? INIT
export const initVolumeController = (volumInput, player) => {
  volumInput.changing = false;

  volumInput.addEventListener("mousedown", () => {
    volumInput.changing = true;
  });
  volumInput.addEventListener("mouseup", () => {
    volumInput.changing = false;
  });
  volumInput.addEventListener("input", () => {
    setInputColor(volumInput);
    if (volumInput.value === "0") {
      player.setVolume(0);
      player.mute();
      return;
    }
    volumeSeekPlayer(player, volumInput.value);
    player.unMute();
  });
  volumInput.addEventListener("change", () => {
    volumInput.changing = true;
    setInputColor(volumInput);
    if (volumInput.value === "0") {
      player.setVolume(0);
      player.mute();
    } else {
      volumeSeekPlayer(player, volumInput.value);
      saveVolume(volumInput.value);
    }
    volumInput.changing = false;
  });

  setInterval(function () {
    if (!volumInput.changing) {
      const volume = player.getVolume();
      if (!(volume < -1)) {
        volumInput.value = player.getVolume();
        saveVolume(volumInput.value);
      }
      setInputColor(volumInput);
    }
  }, 1000 / 10); // 1초에 10번
};

// ! Progress Controlls

export const progressSeekPlayer = (player, value) => {
  player.seekTo(value, true);
};
export const isProgressDragging = (progressInput) => {
  return progressInput.changing === true;
};

function getFormatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export const setCurTime = (progress) => {
  const curTimeSpan = progress.querySelector(".music-progress__cur-time");
  const curTime = progress.querySelector(".music-progress__controller").value;
  curTimeSpan.innerText = getFormatTime(Math.ceil(curTime));
};
export const setMaxTime = (progress, player) => {
  const maxTimeSpan = progress.querySelector(".music-progress__max-time");
  const maxTime = player.getDuration();
  maxTimeSpan.innerText = getFormatTime(maxTime);
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
      } else {
        progressSeekPlayer(player, progressInput.value);
      }
    } else {
      progressInput.value = 0;
    }
    progressInput.changing = false;
  });

  setInterval(function () {
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
  }, 1000 / 10); // 1초에 10번
};

// ! Volume + Progress
export const setInputColor = (progressInput) => {
  const beforeColor = "white";
  const afterColor = "rgba(255, 255, 255, 0.5)";

  const value = progressInput.value;
  const min = progressInput.min;
  const max = progressInput.max;
  const percentage = ((value - min) / (max - min)) * 100;
  progressInput.style.background = `linear-gradient(to right, ${beforeColor} 0%, ${beforeColor} ${percentage}%, ${afterColor} ${percentage}%, ${afterColor} 100%)`;
};
