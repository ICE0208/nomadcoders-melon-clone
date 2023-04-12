import { CURRENT_MUSIC_ID_KEY, loadNewMusic } from "./music-player";

const CUR_PLAY_FROM_KEY = "currentPlayFrom";
const POST_PLAY_FROM_KEY = "postPlayFrom";

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

export const getPostPlayFrom = () => {
  return sessionStorage.getItem(POST_PLAY_FROM_KEY) || getCurPlayFrom();
};
export const getCurPlayFrom = () => {
  return sessionStorage.getItem(CUR_PLAY_FROM_KEY) || "chart";
};

const isPlayedFromPlaylist = () => {
  return getCurPlayFrom() === "playlist";
};

export const moveToNextSong = () => {
  if (!isPlayedFromPlaylist()) {
    console.error("you can't skip!");
    return false;
  }
  return moveTo("next");

  // ! 다음곡으로 가는 코드 작성
};

export const moveToPreviousSong = () => {
  if (!isPlayedFromPlaylist()) {
    console.error("you can't skip!");
    return false;
  }
  return moveTo("previous");
  // ! 이전곡으로 가는 코드 작성
};

const moveTo = async (target) => {
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
    const curMusicIndex = likedSongList.indexOf(curMusicID);

    if (curMusicIndex === -1) {
      throw new Error(`${curMusicID} is not found in the list`);
    }

    if (target === "next") {
      if (curMusicIndex + 1 >= likedSongList.length) {
        return false;
      }
      const musicInfo = window.musics.find(
        (music) => music.ytID === likedSongList[curMusicIndex + 1]
      );
      loadNewMusic(musicInfo);
    } else if (target === "previous") {
      if (curMusicIndex - 1 < 0) {
        return false;
      }
      const musicInfo = window.musics.find(
        (music) => music.ytID === likedSongList[curMusicIndex - 1]
      );
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
