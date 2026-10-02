const { invalidateAll } = require('./cache');

function invalidateCacheMiddleware(req, res, next) {
    res.on('finish', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            invalidateAll();
        }
    });
    next();
}

module.exports = { invalidateCacheMiddleware };
