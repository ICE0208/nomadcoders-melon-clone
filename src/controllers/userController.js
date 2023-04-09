import User from "../models/User";

export const getAuthGoogleCallback = (req, res) => {
  console.log(req.user);
  return res.redirect("/");
};
