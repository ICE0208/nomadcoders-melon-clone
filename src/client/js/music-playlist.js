import {
  WILL_CHANGE_MUSIC_ID_KEY,
  createVirtualImg,
  loadNewMusic,
  musicPlayerMusic,
} from "./music-player";
import { musicSelectAnimation } from "./musicSelectAnimation";
import {
  getCurPlayFrom,
  getPostPlayFrom,
  setAutoPlay,
  setCurPlayFrom,
  setPostPlayFrom,
} from "./play-next";

const playlistThumbClickHandler = (event) => {
  const music = event.target.closest(".playlist__music");
  const selectedID = music.dataset.id;
  const musicInfo = window.musics.find((music) => music.ytID === selectedID);

  setPostPlayFrom("playlist");
  if (musicInfo.ytID === sessionStorage.getItem(WILL_CHANGE_MUSIC_ID_KEY)) {
    if (getPostPlayFrom() === getCurPlayFrom()) {
      return;
    }
  }
  setCurPlayFrom("playlist");
  setAutoPlay("none");
  sessionStorage.setItem(WILL_CHANGE_MUSIC_ID_KEY, musicInfo.ytID);

  const virtualImg = createVirtualImg();
  musicSelectAnimation(event.target, musicPlayerMusic, virtualImg);

  setTimeout(() => {
    loadNewMusic(musicInfo);
  }, 550);
};

const getThumb320Url = (ytID) => {
  return `https://img.youtube.com/vi/${ytID}/mqdefault.jpg`;
};

const createSongDiv = (songInfo, index) => {
  // Create the main music list element
  const music = document.createElement("div");
  music.classList.add("playlist__music");
  music.dataset.id = songInfo.ytID;
  music.dataset.order = index;

  // Create the music thumbnail element
  const musicThumb = document.createElement("img");
  musicThumb.classList.add("playlist__music__thumb");
  musicThumb.setAttribute("src", getThumb320Url(songInfo.ytID));
  musicThumb.addEventListener("click", playlistThumbClickHandler);
  music.appendChild(musicThumb);

  // Create the music info element
  const musicInfo = document.createElement("div");
  musicInfo.classList.add("playlist__music__infos");
  music.appendChild(musicInfo);

  const musicTitle = document.createElement("span");
  musicTitle.classList.add("title");
  musicTitle.textContent = songInfo.title;
  musicInfo.appendChild(musicTitle);

  const musicArtist = document.createElement("span");
  musicArtist.classList.add("artist");
  musicArtist.textContent = songInfo.artist;
  musicInfo.appendChild(musicArtist);

  const sortController = document.createElement("div");
  sortController.classList.add("sort-controller");
  music.appendChild(sortController);

  const sortUp = document.createElement("i");
  sortUp.classList.add("fa-solid", "fa-caret-up");
  const sortDown = document.createElement("i");
  sortDown.classList.add("fa-solid", "fa-caret-down");
  sortController.appendChild(sortUp);
  sortController.appendChild(sortDown);

  return music;
};

const createMsgDiv = (msg) => {
  const div = document.createElement("div");
  div.classList.add("login-first-div");

  const span = document.createElement("span");
  span.classList.add("login-first-div__text");
  span.innerText = msg;
  div.appendChild(span);

  return div;
};

export const loadPlaylist = (likedSongList) => {
  const playlistMusicThumbs = document.querySelectorAll(
    ".playlist__music__thumb"
  );
  playlistMusicThumbs.forEach((thumb) => {
    thumb.removeEventListener("click", playlistThumbClickHandler);
  });

  const playlistContainer = document.querySelector(
    ".playlist-container > .playlist"
  );
  playlistContainer.innerHTML = "";

  likedSongList.forEach((likedSongID, index) => {
    const songInfo = window.musics.find((music) => music.ytID === likedSongID);
    const songDiv = createSongDiv(songInfo, index);
    playlistContainer.appendChild(songDiv);
  });

  if (likedSongList.length === 0) {
    const authNav = document.querySelector(".auth-nav > a");
    if (authNav.classList.contains("login-btn")) {
      const loginMsg = createMsgDiv("Login First");
      playlistContainer.appendChild(loginMsg);
    } else {
      const nothingMsg = createMsgDiv("Nothing here");
      playlistContainer.appendChild(nothingMsg);
    }
    return;
  }
  initChangeSort();
};

export const initMusicPlayList = () => {
  initMoving();
};

const initChangeSort = () => {
  const sortUpIcons = document.querySelectorAll(".fa-caret-up");
  const sortDownIcons = document.querySelectorAll(".fa-caret-down");

  sortUpIcons.forEach((sortUpIcon) => {
    sortUpIcon.addEventListener("click", (event) => {
      const ytID = event.target.closest(".playlist__music").dataset.id;
      postChangeSongSort(ytID, "up");
    });
  });
  sortDownIcons.forEach((sortDownIcon) => {
    sortDownIcon.addEventListener("click", (event) => {
      const ytID = event.target.closest(".playlist__music").dataset.id;
      postChangeSongSort(ytID, "down");
    });
  });
};

const postChangeSongSort = async (ytID, direction) => {
  const playlist = document.querySelector(".playlist");
  playlist.classList.add("sort-changeing");

  let likedSongList = [];
  try {
    const response = await fetch(`api/songs/${ytID}/sort${direction}`, {
      method: "POST",
    });
    const info = await response.json();
    if (!response.ok) {
      throw new Error(
        `Can't change the likedSong List. Server responded with ${response.status}: ${info.msg}`
      );
    }
    // ? 정상적으로 처리되었을 때
    likedSongList = info.likedSongList;
    songSortChangeAnimation(ytID, direction);
    setTimeout(() => {
      loadPlaylist(likedSongList);
      playlist.classList.remove("sort-changeing");
    }, 300);

    // 별 바꾸기
  } catch (err) {
    console.error("Error in changeSongSort function:", err);
    playlist.classList.remove("sort-changeing");
  }
};

const songSortChangeAnimation = (ytID, direction) => {
  const target = document.querySelector(`.playlist__music[data-id="${ytID}"]`);
  const targetOrder = parseInt(target.dataset.order);
  const target2Order = direction === "up" ? targetOrder - 1 : targetOrder + 1;
  const target2 = document.querySelector(
    `.playlist__music[data-order="${target2Order}"]`
  );
  if (direction === "up") {
    target.classList.add("up");
    target2.classList.add("down");
  } else {
    target.classList.add("down");
    target2.classList.add("up");
  }
};

const initMoving = () => {
  const playlistContainer = document.querySelector(".playlist-container");
  const movingBar = playlistContainer.querySelector(".moving-bar");
  let isDragging = false;
  let gapX = 0;
  let gapY = 0;

  movingBar.addEventListener("mousedown", (event) => {
    isDragging = true;
    const rect = playlistContainer.getBoundingClientRect();
    const { width, height } = rect;
    const centerX = window.innerWidth - rect.right + width / 2;
    // !! 20은 위에서 selectbar 가운데 까지의 y 거리
    const centerY = window.innerHeight - rect.bottom + height - 20;

    const clickedX = window.innerWidth - event.clientX;
    const clickedY = window.innerWidth - event.clientY;

    gapX = clickedX - centerX;
    gapY = clickedY - centerY;

    const startX = `${clickedX - gapX}px`;
    const startY = `${clickedY - gapY}px`;

    playlistContainer.classList.remove("fixed");
    playlistContainer.style.right = startX;
    playlistContainer.style.bottom = startY;
  });
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
    }
  });
  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const clickedX = window.innerWidth - event.clientX;
      const clickedY = window.innerWidth - event.clientY;
      playlistContainer.style.right = `${clickedX - gapX}px`;
      playlistContainer.style.bottom = `${clickedY - gapY}px`;
    }
  });
};

console.log("music-playlist.js");
