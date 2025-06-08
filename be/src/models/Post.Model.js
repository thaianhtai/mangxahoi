const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    maxlength: 2000,
  },
  images: [String], // URL ảnh
  videos: [String], // URL video
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  shares: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  privacy: {
    type: String,
    enum: ["public", "friends", "private"],
    default: "public",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Post", postSchema);
