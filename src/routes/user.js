import express from 'express';
import {
  registerUser,
  getOtpVerification,
  resendOtp,
  getAllUsers,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getSingleUser,
  changePassword,
} from '../controllers/authController';
import { AuthMiddleware, RoleMiddleware } from '../middleware';

const route = express.Router();
route.post('/register', registerUser);
route.post('/login', loginUser);
route.patch('/verify', getOtpVerification);
route.patch('/resend/:userId', resendOtp);
route.get('/all', AuthMiddleware, RoleMiddleware, getAllUsers);
route.get('/', AuthMiddleware, getSingleUser);
route.delete('/logout', AuthMiddleware, logoutUser);
route.post('/forgot', forgotPassword);
route.patch('/reset/:token', resetPassword);
route.patch('/change', AuthMiddleware, changePassword);

export default route;
