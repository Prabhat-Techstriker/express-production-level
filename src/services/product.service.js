import { Product } from '../models/product.model.js';
import { AppError } from '../utils/app-error.js';

export class ProductService {
  static async createProduct(productData) {
    return await Product.create(productData);
  }

  static async getAllProducts(query) {
    const { page = 1, limit = 10, category, minPrice, maxPrice } = query;
    
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    return await Product.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
  }

  static async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  static async updateProduct(id, updateData) {
    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  static async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }
}