import { UnauthorizedError } from '../utils/errors.js';

/**
 * Middleware for checking user roles.
 *
 * @param {Array} roles - An array of roles to check against.
 * @returns {function} Middleware function that takes Express request, response, and next parameters.
 * @throws {UnauthorizedError} If the user's role is not in the specified roles, an error is thrown.
 */
const checkRole = (roles) => async (req, res, next) => {
  !roles.includes(req.user.role)
    ? next(new UnauthorizedError('unauthorized'))
    : next();
};

export default checkRole;
