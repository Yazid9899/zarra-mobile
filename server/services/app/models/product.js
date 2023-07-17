"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.hasMany(models.Image, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name is required",
          },
        },
      },
      slug: DataTypes.STRING,
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description is required",
          },
        },
      },
      price: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
          min: {
            args: 50_000,
            msg: "minimal Price is 50.000",
          },
        },
      },
      mainImg: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
