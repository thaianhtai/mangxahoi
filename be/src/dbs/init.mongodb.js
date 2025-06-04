"use strict";
const mongoose = require("mongoose");
require("dotenv").config();

const connectUrl = process.env.MONGO_URI; // sửa đúng tên biến bạn đang dùng

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
      .then(() => console.log("✅ MongoDB connected successfully!"))
      .catch((err) => {
        console.error("❌ MongoDB connection failed!", err);
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
