import { Router } from 'express';
import userRouter from './userRoute.js';

const router = Router();

router.use('/users', userRouter);

router.get('/', (req, res, next) => {
  res.send('welcome');
});

export default router;
