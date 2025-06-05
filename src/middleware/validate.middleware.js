import { validationResult } from 'express-validator';
import { ResponseHandler } from '../utils/response.handler.js';

export const validateRequest = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.error(
        res,
        'Validation Error',
        400,
        errors.array()
      );
    }
    next();
  };
};