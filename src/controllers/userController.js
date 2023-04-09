import User from "../models/User";

export const getAuthGoogleCallback = (req, res) => {
  console.log("login");
  return res.redirect("/");
};

export const getLogout = (req, res) => {
  console.log("logout");
  req.logout(() => {
    res.redirect("/");
  });
};
