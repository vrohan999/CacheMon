const cache = {};
const TTL_MS = 60 * 1000; //1 Min

function isExpired(entry) {
    return Date.now() - entry.createdAt > TTL_MS;
}

function get(key) {
    const entry = cache[key];
    if (!entry) return null;
    if (isExpired(entry)) {
        delete cache[key];
        return null;
    }
    return entry.value;
}

function set(key, value) {
    cache[key] = { value, createdAt: Date.now() };
}

function invalidateAll() {
    Object.keys(cache).forEach((key) => delete cache[key]);
}

function cacheMiddleware(req, res, next) {
    const key = req.url;
    const value = get(key);
    if (value) {
        res.set('X-Cache', 'HIT');
        return res.json(value);
    }
    res.set('X-Cache', 'MISS');
    next();
}

module.exports = { get, set, invalidateAll, cacheMiddleware };
