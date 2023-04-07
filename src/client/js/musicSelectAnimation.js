export const musicSelectAnimation = (musicThumb, musicPlayer, virtualImg) => {
  const musicRect = musicThumb.getBoundingClientRect();
  const playerRect = musicPlayer.getBoundingClientRect();

  const musicMid = {
    x: musicRect.left + musicRect.width / 2,
    y: musicRect.top + musicRect.height / 2,
  };
  const playerMid = {
    x: playerRect.left + playerRect.width / 2,
    y: playerRect.top + playerRect.height / 2,
  };

  const musicVsPlayer = playerMid.y - musicMid.y > 0 ? 1 : -1;

  const DISTANCE_OFFSET = {
    x: playerRect.left - musicRect.left + 150,
    y: playerMid.y - musicMid.y + (playerRect.height / 6) * musicVsPlayer,
  };
  const WAYPOINT_OFFSET = {
    x: 180,
    y: 80 * musicVsPlayer * -1,
  };

  const keyframesName = `k${Date.now()}`;
  const keyframes = createKeyFrame(
    getKeyFrameString(
      keyframesName,
      WAYPOINT_OFFSET,
      DISTANCE_OFFSET,
      musicVsPlayer
    )
  );

  virtualImg.src = musicThumb.src;
  virtualImg.style.left = `${musicRect.left}px`;
  virtualImg.style.top = `${musicRect.top}px`;
  virtualImg.style.opacity = 1;
  virtualImg.style.animation = `${keyframesName} 1s`;

  virtualImg.addEventListener("animationend", () => {
    keyframes.remove();
    virtualImg.remove();
  });
};

const getKeyFrameString = (
  keyframesName,
  WAYPOINT_OFFSET,
  DISTANCE_OFFSET,
  musicVsPlayer
) => `
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
`;

const createKeyFrame = (str) => {
  const keyframes = str;

  const styleEl = document.createElement("style");
  styleEl.innerHTML = keyframes;
  document.head.appendChild(styleEl);

  return styleEl;
};
