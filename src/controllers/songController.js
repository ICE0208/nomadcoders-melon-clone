import Song from "../models/Song";
import User from "../models/User";

const tempThumb =
  "https://images.squarespace-cdn.com/content/v1/55fc0004e4b069a519961e2d/1442590746571-RPGKIXWGOO671REUNMCB/image-asset.gif?format=300w";

const musics = [
  { title: "Title1", artist: "artist1", thumb: tempThumb, views: 101 },
  { title: "Title2", artist: "artist2", thumb: tempThumb, views: 53 },
  { title: "Title3", artist: "artist3", thumb: tempThumb, views: 74 },
  { title: "Title3", artist: "artist3", thumb: tempThumb, views: 72 },
  { title: "Title3", artist: "artist3", thumb: tempThumb, views: 24 },
  { title: "Title3", artist: "artist3", thumb: tempThumb, views: 56 },
  { title: "Title3", artist: "artist3", thumb: tempThumb, views: 34 },
  { title: "Title3", artist: "artist3", thumb: tempThumb, views: 14 },
  { title: "Title3", artist: "artist3", thumb: tempThumb, views: 10 },
  { title: "Title3", artist: "artist3", thumb: tempThumb, views: 62 },
  { title: "Title3", artist: "artist3", thumb: tempThumb, views: 1 },
  { title: "Title3", artist: "artist3", thumb: tempThumb, views: 2 },
  { title: "Title3", artist: "artist3", thumb: tempThumb, views: 3 },
];

musics.sort((a, b) => b.views - a.views);

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home", musics: musics });
};
