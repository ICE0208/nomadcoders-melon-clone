import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  getAuthGoogle,
  getAuthGoogleCallback,
} from "../controllers/userController";

const authRouter = express.Router();

authRouter.get("/google", getAuthGoogle);
authRouter.get("/google/callback", getAuthGoogleCallback);

export default authRouter;
