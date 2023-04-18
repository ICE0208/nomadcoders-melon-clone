import { getCurPlayFrom } from "./play-next";

const musicRepeatIcon = document.querySelector(".music-info__repeat-btn > i");

export const initMusicRepeat = () => {
  musicRepeatIcon.addEventListener("click", () => {
    if (isRepeat()) {
      activeOneRepeat();
    } else if (isOneRepeat()) {
      inactiveAllRepeat();
    } else {
      if (getCurPlayFrom() === "playlist") {
        activeRepeat();
      }
    }
  });
};

const REPEAT_KEY = "repeat";
const REPEAT_VALUE = "repeat";
const ONE_REPEAT_VALUE = "one-repeat";
const NO_REPEAT_VALUE = "none";

export const addNoDisplayRepeat = () => {
  musicRepeatIcon.classList.add("no-display");
};
export const removeNoDisplayRepeat = () => {
  musicRepeatIcon.classList.remove("no-display");
};

export const activeRepeat = () => {
  musicRepeatIcon.classList.remove("inactive");
  musicRepeatIcon.classList.remove("one");
  sessionStorage.setItem(REPEAT_KEY, REPEAT_VALUE);
};
export const activeOneRepeat = () => {
  musicRepeatIcon.classList.remove("inactive");
  musicRepeatIcon.classList.add("one");
  sessionStorage.setItem(REPEAT_KEY, ONE_REPEAT_VALUE);
};
export const inactiveAllRepeat = () => {
  musicRepeatIcon.classList.add("inactive");
  musicRepeatIcon.classList.remove("one");
  sessionStorage.setItem(REPEAT_KEY, NO_REPEAT_VALUE);
};
export const isRepeat = () => {
  return sessionStorage.getItem(REPEAT_KEY) === REPEAT_VALUE;
};
export const isOneRepeat = () => {
  return sessionStorage.getItem(REPEAT_KEY) === ONE_REPEAT_VALUE;
};
