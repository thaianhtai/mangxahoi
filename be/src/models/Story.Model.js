// models/story.model.js

const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  media_url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    maxlength: 300,
  },
  viewers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24, // tự động xoá sau 24 giờ
  },
});

module.exports = mongoose.model("Story", storySchema);
