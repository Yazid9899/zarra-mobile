const { Category, Product } = require("../models/index");

class CategoryControlller {
  static async getAllCategory(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json({
        statusCode: 200,
        categories: data,
      });
    } catch (err) {
      next(err);
    }
  }
  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      const newCategory = await Category.create({ name: name });

      res.status(201).json({
        statusCode: 201,
        message: "Category Added",
        category: newCategory,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);
      if (!category) throw { name: "not found" };

      const categoryUsed = await Product.findOne({
        where: {
          categoryId: id,
        },
      });
      if (categoryUsed) throw { name: "categoryUsed" };

      await Category.destroy({
        where: {
          id: id,
        },
      });

      res.status(201).json({
        statusCode: 201,
        message: "Category deleted",
        categoryDeleted: category.name,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryControlller;
