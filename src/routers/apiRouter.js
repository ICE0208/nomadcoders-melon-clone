import express from "express";
import {
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

export default apiRouter;
