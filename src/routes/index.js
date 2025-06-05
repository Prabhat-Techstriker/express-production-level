import { Router } from 'express';
import authRoutes from './v1/auth.routes.js';
import userRoutes from './v1/user.routes.js';
import productRoutes from './v1/product.routes.js';
import orderRoutes from './v1/order.routes.js';

const router = Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/users', userRoutes);
router.use('/v1/products', productRoutes);
router.use('/v1/orders', orderRoutes);

export default router;