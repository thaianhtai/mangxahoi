const AdminService = require("../services/admin.service");

class AdminController {
  static createAdmin = async (req, res) => {
    const result = await AdminService.createAdmin(req.body);
    return res.status(201).json({ success: true, data: result });
  };

  static getAllAdmins = async (req, res) => {
    const result = await AdminService.getAllAdmins();
    return res.status(200).json({ success: true, data: result });
  };

  static getAdminById = async (req, res) => {
    const result = await AdminService.getAdminById(req.params.id);
    return res.status(200).json({ success: true, data: result });
  };

  static updateAdmin = async (req, res) => {
    const result = await AdminService.updateAdmin(req.params.id, req.body);
    return res.status(200).json({ success: true, data: result });
  };

  static deleteAdmin = async (req, res) => {
    const result = await AdminService.deleteAdmin(req.params.id);
    return res.status(200).json({ success: true, ...result });
  };
}

module.exports = AdminController;
