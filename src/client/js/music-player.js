import { musicSelectAnimation } from "./musicSelectAnimation";

let youtubePlayer;
const mcMusicThumbs = document.querySelectorAll(".mc-music-list__music__thumb");
const musicPlayer = document.querySelector(".player-container");

const loadNewMusic = (newYoutubeID) => {
  youtubePlayer.cueVideoById(newYoutubeID);
};

const loadFirstVideo = () => {
  youtubePlayer = new YT.Player("youtube-player", {
    width: "400",
    height: "400",
    videoId: "VbS1yHZGmTY",
    enablejsapi: 1,
    playerVars: {
      disablekb: 1,
      controls: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

const onPlayerReady = (event) => {};

const onPlayerStateChange = () => {};

const isItLoaded = () => {
  if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
    setTimeout(isItLoaded, 500);
    // initialize();
  } else {
    loadFirstVideo();
  }
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
  isItLoaded();
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

  const virtualImg = createVirtualImg();
  musicSelectAnimation(event.target, musicPlayer, virtualImg);

  setTimeout(() => {
    loadNewMusic(musicInfo.ytID);
  }, 550);
};
