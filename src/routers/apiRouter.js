import express from "express";
import { registerView } from "../controllers/songController";

const apiRouter = express.Router();

apiRouter.post("/songs/:id/view", registerView);

export default apiRouter;
