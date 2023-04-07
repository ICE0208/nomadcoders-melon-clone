export const musicSelectAnimation = (musicThumb, musicPlayer, virtualImg) => {
  const {
    left: musicX,
    top: musicY,
    width: musicWidth,
    height: musicHeight,
  } = musicThumb.getBoundingClientRect();
  const {
    left: playerX,
    top: playerY,
    width: playerWidth,
    height: playerHeight,
  } = musicPlayer.getBoundingClientRect();

  const musicMid = {
    x: musicX + musicWidth / 2,
    y: musicY + musicHeight / 2,
  };
  const playerMid = {
    x: playerX + playerWidth / 2,
    y: playerY + playerHeight / 2,
  };

  const musicVsPlayer = playerMid.y - musicMid.y > 0 ? 1 : -1;

  const DISTANCE_OFFSET = {
    x: playerX - musicX + 150,
    y: playerMid.y - musicMid.y + (playerHeight / 6) * musicVsPlayer,
  };
  const WAYPOINT_OFFSET = {
    x: 180,
    y: 80 * musicVsPlayer * -1,
  };
  virtualImg.src = musicThumb.src;
  virtualImg.style.left = `${musicX}px`;
  virtualImg.style.top = `${musicY}px`;
  virtualImg.style.opacity = 1;

  const keyframesName = `k${Date.now()}`;
  const keyframes = createKeyFrame(`
  @keyframes ${keyframesName} {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
      backface-visibility: hidden;
    }
    30% {
      animation-timing-function: ease-out;
      transform: translate(${WAYPOINT_OFFSET.x}px, ${
    WAYPOINT_OFFSET.y
  }px) scale(1.6) rotate(${20 * musicVsPlayer}deg);
      backface-visibility: hidden;
    }
    40% {
      filter: blur(0px);
    }
    65% {
      animation-timing-function: ease-in;
      opacity: 1;
      backface-visibility: hidden;
    }
    80% {
      animation-timing-function: ease-in;
      opacity: 0;
      filter: blur(5px);
      backface-visibility: hidden;
    }
    100% {
      animation-timing-function: linear;
      transform: translate(${DISTANCE_OFFSET.x}px, ${
    DISTANCE_OFFSET.y
  }px) scale(0) rotate(${120 * musicVsPlayer}deg);
      backface-visibility: hidden;
    }
  }
`);

  virtualImg.style.backfaceVisibility = "hidden";
  virtualImg.style.animation = `${keyframesName} 1s`;

  virtualImg.addEventListener("animationend", () => {
    keyframes.remove();
    virtualImg.remove();
  });
};

const createKeyFrame = (str) => {
  const keyframes = str;

  const styleEl = document.createElement("style");
  styleEl.innerHTML = keyframes;
  document.head.appendChild(styleEl);

  return styleEl;
};
