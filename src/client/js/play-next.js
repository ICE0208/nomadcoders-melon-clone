import { ServerlessApplicationRepository } from "aws-sdk";
import {
  CURRENT_MUSIC_ID_KEY,
  WILL_CHANGE_MUSIC_ID_KEY,
  loadNewMusic,
} from "./music-player";
import { isRepeat } from "./music-repeat";

const CUR_PLAY_FROM_KEY = "currentPlayFrom";
const POST_PLAY_FROM_KEY = "postPlayFrom";
const AUTO_PLAY_KEY = "autoPlay";

export const setAutoPlay = (state) => {
  if (state !== "auto" && state !== "none") {
    console.error(`${state} is not valid state! only 'auto' and 'none'`);
    return false;
  }
  sessionStorage.setItem(AUTO_PLAY_KEY, state);
  return true;
};

export const setCurPlayFrom = (state) => {
  if (state !== "playlist" && state !== "chart") {
    console.error(`${state} is not valid state! only 'playlist' and 'chart'`);
    return false;
  }
  sessionStorage.setItem(CUR_PLAY_FROM_KEY, state);
  return true;
};
export const setPostPlayFrom = (state) => {
  if (state !== "playlist" && state !== "chart") {
    console.error(`${state} is not valid state! only 'playlist' and 'chart'`);
    return false;
  }
  sessionStorage.setItem(POST_PLAY_FROM_KEY, state);
  return true;
};

export const getAutoPlay = () => {
  return sessionStorage.getItem(AUTO_PLAY_KEY);
};
export const getPostPlayFrom = () => {
  return sessionStorage.getItem(POST_PLAY_FROM_KEY) || getCurPlayFrom();
};
export const getCurPlayFrom = () => {
  return sessionStorage.getItem(CUR_PLAY_FROM_KEY) || "chart";
};

export const isPlayedFromPlaylist = () => {
  return getCurPlayFrom() === "playlist";
};

export const moveToNextSong = async (autoPlay = "none") => {
  if (!isPlayedFromPlaylist()) {
    console.error("you can't skip!");
    return false;
  }
  return await moveTo("next", autoPlay);

  // ! 다음곡으로 가는 코드 작성
};

export const moveToPreviousSong = (autoPlay = "none") => {
  if (!isPlayedFromPlaylist()) {
    console.error("you can't skip!");
    return false;
  }
  return moveTo("previous", autoPlay);
  // ! 이전곡으로 가는 코드 작성
};

const moveTo = async (target, autoPlay = "none") => {
  try {
    const response = await fetch(`api/songs/likedsong`, { method: "POST" });
    let { likedSongList } = await response.json();

    if (likedSongList === undefined) {
      if (authNav.classList.contains("logout-btn")) {
        window.location.href = "/";
        return;
      }
      likedSongList = [];
    }

    const curMusicID = sessionStorage.getItem(CURRENT_MUSIC_ID_KEY);
    let curMusicIndex = likedSongList.indexOf(curMusicID);

    if (curMusicIndex === -1) {
      throw new Error(`${curMusicID} is not found in the list`);
    }

    if (target === "next") {
      if (curMusicIndex + 1 >= likedSongList.length) {
        // 반복 중이 아니라면
        if (!isRepeat()) {
          return false;
        }
        curMusicIndex = -1;
      }
      const musicInfo = window.musics.find(
        (music) => music.ytID === likedSongList[curMusicIndex + 1]
      );
      setAutoPlay(autoPlay);
      sessionStorage.setItem(WILL_CHANGE_MUSIC_ID_KEY, musicInfo.ytID);
      loadNewMusic(musicInfo);
    } else if (target === "previous") {
      if (curMusicIndex - 1 < 0) {
        return false;
      }
      const musicInfo = window.musics.find(
        (music) => music.ytID === likedSongList[curMusicIndex - 1]
      );
      setAutoPlay(autoPlay);
      loadNewMusic(musicInfo);
    } else {
      throw new Error(
        `${target} is not valid target! only 'next' or 'previous'`
      );
    }

    return true;
  } catch (err) {
    console.error("Error in moveTo function:", err);
    return false;
  }
};

console.log("play-next.js");
