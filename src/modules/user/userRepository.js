import BaseRepository from '../base/baseRepository.js';
import { User } from '../../models/index.js';

class UserRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new UserRepository(User);
