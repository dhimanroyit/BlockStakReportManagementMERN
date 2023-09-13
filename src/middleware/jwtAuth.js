import { BadRequestError } from '../utils/errors.js';
import { verifyAccessToken } from '../utils/jwt.js';

/**
 * Middleware for JWT authentication.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 * @throws {BadRequestError} If authentication fails, an error is thrown.
 */

const jwtAuth = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization || req.headers.Authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
      throw new BadRequestError('token not found');
    }
    const token = bearer.split('Bearer ')[1].trim();
    const payload = await verifyAccessToken(token);
    if (!payload) throw new BadRequestError('unauthorized');
    req.user = { ...payload.userInfo };
    next();
  } catch (err) {
    next(err);
  }
};
export default jwtAuth;
