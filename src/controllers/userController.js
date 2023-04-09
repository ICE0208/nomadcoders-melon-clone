import User from "../models/User";

export const getAuthGoogleCallback = async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  const { id: userID, displayName } = req.user;

  try {
    const isUserExists = await User.exists({ userID });
    if (!isUserExists) {
      // ? 등록되지 않은 유저일 때
      await User.create({
        userID,
        displayName,
      });
    }
  } catch (err) {
    console.log(`Mongo 검색과정에서 예외 발생\nmsg: ${err}`);
    return req.logout(() => {
      res.redirect("/");
    });
  }

  return res.redirect("/");
};

export const getLogout = (req, res) => {
  console.log("logout");
  req.logout(() => {
    res.redirect("/");
  });
};
