import { v2 as cloudinary } from 'cloudinary';
import productModel from "../models/productModel.js"

// Add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        const images = [req.files.image1?.[0], req.files.image2?.[0], req.files.image3?.[0], req.files.image4?.[0]]
            .filter(Boolean);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: req.body.bestseller === 'true',
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added" });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Failed to add product: " + error.message });
    }
};

// List all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).lean();
        res.json({ success: true, products })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Single product info — FIXED: was passing entire req.body, now passes req.body.productId
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId).lean();
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addProduct, listProducts, removeProduct, singleProduct }