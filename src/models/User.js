import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  likedSong: {
    type: [Number],
    default: [],
    validate: {
      validator: (v) => v.length === new Set(v).size,
      message: "LikedSong에 중복된 값이 있어서는 안됩니다.",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
