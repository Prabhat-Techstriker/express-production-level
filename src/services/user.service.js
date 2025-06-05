import { User } from '../models/user.model.js';
import { AppError } from '../utils/app-error.js';

export class UserService {
  static async getAllUsers() {
    return await User.find().select('-password');
  }

  static async updateUser(userId, updateData) {
    // Prevent password update through this route
    delete updateData.password;
    
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  static async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }
}