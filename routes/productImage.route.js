import express from 'express'
import uploadProductImage from '../controllers/productImage.controller.js';
import { upload } from '../middleware/multerConfig.js';

const productImage = express.Router();

productImage.post('/product-Image/:productId', upload.single("image"), uploadProductImage)

export default productImage;