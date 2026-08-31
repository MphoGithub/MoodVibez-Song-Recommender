import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {message:"Too many login attempts from this IP, please try again after 15 minutes"},
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // Only count failed requests toward the rate limit
});

export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message:{message:"Too many accounts created from this IP, please try again later"},
    standardHeaders:true,
    legacyHeaders:false,
})