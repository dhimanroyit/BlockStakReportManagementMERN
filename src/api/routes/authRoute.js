import { Router } from 'express';
import authController from '../../modules/auth/authController.js';

const authRouter = Router();

authRouter.post('/signin', authController.signIn);
authRouter.get('/refresh');
authRouter.post('/logout');

export default authRouter;
