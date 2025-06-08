const mongoose = require("mongoose"); // ✅ Thêm dòng này nếu chưa có

const friendRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
