const asyncHandle = require('../helper/asyncHandle');

const adminOnly = asyncHandle(async (req, res, next) => {
    if (!req.user || req.user.user_role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Chỉ admin mới được phép truy cập!',
        });
    }
    next();
});

module.exports = { adminOnly };
