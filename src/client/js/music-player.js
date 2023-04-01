let player1;

const initialize = () => {
  youtubePlayer = new YT.Player("youtube-player", {
    width: "400",
    height: "400",
    videoId: "VbS1yHZGmTY",
    playerVars: {
      disablekb: 1,
      controls: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      showinfo: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

const onPlayerReady = (event) => {
  console.log("Ready!!");
};

const onPlayerStateChange = () => {};

const loadYoutubeAPI = () => {
  if (typeof YT === "undefined") {
    console.log("nope");
    setTimeout(loadYoutubeAPI, 500);
    // initialize();
  } else {
    initialize();
  }
};
loadYoutubeAPI();
