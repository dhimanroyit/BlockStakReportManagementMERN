import responseHandler from '../../utils/responseHandler.js';
import catchErrors from '../../middleware/errors/catchError.js';
import userService from './userService.js';
import validate from './userReqValidate.js';
import { GeneralError } from '../../utils/errors.js';

// UserController handles user related HTTP request

class UserController {
  /**
   * sign up new user controller method
   * @route POST /users/signup
   * @access public
   */
  signUpUser = catchErrors(async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) throw new GeneralError(error.message);
    const data = await userService.signUpUser(req.body);
    const resDoc = responseHandler(201, 'user signup successfully', data);
    res.status(resDoc.statusCode).json(resDoc);
  });

  /**
   * create new user controller method
   * @route POST /users
   * @access private
   */
  createUser = catchErrors(async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) throw new GeneralError(error.message);
    const data = await userService.createUser(req.body);
    const resDoc = responseHandler(201, 'user create successfully', data);
    res.status(resDoc.statusCode).json(resDoc);
  });

  /**
   * get all user controller method
   * @route POST /users
   * @access private
   */
  getAllUser = catchErrors(async (req, res, next) => {
    const users = await userService.findAll({}, req.query);
    const resDoc = responseHandler(200, 'users get successfully', users);
    res.status(resDoc.statusCode).json(resDoc);
  });

  /**
   * get single user controller method
   * @route GET /users/:id
   * @access private
   */
  getUser = catchErrors(async (req, res, next) => {
    const { id } = req.params;
    const user = await userService.findById(id);
    const resDoc = responseHandler(200, 'user get successfully', user);
    res.status(resDoc.statusCode).json(resDoc);
  });

  /**
   * update user controller method
   * @route PUT /users/:id
   * @access private
   */
  updateUser = catchErrors(async (req, res, next) => {
    const {
      params: { id },
      body,
    } = req;
    const user = await userService.updateById(id, body);
    const resDoc = responseHandler(200, 'user update successfully', user);
    res.status(resDoc.statusCode).json(resDoc);
  });

  /**
   * delete user controller method
   * @route DELETE /users/:id
   * @access private
   */
  deleteUser = catchErrors(async (req, res, next) => {
    const { id } = req.params;
    await userService.deleteById(id);
    const resDoc = responseHandler(200, 'user delete successfully');
    res.status(resDoc.statusCode).json(resDoc);
  });
}

export default new UserController();
