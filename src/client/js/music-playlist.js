const getThumbUrl = (ytID) => {
  return `https://img.youtube.com/vi/${ytID}/mqdefault.jpg`;
};

const createSongDiv = (songInfo) => {
  // Create the main music list element
  const music = document.createElement("div");
  music.classList.add("playlist__music");

  // Create the music thumbnail element
  const musicThumb = document.createElement("img");
  musicThumb.classList.add("playlist__music__thumb");
  musicThumb.setAttribute("src", getThumbUrl(songInfo.ytID));
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
  const playlistContainer = document.querySelector(
    ".playlist-container > .playlist"
  );
  playlistContainer.innerHTML = "";

  likedSongList.forEach((likedSongID) => {
    const songInfo = window.musics.find((music) => music.ytID === likedSongID);
    const songDiv = createSongDiv(songInfo);
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
  }
};
