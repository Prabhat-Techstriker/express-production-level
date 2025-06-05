'use strict';
const ResponseHandler = require('../utils/response.handler');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return ResponseHandler.error(res, 'Validation Error', 400, err.errors);
  }

  if (err.name === 'UnauthorizedError') {
    return ResponseHandler.error(res, 'Unauthorized', 401);
  }

  return ResponseHandler.error(res, 'Internal Server Error', 500);
};

module.exports = { errorHandler };