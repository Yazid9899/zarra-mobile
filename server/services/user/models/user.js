const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/MongoConnection");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("users");
    return users;
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

  static async createUser(user) {
    try {
      const hashedPassword = hashPassword(user.password);
      if (!user.email || !user.password || !user.username)
        throw { error: "register error" };
      return this.getCollections().insertOne({
        email: user.email,
        username: user.username,
        password: hashedPassword,
      });
    } catch (err) {
      next(err);
    }
  }

  static async findById(objectId) {
    return this.getCollections().findOne({
      _id: new ObjectId(objectId),
    });
  }

  static async deleteUser(objectId) {
    try {
      const result = await this.getCollections().deleteOne({
        _id: new ObjectId(objectId),
      });
      return result.deletedCount;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
