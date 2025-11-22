import express from 'express'
import Product from '../models/product.model.js';
import { getProducts, getByIdProduct, insertProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
const productRouter = express.Router();

// INSERT 
productRouter.post('/', insertProduct)

// GET ALL
productRouter.get('/', getProducts);

// GET BY ID
productRouter.get('/:id', getByIdProduct);

// Update 
productRouter.put('/:id', updateProduct);

// DELETE
productRouter.delete('/:id', deleteProduct);

export { productRouter };