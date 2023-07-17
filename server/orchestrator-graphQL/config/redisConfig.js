const Redis = require("ioredis");
const redis = new Redis({
  port: 12557, // Redis port
  host: "redis-12557.c1.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
  password: "58Ly72ZNAGCmpWMgdAU8SLofpb8NEKAL",
});

module.exports = redis;
