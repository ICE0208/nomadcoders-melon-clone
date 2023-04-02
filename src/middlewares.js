export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "XXXX";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.getThumbUrl = (ytID) => {
    return `https://img.youtube.com/vi/${ytID}/mqdefault.jpg`;
  };
  next();
};
