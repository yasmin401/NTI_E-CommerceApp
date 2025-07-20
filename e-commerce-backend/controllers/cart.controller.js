const Cart = require("../models/cart.model");

// Get current user's cart
exports.getCart = async (req, res) => {
    const userId = req.user.userId;

    try {
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ message: "Cart is empty", items: [] });
        }

        res.status(200).json({ items: cart.items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
//Add
exports.addToCart = async (req, res) => {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity }],
            });
        } else {
            const existingItem = cart.items.find(item => item.productId.toString() === productId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
//update
exports.updateCartItem = async (req, res) => {
    const userId = req.user.userId;
    const { productId, quantity, action } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

        if (action === 'decrease') {
            cart.items[itemIndex].quantity -= 1;
            if (cart.items[itemIndex].quantity <= 0) {
                // Remove the item completely
                cart.items.splice(itemIndex, 1);
            }
        } else if (quantity !== undefined) {
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();

        res.status(200).json({ message: "Cart item updated", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
//delete
exports.removeFromCart = async (req, res) => {
    const userId = req.user.userId;
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


