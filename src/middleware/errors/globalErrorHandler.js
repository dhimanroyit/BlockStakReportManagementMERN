import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../../utils/errors.js';

/**
 * global error handler middleware for different type custom error check
 *
 * @param {Error} err - error object
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 * @param {Function} next - express next function
 */

const globalErrorHandler = (err, req, res, next) => {
  // default http status code for general error
  let code = 500;
  if (err instanceof BadRequestError) {
    code = err.getErrorCode();
  } else if (err instanceof UnauthorizedError) {
    code = err.getErrorCode();
  } else if (err instanceof NotFoundError) {
    code = err.getErrorCode();
  } else if (err instanceof ConflictError) {
    code = err.getErrorCode();
  }

  // response error details
  res.status(code).json({
    statusCode: code,
    status: 'error',
    message: err.message,
  });
};

export default globalErrorHandler;
