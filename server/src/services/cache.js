// import Redis from "ioredis";
// export const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

// export const cache = {
//   async get(key) { return redis ? await redis.get(key) : null; },
//   async set(key, value, ttlSec = 300) { if (redis) await redis.set(key, value, "EX", ttlSec); },
//   async del(key) { if (redis) await redis.del(key); }
// }
