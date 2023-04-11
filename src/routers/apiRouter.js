import express from "express";
import {
  changeSongSortDown,
  changeSongSortUp,
  likeSong,
  likedSongList,
  registerView,
  unLikeSong,
} from "../controllers/songController";

const apiRouter = express.Router();

apiRouter.post("/songs/likedsong", likedSongList);
apiRouter.post("/songs/:id/view", registerView);
apiRouter.post("/songs/:id/like", likeSong);
apiRouter.post("/songs/:id/unlike", unLikeSong);
apiRouter.post("/songs/:id/sortup", changeSongSortUp);
apiRouter.post("/songs/:id/sortdown", changeSongSortDown);

export default apiRouter;
