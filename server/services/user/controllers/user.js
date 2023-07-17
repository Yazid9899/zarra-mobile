const { ObjectId } = require("mongodb");
const User = require("../models/user");
class UserController {
  static async findAllUsers(req, res, next) {
    try {
      const data = await User.findAll();
      console.log(data, "INI DATA DARI SERVICE USER");
      res.status(200).json({
        statusCode: 200,
        data,
      });
    } catch (err) {
      console.log(err, "INI DARI USER SEERVICE ERRORRSZ");
    }
  }
  static async createUser(req, res, next) {
    try {
      const { email, password, username } = req.body;

      const newUser = await User.createUser({
        email,
        password,
        username,
      });

      res.status(201).json({
        statusCode: 201,
        id: newUser.insertedId,
        email,
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async findUserById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      res.status(200).json({
        statusCode: 200,
        data: user,
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await User.deleteUser(id);

      res.status(200).json({
        statusCode: 200,
        message: "User Deleted",
      });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = UserController;
