export const loadPlaylist = (likedSongList) => {
  const playlistContainer = document.querySelector(".playlist-container");
  likedSongList.forEach((likedSong) => {
    const songDiv = document.createElement("div");
    songDiv.innerText = likedSong;
    playlistContainer.appendChild(songDiv);
  });
};
