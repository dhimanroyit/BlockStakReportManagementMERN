import { User } from '../../models/userModel.js';
import BaseRepository from '../base/baseRepository.js';

class AuthRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new AuthRepository(User);
