import express from "express";
import passport from "passport";
import { getAuthGoogleCallback } from "../controllers/userController";

const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  getAuthGoogleCallback
);

export default authRouter;
