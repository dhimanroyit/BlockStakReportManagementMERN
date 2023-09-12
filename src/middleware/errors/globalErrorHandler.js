import { BadRequest, NotFound, Unauthorized } from '../../utils/errors.js';

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
  if (err instanceof BadRequest) {
    code = err.getErrorCode();
  } else if (err instanceof Unauthorized) {
    code = err.getErrorCode();
  } else if (err instanceof NotFound) {
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
