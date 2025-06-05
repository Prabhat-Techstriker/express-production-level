import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { AppError } from '../utils/app-error.js';

export class AuthService {
  static async register(userData) {
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
      throw new AppError('Email already exists', 400);
    }
    
    const user = await User.create(userData);
    const token = this.generateToken(user._id);
    
    return { user, token };
  }

  static async login(email, password) {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = this.generateToken(user._id);
    return { user, token };
  }

  static generateToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
  }
}