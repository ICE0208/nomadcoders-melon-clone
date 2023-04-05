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
    console.log(`I don't know this status : ${status}`);
  }
};

// ! Volume Controlls
export const volumeSeekPlayer = (player, value) => {
  player.setVolume(value);
};

export const isInputDragging = (volumInput) => {
  return volumInput.dragging === true;
};

export const enableInputDragging = (volumInput, player) => {
  volumInput.dragging = false;

  volumInput.addEventListener("mousedown", () => {
    volumInput.dragging = true;
  });
  volumInput.addEventListener("mouseup", () => {
    console.log("end");
    volumInput.dragging = false;
  });
  volumInput.addEventListener("input", () => {
    volumeSeekPlayer(player, volumInput.value);
    player.unMute();
  });
  volumInput.addEventListener("change", () => {
    volumeSeekPlayer(player, volumInput.value);
    player.unMute();
  });

  setInterval(function () {
    if (!volumInput.dragging) {
      volumInput.value = player.getVolume();
    }
  }, 1000 / 30); // 1초에 30번
};
