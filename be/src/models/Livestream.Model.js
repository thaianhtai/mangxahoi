// models/livestream.model.js

const mongoose = require("mongoose");

const livestreamSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  stream_url: {
    type: String,
    required: true,
  },
  viewers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isLive: {
    type: Boolean,
    default: true,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: Date,
}, {
  timestamps: true,
});

module.exports = mongoose.model("Livestream", livestreamSchema);
