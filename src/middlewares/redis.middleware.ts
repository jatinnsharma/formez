import Redis from "ioredis";

// Connect to the default Redis server on localhost and default port (6379)
const redis = new Redis();

export const cacheUserData = async (req, res, next) => {
  redis.get("userData", async (err, data) => {
    if (err) {
      console.error("Redis error:", err);
      next();
    } else if (data) {
      res.json(JSON.parse(data));
    } else {
      next();
    }
  });
};

// Middleware function to save data to Redis cache
export const saveUserDataWithUserIdToCache = (userId, userData) => {
  // Save the data to Redis cache
  // Set expiration time to 1 hour (3600 seconds)
  redis.set(userId, JSON.stringify(userData), "EX", 3600);
};

export const saveUserDataToCache = (key, userData) => {
  console.log(key);
  console.log(userData);
  redis.set(key, JSON.stringify(userData), "EX", 3600);
};

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redis;
