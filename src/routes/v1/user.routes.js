import { Router } from 'express';
import { UserController } from '../../controllers/user.controller.js';
import { protect, restrictTo } from '../../middleware/auth.middleware.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { userValidation } from '../../validators/user.validator.js';
import { uploadMiddleware } from '../../utils/upload.js';

const router = Router();

router.use(protect);

// Regular user routes
router
  .route('/profile')
  .get(UserController.getProfile)
  .patch(validateRequest(userValidation.updateProfile), UserController.updateProfile)
  .delete(UserController.deleteProfile)
  .post(
    '/profile/picture',
    protect,
    uploadMiddleware,
    UserController.uploadProfilePicture
  );

// Admin only routes
router
  .route('/')
  .get(restrictTo('admin'), UserController.getAllUsers);

export default router;