import express from 'express'
import Product from '../models/product.model.js';
import { getProducts, getByIdProduct, insertProduct, updateProduct, deleteProduct, paginationProduct, filterData, serchingData } from '../controllers/product.controller.js';
const productRouter = express.Router();

// INSERT 
productRouter.post('/', insertProduct)

// GET ALL
productRouter.get('/', getProducts);

//pagination : 
productRouter.get('/paginate', paginationProduct);

// Filter : 
productRouter.get('/filter', filterData);

// Search :
productRouter.get('/search', serchingData);

// GET BY ID
productRouter.get('/:id', getByIdProduct);

// Update 
productRouter.put('/:id', updateProduct);

// DELETE
productRouter.delete('/:id', deleteProduct);


export { productRouter };