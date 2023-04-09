import express from "express";
import { likeSong, registerView } from "../controllers/songController";

const apiRouter = express.Router();

apiRouter.post("/songs/:id/view", registerView);
apiRouter.post("/songs/:id/like", likeSong);

export default apiRouter;
