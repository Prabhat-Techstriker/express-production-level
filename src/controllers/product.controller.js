import { ProductService } from '../services/product.service.js';
import { catchAsync } from '../utils/catch-async.js';
import { ResponseHandler } from '../utils/response.handler.js';
import { uploadToCloudinary } from '../utils/upload.js';

export class ProductController {
  static createProduct = catchAsync(async (req, res) => {
    if (!req.file) {
      throw new AppError('Please upload a product image', 400);
    }

    const imageUrl = await uploadToCloudinary(req.file);
    const productData = {
      ...req.body,
      image: imageUrl,
      createdBy: req.user.id
    };

    const product = await ProductService.createProduct(productData);
    ResponseHandler.success(res, product, 'Product created successfully', 201);
  });

  static getAllProducts = catchAsync(async (req, res) => {
    const products = await ProductService.getAllProducts(req.query);
    ResponseHandler.success(res, products, 'Products retrieved successfully');
  });

  static getProduct = catchAsync(async (req, res) => {
    const product = await ProductService.getProductById(req.params.id);
    ResponseHandler.success(res, product, 'Product retrieved successfully');
  });

  static updateProduct = catchAsync(async (req, res) => {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    ResponseHandler.success(res, product, 'Product updated successfully');
  });

  static deleteProduct = catchAsync(async (req, res) => {
    await ProductService.deleteProduct(req.params.id);
    ResponseHandler.success(res, null, 'Product deleted successfully');
  });
}