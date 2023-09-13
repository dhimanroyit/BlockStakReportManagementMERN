import { Router } from 'express';
import userController from '../../modules/user/userController.js';
import jwtAuth from '../../middleware/jwtAuth.js';
import checkRole from '../../middleware/checkRole.js';

const userRouter = Router();

userRouter.post('/signup', userController.signUpUser);
userRouter.use(jwtAuth);
userRouter.post('/', checkRole(['admin']), userController.createUser);
userRouter.get('/', checkRole(['admin', 'regular']), userController.getAllUser);
userRouter
  .route('/:id')
  .get(checkRole(['admin', 'regular']), userController.getUser)
  .put(checkRole(['admin']), userController.updateUser)
  .delete(checkRole(['admin']), userController.deleteUser);

export default userRouter;
