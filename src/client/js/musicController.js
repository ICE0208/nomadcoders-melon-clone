export const togglePlayer = (player, playToggleIcon) => {
  if (player.getPlayerState() == YT.PlayerState.PLAYING) {
    player.pauseVideo();
    changePlayIcon(playToggleIcon, "paused");
  } else {
    player.playVideo();
    changePlayIcon(playToggleIcon, "played");
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
