import { Router } from 'express';
import { ProductController } from '../../controllers/product.controller.js';
import { protect, restrictTo } from '../../middleware/auth.middleware.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { productValidation } from '../../validators/product.validator.js';

const router = Router();

// Route to add a new product
router
  .route('/')
  .post(
    protect,
    restrictTo('admin'),
    validateRequest(productValidation.create),
    ProductController.createProduct
  )
  .get(ProductController.getAllProducts);

// Route to get a product by ID
router
  .route('/:id')
  .get(ProductController.getProduct)
  .patch(
    protect,
    restrictTo('admin'),
    validateRequest(productValidation.update),
    ProductController.updateProduct
  )
  .delete(
    protect,
    restrictTo('admin'),
    ProductController.deleteProduct
  );

export default router;