// filepath: d:\NodeJsProjects\ExpressNEWPRo\express-production-app\src\routes\v1\auth.routes.js
import { Router } from 'express';
import { AuthController } from '../../controllers/auth.controller.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { authValidation } from '../../validators/auth.validator.js';

const router = Router();

/**
 * @swagger
 * /v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/register', 
  validateRequest(authValidation.register),
  AuthController.register
);

router.post('/login',
  validateRequest(authValidation.login),
  AuthController.login
);

export default router;



//You can access your API documentation at:
//http://localhost:3000/api-docs
