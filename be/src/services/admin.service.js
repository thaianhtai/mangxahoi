const Admin = require("../models/admin.model");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const bcrypt = require("bcryptjs");

class AdminService {
  static async createAdmin({ admin_name, admin_email, admin_password, admin_type = "staff", admin_role = [] }) {
    const existing = await Admin.findOne({ admin_email });
    if (existing) throw new BadRequestError("Email admin đã tồn tại");

    const newAdmin = await Admin.create({
      admin_name,
      admin_email,
      admin_password,
      admin_type,
      admin_role,
    });

    newAdmin.admin_password = undefined;
    return newAdmin;
  }

  static async getAllAdmins() {
    return await Admin.find().select("-admin_password").populate("admin_role", "role_name");
  }

  static async getAdminById(id) {
    const admin = await Admin.findById(id).select("-admin_password").populate("admin_role", "role_name");
    if (!admin) throw new NotFoundError("Không tìm thấy admin");
    return admin;
  }

  static async updateAdmin(id, updateData) {
    if (updateData.admin_password) {
      updateData.admin_password = await bcrypt.hash(updateData.admin_password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .select("-admin_password")
      .populate("admin_role", "role_name");

    if (!updatedAdmin) throw new NotFoundError("Không tìm thấy admin để cập nhật");

    return updatedAdmin;
  }

  static async deleteAdmin(id) {
    const deleted = await Admin.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundError("Không tìm thấy admin để xóa");
    return { message: "Xóa admin thành công" };
  }
}

module.exports = AdminService;
