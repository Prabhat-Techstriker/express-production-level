import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
import { AppError } from '../utils/app-error.js';

export class OrderService {
  static async createOrder(orderData, userId) {
    // Validate product stock and calculate total
    const productsToUpdate = [];
    let totalAmount = 0;

    for (const item of orderData.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new AppError(`Product ${item.product} not found`, 404);
      }
      if (product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for product ${product.name}`, 400);
      }

      totalAmount += product.price * item.quantity;
      productsToUpdate.push({
        updateOne: {
          filter: { _id: product._id },
          update: { $inc: { stock: -item.quantity } }
        }
      });
    }

    // Create order and update product stock
    const order = await Order.create({
      ...orderData,
      user: userId,
      totalAmount
    });

    await Product.bulkWrite(productsToUpdate);
    return order;
  }

  static async getUserOrders(userId) {
    return await Order.find({ user: userId })
      .populate('items.product')
      .sort('-createdAt');
  }

  static async getOrderById(orderId, userId) {
    const order = await Order.findOne({ _id: orderId, user: userId })
      .populate('items.product');
    
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    return order;
  }

  static async updateOrderStatus(orderId, status, userId) {
    const order = await Order.findOneAndUpdate(
      { _id: orderId, user: userId },
      { status },
      { new: true }
    );

    if (!order) {
      throw new AppError('Order not found', 404);
    }
    return order;
  }
}