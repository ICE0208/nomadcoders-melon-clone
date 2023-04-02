import Song from "../models/Song";
import User from "../models/User";

const getSongs = async (req, res) => {
  try {
    let musics = await Song.find({}).sort({ views: "desc" });
    musics = [...musics, ...musics, ...musics];
    return musics;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home", musics: await getSongs() });
};
