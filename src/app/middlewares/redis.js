const redis = require('redis');

export default async (req, res, next) => {
  const connectRedis = await redis.createClient();

  connectRedis.on('connect', function() {
    req.connectRedis = connectRedis;
    return next();
  });

  connectRedis.on('error', function (err) {
    req.connectRedis = false;
    return next();
  });
};
