const Order = require("../models/order.model");
const Product = require("../models/product.model");

exports.createOrder = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        let totalPrice = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            if (product.countInStock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`,
                });
            }

            totalPrice += product.price * item.quantity;

            product.countInStock -= item.quantity;
            await product.save();
        }

        const order = new Order({
            user: req.user.userId,
            items,
            shippingAddress,
            paymentMethod,
            totalPrice,
        });

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId })
            .populate("items.product", "name price")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        console.error("Error fetching user orders:", err);
        res.status(500).json({ message: "Server error" });
    }
};
// Get all orders 
exports.getAllOrders = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const orders = await Order.find()
            .populate("user", "name email") 
            .populate("items.product", "name price");

        res.json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Server error" });
    }
};
