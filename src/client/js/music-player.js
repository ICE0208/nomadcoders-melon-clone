import * as mCR from "./musicController.js";
import { musicSelectAnimation } from "./musicSelectAnimation";

let youtubePlayer;
const musicChartMusicThumbs = document.querySelectorAll(
  ".mc-music-list__music__thumb"
);
const musicPlayerContainer = document.querySelector(".player-container");
const musicPlayerMusic = musicPlayerContainer.querySelector(
  ".player-container__music"
);

const musicControllerDiv = document.querySelector(
  ".player-container__controller"
);
const musicPlayerMusicTitle = musicControllerDiv.querySelector(
  ".music-info__text__title"
);
const musicPlayerMusicArtist = musicControllerDiv.querySelector(
  ".music-info__text__artist"
);
const musicPlayerTogglePlay = musicControllerDiv.querySelector(
  ".music-controll__toggle-play > i"
);
const musicPlayerVolumeInput = musicControllerDiv.querySelector(
  ".music-volume__controller"
);

const CURRENT_MUSIC_ID_KEY = "currentMusicID";
const WILL_CHANGE_MUSIC_ID_KEY = "willChangeMusicID";
const FIRST_MUSIC_INFO = {
  title: "KANATA HALUKA",
  artist: "RADWIMPS",
  ytID: "VbS1yHZGmTY",
};

const loadNewMusic = (musicInfo) => {
  youtubePlayer.cueVideoById(musicInfo.ytID);
  sessionStorage.setItem(CURRENT_MUSIC_ID_KEY, musicInfo.ytID);
  youtubePlayer.hasStarted = false;
  setMusicInfo(musicInfo);
  mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
};

const loadFirstVideo = () => {
  sessionStorage.setItem(WILL_CHANGE_MUSIC_ID_KEY, FIRST_MUSIC_INFO.ytID);
  youtubePlayer = new YT.Player("youtube-player", {
    width: "360",
    height: "360",
    videoId: FIRST_MUSIC_INFO.ytID,
    events: {
      onReady: initAfterReady,
      onStateChange: onplayerStateChange,
    },
    playerVars: {
      disablekb: 1,
      controls: 1,
      iv_load_policy: 3,
      modestbranding: 1,
      enablejsapi: 1,
      rel: 0,
    },
  });
  sessionStorage.setItem(CURRENT_MUSIC_ID_KEY, FIRST_MUSIC_INFO.ytID);
  setMusicInfo(FIRST_MUSIC_INFO);
  mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
};

const setMusicInfo = (musicInfo) => {
  musicPlayerMusicTitle.innerText = musicInfo.title;
  musicPlayerMusicArtist.innerText = musicInfo.artist;
};

const onplayerStateChange = (event) => {
  // 로드되고 처음 재생 될 때, 로드하고 두 번 재생은 적용안됨
  if (event.data === YT.PlayerState.PLAYING && !youtubePlayer.hasStarted) {
    youtubePlayer.hasStarted = true;
    const id = sessionStorage.getItem(CURRENT_MUSIC_ID_KEY);
    postSongViews(id);
  }
  // 노래 끝날을 때
  if (event.data === YT.PlayerState.ENDED) {
    youtubePlayer.stopVideo();
  }

  if (event.data == YT.PlayerState.PLAYING) {
    mCR.changePlayIcon(musicPlayerTogglePlay, "played");
  } else if (event.data == YT.PlayerState.PAUSED) {
    mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
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

  musicChartMusicThumbs.forEach((musicThumb) => {
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
  musicSelectAnimation(event.target, musicPlayerMusic, virtualImg);

  setTimeout(() => {
    loadNewMusic(musicInfo);
  }, 550);
};

const init = () => {
  musicPlayerInit();

  // * play
  musicPlayerTogglePlay.addEventListener("click", (event) =>
    mCR.togglePlayer(youtubePlayer, event.target)
  );
};
// ? init 다음으로 첫 번째 영상이 로드되면 실행됨
const initAfterReady = () => {
  mCR.enableInputDragging(musicPlayerVolumeInput, youtubePlayer);
  youtubePlayer.setVolume(mCR.getSavedVolume());
  youtubePlayer.unMute();
};

init();
