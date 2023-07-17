const { default: axios } = require("axios");
const redis = require("../config/redisConfig");
const USER_SERVER_URL = process.env.FIRST_SERVER_URL || "http://localhost:3001";
const PRODUCT_SERVER_URL =
  process.env.SECOND_SERVER_URL || "http://localhost:3002";

module.exports = class OrchestraController {
  static async renderAllProduct(req, res, next) {
    try {
      const productsCache = await redis.get("products:get");

      if (productsCache) {
        res.status(200).json(JSON.parse(productsCache));
        return;
      }

      const { data } = await axios.get(`${PRODUCT_SERVER_URL}/products`);
      redis.set("products:get", JSON.stringify(data.data));

      res.status(200).json(data.data);
    } catch (err) {
      next(err);
    }
  }

  static async createProduct(req, res, next) {
    try {
      console.log(req.body);
      const { name, description, price, mainImg, categoryId, images } =
        req.body;
      const { data } = await axios.post(`${PRODUCT_SERVER_URL}/products`, {
        data: {
          name,
          description,
          price,
          mainImg,
          categoryId,
          images,
        },
      });

      redis.del("products:get");

      res.status(200).json(data);
    } catch (err) {
      next();
    }
  }
  static async deleteProdct(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.delete(
        `${PRODUCT_SERVER_URL}/products/${id}`
      );

      redis.del("products:get");
      res.status(200).json(data);
    } catch (err) {
      next();
    }
  }
  static async createUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const { data } = await axios.post(`${USER_SERVER_URL}/users`, {
        data: {
          email,
          password,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { objectId } = req.params;
      const { data } = await axios.delete(
        `${USER_SERVER_URL}/users/${objectId}`
      );
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async renderAllUsers(req, res, next) {
    try {
      const { data } = await axios.get(`${USER_SERVER_URL}/users`);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
};
