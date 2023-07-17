const express = require("express");
const OrchestraController = require("../controller/orchestraController");
const router = express();

router.get("/products", OrchestraController.renderAllProduct);
router.post("/products", OrchestraController.createProduct);

module.exports = router;
