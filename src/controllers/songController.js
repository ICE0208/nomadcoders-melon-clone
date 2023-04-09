import Song from "../models/Song";
import User from "../models/User";

const getSongs = async (req, res) => {
  try {
    // _id값 제외하고 모든 데이터 가져오기
    const musics = await Song.find({}, { _id: 0 }).sort({ views: "desc" });
    return musics;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const likeSong = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(400).json({ msg: "is Not Authenticated!" });
  }

  const { id: ytID } = req.params;
  const songs = await getSongs();
  const songIDList = songs.map((song) => song.ytID);
  if (!songIDList.includes(ytID)) {
    return res
      .status(400)
      .json({ msg: `No song found with this ID (${ytID})!` });
  }

  const { id: userID } = req.user;
  const user = await User.findOne({ userID });
  if (!user) {
    return res
      .status(400)
      .json({ msg: `No user found with this ID (${userID})!` });
  }

  const likedList = user.likedSong;
  if (likedList.includes(ytID)) {
    return res.status(400).json({ msg: `Already on likedSong (${ytID})!` });
  }

  user.likedSong.push(ytID);
  req.session.likedSong = user.likedSong;
  await user.save();
  return res
    .status(200)
    .json({ msg: "SUCCESS", likedSongList: user.likedSong });
};

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home", musics: await getSongs() });
};

export const registerView = async (req, res) => {
  const { id: ytIDToFind } = req.params;
  const song = await Song.findOne({ ytID: ytIDToFind });
  if (!song) {
    return res.sendStatus(404);
  }
  song.views = song.views + 1;
  await song.save();
  return res.sendStatus(200);
};
