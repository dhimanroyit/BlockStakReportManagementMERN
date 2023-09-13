import { Router } from 'express';
import userRouter from './userRoute.js';
import authRouter from './authRoute.js';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

router.get('/', (req, res, next) => {
  res.send('welcome');
});

export default router;
