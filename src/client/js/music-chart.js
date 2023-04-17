const mcArrow = document.querySelector(".mc-arrow");
const mcMainBox = document.querySelector(".mc-main-box");
const mcVirtualBox = document.querySelector(".mc-virtual-box");
const musicImgs = document.querySelectorAll(".mc-music-list__music > img");
const whiteBox = document.querySelector(".white-box");

const CLASSNAME_OPENED = "opened";
const CLASSNAME_VISIBLE = "visible";
const CLASSNAME_INACTIVE = "inactive";

let arrowTimeoutIdList = [];
let isEnteredInArrow = false;
let isEnteredInWhiteBox = false;

const toggleOpenMusicChart = () => {
  const opening = mcArrow.classList.toggle(CLASSNAME_OPENED);
  if (opening) {
    mcMainBox.classList.add(CLASSNAME_OPENED);
    mcVirtualBox.classList.remove(CLASSNAME_INACTIVE);
  } else {
    mcMainBox.classList.remove(CLASSNAME_OPENED);
    setTimeout(() => {
      mcVirtualBox.classList.add(CLASSNAME_INACTIVE);
    }, 300);
  }
};

const showArrowForThreeSeconds = () => {
  mcArrow.classList.add(CLASSNAME_VISIBLE);
  clearTimeout(...arrowTimeoutIdList);
  arrowTimeoutIdList = [];
  if (isEnteredInArrow || isEnteredInWhiteBox) {
    return;
  }
  const arrowTimeoutId = setTimeout(() => {
    mcArrow.classList.remove(CLASSNAME_VISIBLE);
  }, 3000);
  arrowTimeoutIdList.push(arrowTimeoutId);
};

const mcArrowMouseEnterHandler = () => {
  isEnteredInArrow = true;
  clearTimeout(...arrowTimeoutIdList);
  arrowTimeoutIdList = [];
};
const mcArrowMouseLeaveHandler = () => {
  isEnteredInArrow = false;
};
const mcArrowMouseClickHandler = () => {
  isEnteredInArrow = false;
  showArrowForThreeSeconds();
};

const whiteBoxMouseEnterHandler = () => {
  isEnteredInWhiteBox = true;
  clearTimeout(...arrowTimeoutIdList);
  arrowTimeoutIdList = [];
};
const whiteBoxMouseLeaveHandler = () => {
  isEnteredInWhiteBox = false;
};

mcArrow.addEventListener("click", toggleOpenMusicChart);
mcVirtualBox.addEventListener("mousemove", showArrowForThreeSeconds);
mcArrow.addEventListener("mouseenter", mcArrowMouseEnterHandler);
mcArrow.addEventListener("mouseleave", mcArrowMouseLeaveHandler);
whiteBox.addEventListener("mouseenter", whiteBoxMouseEnterHandler);
whiteBox.addEventListener("mouseleave", whiteBoxMouseLeaveHandler);
mcArrow.addEventListener("click", mcArrowMouseClickHandler);

export const musicChartJsInit = () => {
  mcArrow.style.transition = "all 0.4s ease-in-out";
  whiteBox.style.transition = "all 0.4s ease-in-out";
  mcArrow.click();
};

console.log("music-chart.js");
