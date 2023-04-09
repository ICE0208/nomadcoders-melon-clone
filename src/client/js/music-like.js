export const initMusicLike = () => {
  let clicked = false;
  const likeIcon = document.querySelector(".music-info__like-btn > i");

  const CURRENT_MUSIC_ID_KEY = "currentMusicID";

  likeIcon.addEventListener("click", () => {
    postSongLike(likeIcon, CURRENT_MUSIC_ID_KEY, clicked);
  });
};

const postSongLike = async (likeIcon, CURRENT_MUSIC_ID_KEY, clicked) => {
  clicked = true;
  let likedSongList = [];

  try {
    const response = await fetch(
      `api/songs/${sessionStorage.getItem(CURRENT_MUSIC_ID_KEY)}/like`,
      { method: "POST" }
    );
    const info = await response.json();
    if (!response.ok) {
      throw new Error(
        `Can't add at likedSong List. Server responded with ${response.status}: ${info.msg}`
      );
    }
    // ? 정상적으로 처리되었을 때
    likedSongList = info.likedSongList;
    // ? 저장하는 동안 노래가 바뀌었을 수 있으므로 한번 더 확인
    if (likedSongList.includes(sessionStorage.getItem(CURRENT_MUSIC_ID_KEY))) {
      changeLikeIcon(likeIcon, "like");
    }

    // 별 바꾸기
  } catch (err) {
    console.error("Error in likeSong function:", err);
  }

  clicked = false;
};

const changeLikeIcon = (icon, status) => {
  if (status === "like") {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
  } else if (status === "unlike") {
    icon.classList.add("fa-solid");
    icon.classList.remove("fa-regular");
  } else {
    console.error(`Unknown status: ${status}`);
  }
};

export const loadLikeIcon = () => {
  const likeIcon = document.querySelector(".music-info__like-btn > i");
};
