import bcrypt from 'bcrypt';
import { UnauthorizedError } from '../../utils/errors.js';
import BaseService from '../base/baseService.js';
import authRepository from './authRepository.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../utils/jwt.js';

class AuthService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  /**
   * user sign in service method
   *
   * @param {object} credential - user credential with email & password
   * @returns {object} return access token & refresh token
   * @throws {UnauthorizedError} If the credential not match.
   */

  async signIn(credential) {
    const { email, password } = credential;
    const user = await this.#repository.findOne({ email });
    if (!user) throw new UnauthorizedError('unauthorized');

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) throw new UnauthorizedError('unauthorized');
    const accessToken = generateAccessToken({
      userInfo: { id: user._id, name: user.name, role: user.role },
    });
    const refreshToken = generateRefreshToken({
      userInfo: { id: user._id },
    });
    return { accessToken, refreshToken };
  }
  /**
   * Refreshes an access token and generates a new tokens.
   *
   * @param {object} headers - HTTP request headers object containing the authorization header.
   * @returns {object} An object containing the new access token and refresh token.
   * @throws {BadRequestError} If the authorization header is missing or in an invalid format.
   */
  async refresh(cookies) {
    const cookiesToken = cookies['refreshToken'];
    if (!cookiesToken || !cookiesToken.startsWith('Bearer ')) {
      throw new BadRequestError('token not exist');
    }
    const token = cookiesToken.split('Bearer ')[1].trim();
    const decode = await verifyRefreshToken(token);
    const user = await this.#repository.findById(decode.userInfo.id);
    const accessToken = generateAccessToken({
      userInfo: { id: user._id, name: user.name, role: user.role },
    });
    const refreshToken = generateRefreshToken({
      userInfo: { id: user._id },
    });
    return { accessToken, refreshToken };
  }
}

export default new AuthService(authRepository, 'authentication');
