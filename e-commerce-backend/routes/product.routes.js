const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post("/", authMiddleware, isAdmin, productController.createProduct);
router.put("/:id", authMiddleware, isAdmin, productController.updateProduct);
router.delete("/:id", authMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;
