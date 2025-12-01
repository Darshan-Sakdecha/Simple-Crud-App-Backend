import mongoose from "mongoose";

const productImageSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true })

const ProductImage = mongoose.model("ProductImage", productImageSchema);

export default ProductImage;