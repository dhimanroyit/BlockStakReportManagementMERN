import { Router } from 'express';
import userController from '../../modules/user/userController.js';

const userRouter = Router();

userRouter.post('/signup', userController.signUpUser);
userRouter
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default userRouter;
