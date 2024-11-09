import { v2 as cloudinary } from 'cloudinary';
import productModel from "../models/productModel.js"

//Function to add product
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
            bestSeller: bestSeller === "true",
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added" });
    } catch (error) {
        console.error("Error adding product:", error);
        res.json({ success: false, message: "Failed to add product. " + error.message });
    }
};


//Function to list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//Function to deleting product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//Function to single product info
const singleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { addProduct, listProducts, removeProduct, singleProduct }