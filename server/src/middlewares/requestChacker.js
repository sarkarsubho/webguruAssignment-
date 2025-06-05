const os = require('os');

const requestChecker = (req, res, next) => {
    const method = req.method;
    const endpoint = req.originalUrl;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ip = req.ip || req.connection.remoteAddress || 'Unknown';
    const timestamp = new Date().toISOString();

    // Device detection (basic)
    let deviceType = 'Unknown';
    if (/mobile/i.test(userAgent)) {
        deviceType = 'Mobile';
    } else if (/tablet/i.test(userAgent)) {
        deviceType = 'Tablet';
    } else if (/windows|macintosh|linux/i.test(userAgent)) {
        deviceType = 'Desktop';
    }

    // Log the request details
    console.log(`[${timestamp}] ${method} ${endpoint} | Device: ${deviceType} | User-Agent: ${userAgent} | IP: ${ip}`);

    next();
};

module.exports = requestChecker;