const express = require("express");
const CategoryControlller = require("../controllers/categoryController");
const router = express.Router();

router.get("/", CategoryControlller.getAllCategory);
router.post("/", CategoryControlller.createCategory);
router.delete("/:id", CategoryControlller.deleteCategory);

module.exports = router;
