// src/controllers/user.controller.js
"use strict";
const UserService = require("../services/user.service");

class UserController {
  static async createUser(req, res, next) {
    try {
      const result = await UserService.createUser(req.body);
      return res.status(201).json({ message: "Tạo người dùng thành công", data: result });
    } catch (err) {
      next(err);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const result = await UserService.getAllUsers();
      return res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const result = await UserService.getUserById(req.params.id);
      return res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const result = await UserService.updateUser(req.params.id, req.body);
      return res.status(200).json({ message: "Cập nhật thành công", data: result });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const result = await UserService.deleteUser(req.params.id);
      return res.status(200).json({ message: "Xóa người dùng thành công", data: result });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
