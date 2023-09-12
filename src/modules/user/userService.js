import bcrypt from 'bcrypt';
import { ConflictError } from '../../utils/errors.js';
import BaseService from '../base/baseService.js';
import userRepository from './userRepository.js';

// UserService class provide method form user related operation
class UserService extends BaseService {
  #repository;

  /**
   * Constructor for user service
   * @param {userRepository} repository - the user repository operate database
   * @param {string} serviceName
   */
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  /**
   * User register method
   * @param {object} item - user data
   * @returns {object} - created user data
   * @throws {ConflictError} - if email are already use
   */
  async signUpUser(item) {
    const { password, email } = item;
    const query = {
      email: email,
    };
    const isEmail = await this.#repository.findOne(query);

    if (isEmail) throw new ConflictError('email are already use');

    let saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);
    const userObj = { ...item, password: hashPassword };

    const user = await super.insertOne(userObj);
    const userRes = { ...user._doc };
    delete userRes.password;
    return userRes;
  }
}

export default new UserService(userRepository);
