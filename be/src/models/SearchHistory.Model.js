const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  keyword: String,
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  searchedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SearchHistory", searchHistorySchema);
