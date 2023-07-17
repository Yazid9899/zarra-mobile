const express = require("express");
const ProductController = require("../controllers/productController");
const router = express.Router();

router.get("/", ProductController.getAllProduct);
router.post("/", ProductController.createProduct);

router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.editProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
