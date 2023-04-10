import * as mCR from "./musicController.js";
import * as mL from "./music-like.js";
import { musicSelectAnimation } from "./musicSelectAnimation";
import { loadPlaylist } from "./music-playlist.js";

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

// ? 처음 음악을 랜덤으로 선택하여 firstMusicInfo에 넣어준다.
const setRandomFirstMusicInfo = () => {
  const randomMusicInfo =
    window.musics[Math.floor(Math.random() * window.musics.length)];
  firstMusicInfo = randomMusicInfo;
};

// ? 음악을 선택했을 때 로드시켜주는 함수
const loadNewMusic = (musicInfo) => {
  youtubePlayer.cueVideoById(musicInfo.ytID);
  commonInitMusic(musicInfo.ytID);
  youtubePlayer.hasFirstStarted = false;
  youtubePlayer.playing = false;
  setPlayerInfo(musicInfo);
  youtubePlayer.setVolume(mCR.getSavedVolume());
};

// ? 플레리어를 만들면서 처음 음악을 로드시켜주는 함수
const loadFirstMusic = () => {
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
  commonInitMusic(firstMusicInfo.ytID);
};

// ? 플레이어를 처음, 나중에 로드할 때 공통 적용되는 세팅
const commonInitMusic = async (ytID) => {
  sessionStorage.setItem(CURRENT_MUSIC_ID_KEY, ytID);
  mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
  const likedSongList = await mL.loadLikeIcon();
  loadPlaylist(likedSongList);
};

// ? 현재 선택된 음악의 정보를 플레이어의 속성에 추가
const setPlayerInfo = (musicInfo) => {
  youtubePlayer.title = musicInfo.title;
  youtubePlayer.artist = musicInfo.artist;
  youtubePlayer.ytID = musicInfo.ytID;
};

// ? 첫 영상이 로드되거나 영상이 CUED 되면 실행되는 함수
const setMusicInfo = () => {
  musicPlayerMusicTitle.innerText = youtubePlayer.title;
  musicPlayerMusicArtist.innerText = youtubePlayer.artist;
  // ! 유저 로그인 상태 -> youtubePlayer.ytID가 유저의 좋아요 리스트에 있는지 확인
  // ! -> 있으면 꽉찬 별, 없으면 빈 별
  // ! 로그인 상태가 아니라면 무조건 빈 별
};

// ? 뮤직 플레어어의 상태가 변함에 따라 자동으로 실행되는 함수
const onplayerStateChange = (event) => {
  const playerState = event.data;

  switch (playerState) {
    case YT.PlayerState.PLAYING:
      if (!youtubePlayer.hasFirstStarted) {
        youtubePlayer.hasFirstStarted = true;
        postSongViews(sessionStorage.getItem(CURRENT_MUSIC_ID_KEY));
      }
      youtubePlayer.playing = true;
      mCR.changePlayIcon(musicPlayerTogglePlay, "played");
      break;

    case YT.PlayerState.ENDED:
      youtubePlayer.playing = false;
      youtubePlayer.stopVideo();
      mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
      break;

    case YT.PlayerState.PAUSED:
      mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
      break;

    case YT.PlayerState.CUED:
      mCR.changePlayIcon(musicPlayerTogglePlay, "paused");
      if (!youtubePlayer.hasFirstStarted) {
        setMusicInfo();
        musicPlayerProgressInput.max = youtubePlayer.getDuration();
        musicPlayerProgressInput.value = 0;
        mCR.setMaxTime(musicPlayerProgress, youtubePlayer);
      }
      break;

    default:
      break;
  }
};

// ? ytID의 조회수를 증가시키는 함수
const postSongViews = async (ytID) => {
  try {
    const response = await fetch(`api/songs/${ytID}/view`, { method: "POST" });
    if (!response.ok) {
      const errorInfo = await response.text();
      throw new Error(
        `Can't increase views. Server responded with ${response.status}: ${errorInfo}`
      );
    }
  } catch (err) {
    console.error("Error in postSongViews function:", err);
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

// ? youtubeIframeAPI가 준비되었을 때 자동으로 실행됨
const onYouTubeIframeAPIReady = () => {
  setRandomFirstMusicInfo();
  loadFirstMusic();
};

// ? 가상 썸네일 이미지를 만들어 배치한 뒤, 리턴
const createVirtualImg = () => {
  const main = document.querySelector("main");
  const virtualImg = document.createElement("img");
  virtualImg.classList.add("virtual-img");
  main.appendChild(virtualImg);
  return virtualImg;
};

// ? 뮤직차트에 있는 썸네일을 클릭했을 때 작동하는 함수
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

// ? init 다음으로 첫 번째 영상이 로드되면 '자동으로' 실행됨
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

  mL.initMusicLike();
};

musicPlayerInit();
