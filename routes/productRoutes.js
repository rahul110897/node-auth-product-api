// routes/productRoutes.js
import express from 'express';
import * as productController from '../controllers/productController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new product
router.post('/', authenticate, productController.createProduct);

// Get all products
router.get('/', authenticate, productController.getAllProducts);

// Get a single product by ID
router.get('/:id', authenticate, productController.getProductById);

// Update a product by ID
router.put('/:id', authenticate, productController.updateProductById);

// Delete all products route
router.delete('/deleteAll', authenticate, productController.deleteAllProducts);

// Delete a product by ID
router.delete('/:id', authenticate, productController.deleteProductById);

export default router;
