import { musicSelectAnimation } from "./musicSelectAnimation";

let youtubePlayer;
const mcMusicThumbs = document.querySelectorAll(".mc-music-list__music__thumb");
const musicPlayer = document.querySelector(".player-container");

const CURRENT_MUSIC_ID_KEY = "currentMusicID";
const WILL_CHANGE_MUSIC_ID_KEY = "willChangeMusicID";
const FIRST_LOAD_MUSIC_ID = "VbS1yHZGmTY";

const loadNewMusic = (musicInfo) => {
  youtubePlayer.cueVideoById(musicInfo.ytID);
  sessionStorage.setItem(CURRENT_MUSIC_ID_KEY, musicInfo.ytID);
  youtubePlayer.hasStarted = false;
};

const loadFirstVideo = () => {
  sessionStorage.setItem(WILL_CHANGE_MUSIC_ID_KEY, FIRST_LOAD_MUSIC_ID);
  youtubePlayer = new YT.Player("youtube-player", {
    width: "400",
    height: "400",
    videoId: FIRST_LOAD_MUSIC_ID,
    events: {
      onStateChange: onplayerStateChange,
    },
    playerVars: {
      disablekb: 1,
      controls: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      enablejsapi: 1,
      rel: 0,
    },
  });
  sessionStorage.setItem(CURRENT_MUSIC_ID_KEY, FIRST_LOAD_MUSIC_ID);
};

const onplayerStateChange = (event) => {
  // 처음 재생 될 때
  if (event.data === YT.PlayerState.PLAYING && !youtubePlayer.hasStarted) {
    youtubePlayer.hasStarted = true;
    const id = sessionStorage.getItem(CURRENT_MUSIC_ID_KEY);
    postSongViews(id);
  }
};

const postSongViews = async (ytID) => {
  try {
    const response = await fetch(`api/songs/${ytID}/view`, { method: "POST" });
    if (!response.ok) {
      throw new Error("Can't increase views");
    }
  } catch (err) {
    console.error(err);
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
  if (musicInfo.ytID === sessionStorage.getItem(WILL_CHANGE_MUSIC_ID_KEY)) {
    return;
  }
  sessionStorage.setItem(WILL_CHANGE_MUSIC_ID_KEY, musicInfo.ytID);

  const virtualImg = createVirtualImg();
  musicSelectAnimation(event.target, musicPlayer, virtualImg);

  setTimeout(() => {
    loadNewMusic(musicInfo);
  }, 550);
};
