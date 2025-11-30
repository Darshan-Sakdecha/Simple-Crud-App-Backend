import express from 'express'
import { deleteUser, getUserById, insertUser, loginUser, registerUser, updateUser, userGet } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', userGet);
userRouter.get('/:id', getUserById);
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/insertuser', insertUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export { userRouter };