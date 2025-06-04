const rateLimit = require('express-rate-limit');
const geoip = require('geoip-lite');

// ⚙️ Cấu hình tường lửa
const BLOCK_THRESHOLD = 5;
const BLOCK_TIME_MS = 15 * 60 * 1000; // 15 phút

// 📌 Bộ đếm lỗi & IP bị chặn
const failedRequestCounts = new Map(); // IP -> số lỗi
const blockedIPs = new Map(); // IP -> thời gian hết chặn

// 🛡️ Middleware chặn IP & quốc gia
const ipBlocker = (req, res, next) => {
    const ip =
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.ip;

    req.clientIP = ip; // Gắn vào request để dùng lại sau

    // ⛔ Nếu IP đang bị chặn
    const unblockAt = blockedIPs.get(ip);
    if (unblockAt && Date.now() < unblockAt) {
        return res.status(429).json({
            message: 'IP của bạn đã bị tạm thời chặn do gửi quá nhiều yêu cầu lỗi.',
        });
    } else if (unblockAt && Date.now() >= unblockAt) {
        // ✅ Hết thời gian chặn => dọn
        blockedIPs.delete(ip);
        failedRequestCounts.delete(ip);
    }

    // 🔍 Chặn IP từ quốc gia bị cấm (FR - Pháp)
    const geo = geoip.lookup(ip);
    const country = geo?.country;
    if (country === 'FR') {
        return res.status(403).json({
            message: 'Truy cập từ quốc gia này đã bị chặn bởi firewall.',
        });
    }

    next();
};

// 📉 Middleware theo dõi lỗi và chặn nếu vượt ngưỡng
const errorTracker = (err, req, res, next) => {
    const ip = req.clientIP ||
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.ip;

    const statusCode = err?.statusCode || err?.status || 500;

    if (statusCode >= 400) {
        const count = failedRequestCounts.get(ip) || 0;
        const newCount = count + 1;
        failedRequestCounts.set(ip, newCount);

        if (newCount >= BLOCK_THRESHOLD) {
            blockedIPs.set(ip, Date.now() + BLOCK_TIME_MS);
            console.warn(`🚫 IP ${ip} bị chặn trong ${BLOCK_TIME_MS / 60000} phút.`);
        } else {
            console.warn(`⚠️ IP ${ip} lỗi ${statusCode} (${newCount}/${BLOCK_THRESHOLD})`);
        }
    }

    next(err);
};

// 🚦 Giới hạn tốc độ request theo IP
const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // Tối đa 100 request / 15 phút
    message: 'Bạn gửi quá nhiều yêu cầu. Vui lòng thử lại sau.',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    ipBlocker,
    errorTracker,
    apiRateLimiter,
};
