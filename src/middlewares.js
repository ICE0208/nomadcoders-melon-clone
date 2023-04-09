export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "XXXX";
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.loggedInUser = req.user || {};
  res.locals.getThumbUrl = (ytID) => {
    return `https://img.youtube.com/vi/${ytID}/mqdefault.jpg`;
  };
  next();
};
