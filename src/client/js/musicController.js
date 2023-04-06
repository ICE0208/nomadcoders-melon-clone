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
  return volumInput.dragging === true;
};

export const initVolumeController = (volumInput, player) => {
  volumInput.dragging = false;

  volumInput.addEventListener("mousedown", () => {
    volumInput.dragging = true;
  });
  volumInput.addEventListener("mouseup", () => {
    volumInput.dragging = false;
  });
  volumInput.addEventListener("input", () => {
    volumeSeekPlayer(player, volumInput.value);
    player.unMute();
  });
  volumInput.addEventListener("change", () => {
    volumeSeekPlayer(player, volumInput.value);
    saveVolume(volumInput.value);
  });

  setInterval(function () {
    if (!volumInput.dragging) {
      const volume = player.getVolume();
      if (!(volume < -1)) {
        volumInput.value = player.getVolume();
        saveVolume(volumInput.value);
      }
    }
  }, 1000 / 10); // 1초에 10번
};

// ! Progress Input

export const setProgressInputColor = (progressInput) => {
  const beforeColor = "white";
  const afterColor = "rgba(255, 255, 255, 0.5)";

  const value = progressInput.value;
  const min = progressInput.min;
  const max = progressInput.max;
  const percentage = ((value - min) / (max - min)) * 100;
  progressInput.style.background = `linear-gradient(to right, ${beforeColor} 0%, ${beforeColor} ${percentage}%, ${afterColor} ${percentage}%, ${afterColor} 100%)`;
};

export const progressSeekPlayer = (player, value) => {
  player.seekTo(value, true);
};
export const isProgressDragging = (progressInput) => {
  return progressInput.dragging === true;
};

export const initProgressController = (progressInput, player) => {
  progressInput.dragging = false;

  progressInput.addEventListener("mousedown", () => {
    progressInput.dragging = true;
  });

  progressInput.addEventListener("mouseup", () => {
    progressInput.dragging = false;
  });

  progressInput.addEventListener("input", () => {
    progressInput.dragging = true;
    // if (player.hasStarted) {
    //   if (progressInput.value > progressInput.max - 1) {
    //     return player.stopVideo();
    //   }
    //   progressSeekPlayer(player, progressInput.value);
    // }
    setProgressInputColor(progressInput);
  });

  progressInput.addEventListener("change", () => {
    if (player.hasStarted) {
      if (progressInput.value > progressInput.max - 1) {
        return player.stopVideo();
      }
      progressSeekPlayer(player, progressInput.value);
    } else {
      progressInput.value = 0;
    }
    setProgressInputColor(progressInput);
  });

  setInterval(function () {
    if (
      player.getPlayerState() === YT.PlayerState.PLAYING &&
      !progressInput.dragging
    ) {
      const progress = player.getCurrentTime();
      progressInput.value = progress;
    }
    setProgressInputColor(progressInput);
  }, 1000 / 10); // 1초에 10번
};
