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

  const distance = {
    x: playerX - musicX + 100,
    y: playerMid.y - musicMid.y + (playerHeight / 6) * musicVsPlayer,
  };
  const wayPointDistance = 80;
  const wayPoint = {
    x: 180,
    y: wayPointDistance * musicVsPlayer * -1,
  };
  console.log(wayPoint.y);
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
    }
    30% {
        animation-timing-function: ease-out;
        transform: translateX(${wayPoint.x}px) translateY(${
    wayPoint.y
  }px) scale(1.6) rotate(${20 * musicVsPlayer}deg);
    }
    65% {
        animation-timing-function: ease-in;
        opacity: 1
    }
    80% {
        animation-timing-function: ease-in;
        opacity: 0;
    }
    100% {
        animation-timing-function: linear;
        transform: translateX(${distance.x}px) translateY(${
    distance.y
  }px) scale(0.3) rotate(${120 * musicVsPlayer}deg);
        opacity: 0;
    }
  }
`);
  console.log(keyframes);
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
