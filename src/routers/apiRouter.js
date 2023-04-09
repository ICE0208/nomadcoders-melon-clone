import express from "express";
import {
  likeSong,
  likedSongList,
  registerView,
} from "../controllers/songController";

const apiRouter = express.Router();

apiRouter.post("/songs/likedsong", likedSongList);
apiRouter.post("/songs/:id/view", registerView);
apiRouter.post("/songs/:id/like", likeSong);

export default apiRouter;
