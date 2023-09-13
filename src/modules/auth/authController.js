import catchError from '../../middleware/errors/catchError.js';
import responseHandler from '../../utils/responseHandler.js';
import authService from './authService.js';

class AuthController {
  signIn = catchError(async (req, res, next) => {
    const { accessToken, refreshToken } = await authService.signIn(req.body);
    const userRes = responseHandler(200, 'login successfully', {
      refreshToken,
    });
    res.cookie('accessToken', `Bearer ${accessToken}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    res.status(userRes.statusCode).json(userRes);
  });
}

export default new AuthController();
