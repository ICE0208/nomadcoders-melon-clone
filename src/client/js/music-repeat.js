import { getCurPlayFrom } from "./play-next";

const musicRepeatIcon = document.querySelector(".music-info__repeat-btn > i");

export const initMusicRepeat = () => {
  musicRepeatIcon.addEventListener("click", () => {
    if (isRepeat()) {
      inactiveRepeat();
    } else {
      if (getCurPlayFrom() === "playlist") {
        activeRepeat();
      }
    }
  });
};

export const addNoDisplayRepeat = () => {
  musicRepeatIcon.classList.add("no-display");
};
export const removeNoDisplayRepeat = () => {
  musicRepeatIcon.classList.remove("no-display");
};

export const activeRepeat = () => {
  musicRepeatIcon.classList.remove("inactive");
  sessionStorage.setItem("repeat", "repeat");
};
export const inactiveRepeat = () => {
  musicRepeatIcon.classList.add("inactive");
  sessionStorage.setItem("repeat", "none");
};
export const isRepeat = () => {
  return sessionStorage.getItem("repeat") === "repeat";
};
