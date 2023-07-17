const APP_SERVICE_URL = process.env.APP_SERVICE_URL || "http://localhost:3002";
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:3001";

module.exports = { APP_SERVICE_URL, USER_SERVICE_URL };
