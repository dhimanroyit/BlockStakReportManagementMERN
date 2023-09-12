import { Router } from 'express';
import userController from '../../modules/user/userController.js';

const userRouter = Router();

userRouter.post('/signup', userController.signUpUser);
userRouter.get('/:id', userController.getUser);
userRouter.put('/:id', userController.updateUser);

export default userRouter;
