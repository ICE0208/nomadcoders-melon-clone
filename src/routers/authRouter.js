import express from "express";
import passport from "passport";
import {
  getAuthGoogleCallback,
  getLogout,
} from "../controllers/userController";

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
authRouter.get("/logout", getLogout);

export default authRouter;
