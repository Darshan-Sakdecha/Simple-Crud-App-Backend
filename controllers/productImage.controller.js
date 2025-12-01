import ProductImage from "../models/productImage.model.js";
import mongoose from "mongoose";
const uploadProductImage = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid productId" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const newImage = new ProductImage({
            productId,
            imageUrl: req.file.path
        });
        await newImage.save();

        res.status(201).json({
            message: "Image uploaded successfully",
            image: newImage
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default uploadProductImage
