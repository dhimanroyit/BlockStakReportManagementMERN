import { Router } from 'express';
import authController from '../../modules/auth/authController.js';

const authRouter = Router();

authRouter.post('/signin', authController.signIn);
authRouter.get('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);

export default authRouter;
