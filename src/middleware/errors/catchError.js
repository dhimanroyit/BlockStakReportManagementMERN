/**
 * wrap route controller function for catch error
 *
 * @param {Function} controller - route controller function
 * @returns {Function} middleware function wrap with error logic
 */

const catchError = (controller) => {
  return async (req, res, next) => {
    try {
      controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
