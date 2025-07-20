const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    image: String,
    category: String,
    countInStock: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
