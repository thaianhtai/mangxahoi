const express = require("express");
const UserController = require("../controllers/user.controller");
const asyncHandle = require("../helper/asyncHandle");
const { adminAuthentication, restrictTo } = require("../middlewares/auth.admin.middleware");
const PERMISSIONS = require("../config/permissions");

const router = express.Router();

// Lấy tất cả người dùng (không cần phân quyền)
router.get("/all", asyncHandle(UserController.getAllUsers));

// Áp dụng xác thực và phân quyền
router.use(adminAuthentication);
router.use(restrictTo(PERMISSIONS.USER_MANAGE));

// Thêm người dùng mới
router.post("/add", asyncHandle(UserController.createUser));

// Lấy thông tin người dùng theo ID
router.get("/:id/search", asyncHandle(UserController.getUserById));

// Cập nhật thông tin người dùng
router.put("/:id/update", asyncHandle(UserController.updateUser));

// Xóa người dùng
router.delete("/:id/delete", asyncHandle(UserController.deleteUser));

module.exports = router;
