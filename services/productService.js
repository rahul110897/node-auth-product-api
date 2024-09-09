// services/productService.js
import Product from '../models/Product.js';

export const createProduct = async (data, userId) => {
  const newProduct = new Product({ ...data, createdBy: userId });
  return await newProduct.save();
};

export const getAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 }).populate('createdBy', 'username');
};

export const getProductById = async (id) => {
  return await Product.findById(id).populate('createdBy', 'username');
};

export const updateProductById = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProductById = async (id) => {
  return await Product.findByIdAndDelete(id);
};

export const deleteAllProduct = async () => {
  return await Product.deleteMany();
};
