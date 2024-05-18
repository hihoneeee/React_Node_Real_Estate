import redis from "../config/redis.config";

export const rateLimter = async (req, res, next) => {
  const clientId = req.headers?.client_id;
  const currentTime = Date.now();
  const client = await redis.hGetAll(`rateLimit-${clientId}`);
  if (Object.keys(client).length === 0) {
    await redis.hSet(`rateLimit-${clientId}`, "createAt", currentTime);
    await redis.hSet(`rateLimit-${clientId}`, "count", 1);

    return next();
  }
  let difference = (currentTime - +client.createAt) / 1000;
  if (difference > +process.env.RATE_LIMIT_RESET) {
    await redis.hSet(`rateLimit-${clientId}`, "createAt", currentTime);
    await redis.hSet(`rateLimit-${clientId}`, "count", 1);
    return next();
  }

  if (client.count > +process.env.RATE_LIMIT_COUNT) {
    return res.status(429).json({
      success: false,
      message: "Too many requests",
    });
  } else {
    await redis.hSet(`rateLimit-${clientId}`, "count", +client.count + 1);
    return next();
  }
};
