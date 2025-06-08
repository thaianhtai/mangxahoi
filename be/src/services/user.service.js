// src/services/user.service.js
"use strict";
const User = require("../models/user.model");
const { BadRequestError } = require("../core/error.response");

class UserService {
  static async createUser(data) {
    const existingUser = await User.findOne({ user_email: data.user_email });
    if (existingUser) throw new BadRequestError("Email đã tồn tại");

    const newUser = await User.create(data);
    return newUser;
  }

  static async getAllUsers() {
    return await User.find().select("-user_password");
  }

  static async getUserById(userId) {
    const user = await User.findById(userId).select("-user_password");
    if (!user) throw new BadRequestError("Không tìm thấy người dùng");
    return user;
  }

  static async updateUser(userId, updateData) {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-user_password");
    if (!user) throw new BadRequestError("Không tìm thấy người dùng");
    return user;
  }

  static async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new BadRequestError("Không tìm thấy người dùng");
    return user;
  }
}

module.exports = UserService;
