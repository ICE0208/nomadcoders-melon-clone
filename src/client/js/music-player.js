import { musicSelectAnimation } from "./musicSelectAnimation";

let youtubePlayer;
const mcMusicThumbs = document.querySelectorAll(".mc-music-list__music__thumb");
const musicPlayer = document.querySelector(".player-container");

const loadNewMusic = (musicInfo) => {
  youtubePlayer.cueVideoById(musicInfo.ytID);
};

const loadFirstVideo = () => {
  const loadID = "VbS1yHZGmTY";
  youtubePlayer = new YT.Player("youtube-player", {
    width: "400",
    height: "400",
    videoId: loadID,
    events: {},
    playerVars: {
      disablekb: 1,
      controls: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      enablejsapi: 1,
      rel: 0,
    },
  });
  sessionStorage.setItem("currentMusicID", loadID);
};

export const musicPlayerInit = () => {
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  mcMusicThumbs.forEach((musicThumb) => {
    musicThumb.addEventListener("click", mcMusicThumbClickHandler);
  });
};

function onYouTubeIframeAPIReady() {
  loadFirstVideo();
}

const createVirtualImg = () => {
  const main = document.querySelector("main");
  const virtualImg = document.createElement("img");
  virtualImg.classList.add("virtual-img");
  main.appendChild(virtualImg);
  return virtualImg;
};

const mcMusicThumbClickHandler = (event) => {
  const music = event.target.closest(".mc-music-list__music");
  const musicInfo = JSON.parse(music.dataset.music);
  if (musicInfo.ytID === sessionStorage.getItem("currentMusicID")) {
    return;
  }
  sessionStorage.setItem("currentMusicID", musicInfo.ytID);

  const virtualImg = createVirtualImg();
  musicSelectAnimation(event.target, musicPlayer, virtualImg);

  setTimeout(() => {
    loadNewMusic(musicInfo);
  }, 550);
};
