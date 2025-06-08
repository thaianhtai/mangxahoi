const Admin = require('../../models/admin.model');
const { RequestError } = require('../../core/error.response');
const createTokenPairs = require('../../utils/auth/createTokenPairs');

class AdminAuthService {
  static async login({ admin_email, admin_password }) {
    const admin = await Admin.findOne({ admin_email });

    if (!admin) throw new RequestError('Email không tồn tại');

    const isMatch = await admin.comparePassword(admin_password);
    if (!isMatch) throw new RequestError('Mật khẩu không đúng');

    if (admin.admin_isBlocked) throw new RequestError('Tài khoản đã bị chặn');

    const tokens = await createTokenPairs({ _id: admin._id, role: admin.admin_role });

    return {
      admin: {
        _id: admin._id,
        admin_name: admin.admin_name,
        admin_email: admin.admin_email,
        admin_role: admin.admin_role,
        admin_permissions: admin.admin_permissions,
      },
      tokens,
    };
  }
}

module.exports = AdminAuthService;
