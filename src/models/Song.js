import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  ytID: { type: String, required: true },
  views: { type: Number, required: true },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
