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

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home", musics: await getSongs() });
};

export const registerView = async (req, res) => {
  console.log("??");
  const { id: ytIDToFind } = req.params;
  const song = await Song.findOne({ ytID: ytIDToFind });
  if (!song) {
    return res.sendStatus(404);
  }
  song.views = song.views + 1;
  await song.save();
  return res.sendStatus(200);
};
