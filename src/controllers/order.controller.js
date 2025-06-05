import { OrderService } from '../services/order.service.js';
import { catchAsync } from '../utils/catch-async.js';
import { ResponseHandler } from '../utils/response.handler.js';

export class OrderController {
  static createOrder = catchAsync(async (req, res) => {
    const order = await OrderService.createOrder(req.body, req.user.id);
    ResponseHandler.success(res, order, 'Order created successfully', 201);
  });

  static getUserOrders = catchAsync(async (req, res) => {
    const orders = await OrderService.getUserOrders(req.user.id);
    ResponseHandler.success(res, orders, 'Orders retrieved successfully');
  });

  static getOrder = catchAsync(async (req, res) => {
    const order = await OrderService.getOrderById(req.params.id, req.user.id);
    ResponseHandler.success(res, order, 'Order retrieved successfully');
  });

  static updateOrderStatus = catchAsync(async (req, res) => {
    const order = await OrderService.updateOrderStatus(
      req.params.id,
      req.body.status,
      req.user.id
    );
    ResponseHandler.success(res, order, 'Order status updated successfully');
  });
}