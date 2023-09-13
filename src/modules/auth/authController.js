import catchError from '../../middleware/errors/catchError.js';
import { BadRequestError } from '../../utils/errors.js';
import responseHandler from '../../utils/responseHandler.js';
import authService from './authService.js';

class AuthController {
  signIn = catchError(async (req, res, next) => {
    const { accessToken, refreshToken } = await authService.signIn(req.body);
    const userRes = responseHandler(200, 'login successfully', {
      refreshToken: `Bearer ${refreshToken}`,
    });
    res.cookie('accessToken', `Bearer ${accessToken}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 1000,
    });
    res.status(userRes.statusCode).json(userRes);
  });

  refresh = catchError(async (req, res, next) => {
    const { accessToken, refreshToken } = await authService.refresh(
      req.headers
    );
    const userRes = responseHandler(200, 'login successfully', {
      refreshToken: `Bearer ${refreshToken}`,
    });
    res.cookie('accessToken', `Bearer ${accessToken}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 60 * 1000,
    });
    res.status(userRes.statusCode).json(userRes);
  });

  logout = catchError(async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.accessToken) throw new BadRequestError('no cookie');
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });

    const userRes = responseHandler(200, 'logout successfully');

    res.status(userRes.statusCode).json(userRes);
  });
}

export default new AuthController();
