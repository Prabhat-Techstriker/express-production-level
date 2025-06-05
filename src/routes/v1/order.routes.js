import { Router } from 'express';
import { OrderController } from '../../controllers/order.controller.js';
import { protect, restrictTo } from '../../middleware/auth.middleware.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { orderValidation } from '../../validators/order.validator.js';

const router = Router();

router.use(protect); // All order routes require authentication

router
  .route('/')
  .post(
    validateRequest(orderValidation.create),
    OrderController.createOrder
  )
  .get(OrderController.getUserOrders);

router
  .route('/:id')
  .get(OrderController.getOrder)
  .patch(
    validateRequest(orderValidation.updateStatus),
    restrictTo('admin'),
    OrderController.updateOrderStatus
  );

export default router;