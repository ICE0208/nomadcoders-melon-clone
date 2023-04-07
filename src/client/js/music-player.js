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
const musicPlayerProgress = musicControllerDiv.querySelector(".music-progress");
const musicPlayerProgressInput = musicPlayerProgress.querySelector(
  ".music-progress__controller"
);

const CURRENT_MUSIC_ID_KEY = "currentMusicID";
const WILL_CHANGE_MUSIC_ID_KEY = "willChangeMusicID";
let firstMusicInfo = {};

const setRandomFirstMusicInfo = () => {
  const randomMusicInfo =
    window.musics[Math.floor(Math.random() * window.musics.length)];
  firstMusicInfo = randomMusicInfo;
};

const loadNewMusic = (musicInfo) => {
  youtubePlayer.cueVideoById(musicInfo.ytID);
  sessionStorage.setItem(CURRENT_MUSIC_ID_KEY, musicInfo.ytID);
  youtubePlayer.hasFirstStarted = false;
  youtubePlayer.playing = false;
  setPlayerInfo(musicInfo);
  mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
  youtubePlayer.setVolume(mCR.getSavedVolume());
};

const loadFirstVideo = () => {
  sessionStorage.setItem(WILL_CHANGE_MUSIC_ID_KEY, firstMusicInfo.ytID);
  youtubePlayer = new YT.Player("youtube-player", {
    width: "280",
    height: "280",
    videoId: firstMusicInfo.ytID,
    events: {
      onReady: initAfterReady,
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
  sessionStorage.setItem(CURRENT_MUSIC_ID_KEY, firstMusicInfo.ytID);
  mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
};

const setPlayerInfo = (musicInfo) => {
  youtubePlayer.title = musicInfo.title;
  youtubePlayer.artist = musicInfo.artist;
  youtubePlayer.ytID = musicInfo.ytID;
};

const setMusicInfo = () => {
  musicPlayerMusicTitle.innerText = youtubePlayer.title;
  musicPlayerMusicArtist.innerText = youtubePlayer.artist;
};

const onplayerStateChange = (event) => {
  // 로드되고 처음 재생 될 때, 로드하고 두 번 재생은 적용안됨
  if (event.data === YT.PlayerState.PLAYING && !youtubePlayer.hasFirstStarted) {
    // ! 시작하고 progressInput이 활성화되게 하기
    youtubePlayer.hasFirstStarted = true;
    const id = sessionStorage.getItem(CURRENT_MUSIC_ID_KEY);
    postSongViews(id);
  }
  // 노래 끝날을 때
  if (event.data === YT.PlayerState.ENDED) {
    youtubePlayer.playing = false;
    youtubePlayer.stopVideo();
    mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
  }

  if (event.data === YT.PlayerState.PLAYING) {
    youtubePlayer.playing = true;
    mCR.changePlayIcon(musicPlayerTogglePlay, "played");
  } else if (event.data == YT.PlayerState.PAUSED) {
    mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
  }

  if (event.data === YT.PlayerState.CUED) {
    mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
    if (youtubePlayer.hasFirstStarted === false) {
      setMusicInfo();
      musicPlayerProgressInput.max = youtubePlayer.getDuration();
      musicPlayerProgressInput.value = 0;
      mCR.setMaxTime(musicPlayerProgress, youtubePlayer);
    }
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
  setRandomFirstMusicInfo();
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
};
// ? init 다음으로 첫 번째 영상이 로드되면 실행됨
const initAfterReady = () => {
  setPlayerInfo(firstMusicInfo);
  setMusicInfo();

  // Play
  musicPlayerTogglePlay.addEventListener("click", (event) =>
    mCR.togglePlayer(youtubePlayer, event.target)
  );

  // Volume
  mCR.initVolumeController(musicPlayerVolumeInput, youtubePlayer);
  const savedVolume = mCR.getSavedVolume();
  youtubePlayer.setVolume(savedVolume);
  musicPlayerVolumeInput.value = savedVolume;

  // Progress
  youtubePlayer.playing = false;
  youtubePlayer.hasFirstStarted = false;
  mCR.initProgressController(musicPlayerProgress, youtubePlayer);
  musicPlayerProgressInput.max = youtubePlayer.getDuration();
  mCR.setMaxTime(musicPlayerProgress, youtubePlayer);
};

init();
