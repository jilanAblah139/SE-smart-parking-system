const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 2*60*1000,
    max: 5,
    message: 'Terlalu banyak request. Coba lagi setelah 2 menit!',
});

module.exports = limiter;
