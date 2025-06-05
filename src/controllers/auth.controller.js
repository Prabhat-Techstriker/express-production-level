import { AuthService } from '../services/auth.service.js';
import { catchAsync } from '../utils/catch-async.js';
import { ResponseHandler } from '../utils/response.handler.js';

export class AuthController {
  static register = catchAsync(async (req, res) => {
    const { user, token } = await AuthService.register(req.body);
    ResponseHandler.success(res, { user, token }, 'Registration successful', 201);
  });

  static login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);
    ResponseHandler.success(res, { user, token }, 'Login successful');
  });
}