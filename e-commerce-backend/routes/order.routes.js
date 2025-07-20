const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/order.controller");
const authMiddleware = require("../middleware/auth.middleware");
const orderController = require("../controllers/order.controller");

router.post("/", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, orderController.getMyOrders);
router.get("/", authMiddleware, orderController.getAllOrders); // GET all orders


module.exports = router;
