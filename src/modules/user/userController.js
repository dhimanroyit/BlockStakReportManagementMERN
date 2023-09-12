import responseHandler from '../../utils/responseHandler.js';
import catchErrors from '../../middleware/errors/catchError.js';
import userService from './userService.js';
import validate from './userReqValidate.js';
import { GeneralError } from '../../utils/errors.js';

// UserController handles user related HTTP request

class UserController {
  /**
   * sign up new user controller method
   * @route POST /signup
   * @access public
   */
  signUpUser = catchErrors(async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) throw new GeneralError(error.message);
    const data = await userService.signUpUser(req.body);
    const resDoc = responseHandler(201, 'user signup successfully', data);
    res.status(resDoc.statusCode).json(resDoc);
  });
}

export default new UserController();