const AdminAuthService = require('../services/auth/adminAuth.service');
const asyncHandle = require('../helper/asyncHandle');

const adminLogin = asyncHandle(async (req, res) => {
  const result = await AdminAuthService.login(req.body);
  return res.status(200).json({
    success: true,
    message: 'Đăng nhập thành công',
    data: result,
  });
});

module.exports = { adminLogin };
