import catchError from '../../middleware/errors/catchError.js';
import { BadRequestError } from '../../utils/errors.js';
import responseHandler from '../../utils/responseHandler.js';
import authService from './authService.js';

class AuthController {
  /**
   * sign in user controller method
   * @route POST /auth/signin
   * @access public
   */
  signIn = catchError(async (req, res, next) => {
    const { accessToken, refreshToken } = await authService.signIn(req.body);
    const userRes = responseHandler(200, 'login successfully', {
      accessToken: `Bearer ${accessToken}`,
    });
    res.cookie('refreshToken', `Bearer ${refreshToken}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    res.status(userRes.statusCode).json(userRes);
  });

  /**
   * get access token by refresh token controller method
   * @route POST /auth/refresh
   * @access private
   */
  refresh = catchError(async (req, res, next) => {
    const { accessToken, refreshToken } = await authService.refresh(
      req.cookies
    );
    const userRes = responseHandler(200, 'login successfully', {
      accessToken: `Bearer ${accessToken}`,
    });
    res.cookie('refreshToken', `Bearer ${refreshToken}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    res.status(userRes.statusCode).json(userRes);
  });

  /**
   * logout controller method
   * @route POST /auth/logout
   * @access private
   */
  logout = catchError(async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) throw new BadRequestError('no cookie');
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });

    const userRes = responseHandler(200, 'logout successfully');

    res.status(userRes.statusCode).json(userRes);
  });
}

export default new AuthController();
