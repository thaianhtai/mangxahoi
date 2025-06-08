const express = require("express");
const AdminController = require("../controllers/admin.controller");
const asyncHandle = require("../helper/asyncHandle");
const { adminAuthentication, restrictTo } = require("../middlewares/auth.admin.middleware");

const router = express.Router();

// ⚠️ Đảm bảo admin đã đăng nhập
router.use(adminAuthentication);

// ⚠️ Yêu cầu quyền ADMIN_MANAGE
router.use(restrictTo("ADMIN_MANAGE"));

// ✅ CRUD routes
router.get("/all", asyncHandle(AdminController.getAllAdmins));
router.post("/add", asyncHandle(AdminController.createAdmin));
router.get("/:id/search", asyncHandle(AdminController.getAdminById));
router.put("/:id/update", asyncHandle(AdminController.updateAdmin));
router.delete("/:id/delete", asyncHandle(AdminController.deleteAdmin));

module.exports = router;
