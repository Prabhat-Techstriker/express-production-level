import { UserService } from '../services/user.service.js';
import { catchAsync } from '../utils/catch-async.js';
import { ResponseHandler } from '../utils/response.handler.js';
import { uploadToCloudinary } from '../utils/upload.js';

export class UserController {
  static getProfile = catchAsync(async (req, res) => {
    ResponseHandler.success(res, req.user, 'Profile retrieved successfully');
  });

  static updateProfile = catchAsync(async (req, res) => {
    const user = await UserService.updateUser(req.user.id, req.body);
    ResponseHandler.success(res, user, 'Profile updated successfully');
  });

  static deleteProfile = catchAsync(async (req, res) => {
    await UserService.deleteUser(req.user.id);
    ResponseHandler.success(res, null, 'Profile deleted successfully');
  });

  static uploadProfilePicture = catchAsync(async (req, res) => {
    if (!req.file) {
      throw new AppError('Please upload an image', 400);
    }

    const imageUrl = await uploadToCloudinary(req.file);
    const user = await UserService.updateUser(req.user.id, {
      profilePicture: imageUrl
    });

    ResponseHandler.success(res, user, 'Profile picture uploaded successfully');
  });

  // Admin only routes
  static getAllUsers = catchAsync(async (req, res) => {
    const users = await UserService.getAllUsers();
    ResponseHandler.success(res, users, 'Users retrieved successfully');
  });
}