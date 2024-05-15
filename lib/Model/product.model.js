// Importing required modules
import mongoose from "mongoose";
import * as cheerio from 'cheerio';

// Destructuring Timestamp from mongodb
const { Timestamp } = require("mongodb");

// Defining the product schema
const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    currency: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    priceHistory: [{
        price: { type: Number, required: true },
        date: { type: Number, default: Date.now }
    }],
    highestPrice: { type: Number, required: true },
    lowestPrice: { type: Number },
    avgPrice: { type: Number },
    discountRate: { type: Number },
    reviewsCount:{ type: Number},
    isOutOfStock: { type: Boolean, default: false },
    category: { type: String },
    description: { type: String, required: true },
    user: [{
        email: { type: String, required: true },
    }]
}, { timestamps: true });

// Defining or retrieving the Product model
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Exporting the Product model
export default Product;
