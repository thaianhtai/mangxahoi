"use strict";
const mongoose = require("mongoose");
require("dotenv").config();

const connectUrl = process.env.MONGO_URI;

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(connectUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("✅ Kết nối thành công!");

        // ✅ Import model tại đây để tự động tạo collection
        require("../models/user.model");
        require("../models/Comment.Model");
        require("../models/FriendRequest.Model");
        require("../models/Livestream.Model");
        require("../models/Message.Model");
        require("../models/Notification.Model");
        require("../models/post.model");
        require("../models/SearchHistory.Model");
        require("../models/Story.Model");

        console.log("✅ Đã tạo bảng xong");
      })
      .catch((err) => {
        console.error("❌ Kết nối thật bại!", err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDb = Database.getInstance();
module.exports = instanceMongoDb;
