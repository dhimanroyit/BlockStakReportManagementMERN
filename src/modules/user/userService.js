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

  /**
   * get user all data with pagination
   * @param {object} query
   * @param {object} option - query string object with page, limit
   * @returns {object} return all user data with pagination
   */
  async findAll(query, option) {
    const { page, limit } = option;
    const pageIndex = page > 0 ? parseInt(page) : 1;
    const pageLimit = limit > 0 ? parseInt(limit) : 10;
    const pageSkip = (pageIndex - 1) * pageLimit;
    const isNextPage = pageIndex * pageLimit;
    const result = {};
    const pagination = {};
    const data = await this.#repository.findAll(query, {
      select: '-password',
      skip: pageSkip,
      limit: limit,
    });
    const totalUser = await this.#repository.countDocuments(query);
    pagination.page = pageIndex;
    pagination.limit = pageLimit;
    pagination.totalPage = Math.ceil(totalUser / limit);
    if (pageIndex > 1) {
      pagination.prevPage = pageIndex - 1;
    } else {
      pagination.prevPage = null;
    }
    if (isNextPage < totalUser) {
      pagination.nextPage = pageIndex + 1;
    } else {
      pagination.nextPage = null;
    }
    result.data = data;
    result.pagination = pagination;
    return result;
  }

  /**
   * get single user method
   * @param {ObjectId} id - id must be mongodb object id
   * @returns {object} user data
   */
  async findById(id) {
    const user = await super.findById(id, { select: '-password' });
    return user;
  }

  /**
   *
   * @param {ObjectId} id - id must be mongodb object id
   * @param {object} item  - user update data
   * @returns {object} user updated data
   */
  async updateById(id, item) {
    const user = { ...item };
    if (item?.password) {
      let saltRound = 10;
      user.password = await bcrypt.hash(item.password, saltRound);
    }
    const data = await super.updateById(id, user);
    delete data.password;
    return data;
  }
}

export default new UserService(userRepository, 'User');
