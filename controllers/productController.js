// controllers/productController.js
import * as productService from '../services/productService.js';
import { productMessages } from '../utils/messageUtils.js';
import { successResponse, errorResponse } from '../utils/responseUtils.js';

export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body, req.userId);
    return successResponse(res, 200, productMessages.PRODUCT_CREATED, { product });
  } catch (error) {
    return errorResponse(res, 401, productMessages.SOMETHING_WENT_WRONG, error.message);
  }
};

export const getAllProducts = async (_req, res) => {
  try {
    const products = await productService.getAllProducts();
    return successResponse(res, 200, productMessages.PRODUCT_FETCH, { products });
  } catch (error) {
    return errorResponse(res, 401, productMessages.SOMETHING_WENT_WRONG, error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return errorResponse(res, 404, productMessages.PRODUCT_NOT_FOUND);
    return successResponse(res, 200, productMessages.PRODUCT_FETCH, { product });
  } catch (error) {
    return errorResponse(res, 401, productMessages.SOMETHING_WENT_WRONG, error.message);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const product = await productService.updateProductById(req.params.id, req.body);
    if (!product) return errorResponse(res, 404, productMessages.PRODUCT_NOT_FOUND);
    return successResponse(res, 200, productMessages.PRODUCT_UPDATED, { product });
  } catch (error) {
    return errorResponse(res, 401, productMessages.SOMETHING_WENT_WRONG, error.message);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProductById(req.params.id);
    if (!deletedProduct) errorResponse(res, 404, productMessages.PRODUCT_NOT_FOUND);
    return successResponse(res, 200, productMessages.PRODUCT_DELETED);
  } catch (error) {
    return errorResponse(res, 401, productMessages.SOMETHING_WENT_WRONG, error.message);
  }
};

export const deleteAllProducts = async (_req, res) => {
  try {
    await productService.deleteAllProduct();
    return successResponse(res, 200, productMessages.ALL_PRODUCT_DELETED);
  } catch (error) {
    return errorResponse(res, 401, productMessages.SOMETHING_WENT_WRONG, error.message);
  }
};
