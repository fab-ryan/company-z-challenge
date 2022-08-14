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
} from '../controllers/authController';
import { AuthMiddleware, RoleMiddleware } from '../middleware';

const route = express.Router();
route.post('/register', registerUser);
route.patch('/verify', getOtpVerification);
route.patch('/resend/:userId', resendOtp);
route.get('/', AuthMiddleware, RoleMiddleware, getAllUsers);
route.post('/login', loginUser);
route.post('/logout', AuthMiddleware, logoutUser);
route.post('/forgot', forgotPassword);
route.patch('/reset/:token', resetPassword);

export default route;
