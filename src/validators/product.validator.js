import { body } from 'express-validator';

export const productValidation = {
  create: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Product name is required')
      .isLength({ min: 2 })
      .withMessage('Product name must be at least 2 characters long'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Product description is required'),
    body('price')
      .isNumeric()
      .withMessage('Price must be a number')
      .custom(value => value >= 0)
      .withMessage('Price cannot be negative'),
    body('stock')
      .isInt()
      .withMessage('Stock must be an integer')
      .custom(value => value >= 0)
      .withMessage('Stock cannot be negative'),
    body('category')
      .trim()
      .notEmpty()
      .withMessage('Product category is required')
  ],
  update: [
    body('name').optional().trim().isLength({ min: 2 }),
    body('description').optional().trim(),
    body('price').optional().isNumeric().custom(value => value >= 0),
    body('stock').optional().isInt().custom(value => value >= 0),
    body('category').optional().trim()
  ]
};