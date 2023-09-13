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
}

export default new AuthService(authRepository, 'authentication');
