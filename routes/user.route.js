import express from 'express'
import { deleteUser, getUserById, insertUser, updateUser, userGet } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', userGet);
userRouter.get('/:id', getUserById);
userRouter.post('/insertuser', insertUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export { userRouter };