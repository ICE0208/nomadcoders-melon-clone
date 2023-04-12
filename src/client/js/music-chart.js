const mcArrow = document.querySelector(".mc-arrow");
const mcMainBox = document.querySelector(".mc-main-box");
const mcVirtualBox = document.querySelector(".mc-virtual-box");
const musicImgs = document.querySelectorAll(".mc-music-list__music > img");

const CLASSNAME_OPENED = "opened";
const CLASSNAME_VISIBLE = "visible";
const CLASSNAME_INACTIVE = "inactive";

let arrowTimeoutIdList = [];
let isEnteredInArrow = false;

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
  if (isEnteredInArrow) {
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

mcArrow.addEventListener("click", toggleOpenMusicChart);
mcVirtualBox.addEventListener("mousemove", showArrowForThreeSeconds);
mcArrow.addEventListener("mouseenter", mcArrowMouseEnterHandler);
mcArrow.addEventListener("mouseleave", mcArrowMouseLeaveHandler);
mcArrow.addEventListener("click", mcArrowMouseClickHandler);

export const musicChartJsInit = () => {
  mcArrow.classList.add(CLASSNAME_VISIBLE);
};

console.log("music-chart.js");
