const asyncHandle = require('../helper/asyncHandle');
const adminModel = require('../models/admin.model');
const verifyAccessToken = require('../utils/auth/verifyAccessToken');

const adminAuthentication = asyncHandle(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Yêu cầu xác thực',
        });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = verifyAccessToken(token);

    if (!decodedToken) {
        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ',
        });
    }

    const admin = await adminModel.findById(decodedToken._id);
    if (!admin) {
        return res.status(401).json({
            success: false,
            message: 'Không tìm thấy admin tương ứng với token',
        });
    }

    req.admin = admin;
    next();
});

const restrictTo = (requiredPermission) =>
    asyncHandle(async (req, res, next) => {
        const { admin } = req;

        // Nếu là superadmin, cho phép truy cập mọi chức năng
        if (admin.admin_role === 'superadmin') {
            return next();
        }

        // Nếu không có quyền nào, từ chối truy cập
        if (!admin.admin_permissions || admin.admin_permissions.length === 0) {
            return res.status(403).json({
                success: false,
                message: 'Không có quyền truy cập',
            });
        }

        // Kiểm tra quyền có nằm trong danh sách quyền của admin không
        if (!admin.admin_permissions.includes(requiredPermission)) {
            return res.status(403).json({
                success: false,
                message: `Bạn cần quyền "${requiredPermission}" để thực hiện hành động này`,
            });
        }

        next();
    });

module.exports = { adminAuthentication, restrictTo };
