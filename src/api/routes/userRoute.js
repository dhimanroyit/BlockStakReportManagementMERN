import { Router } from 'express';
import userController from '../../modules/user/userController.js';

const userRouter = Router();

userRouter.post('/signup', userController.signUpUser);

export default userRouter;
