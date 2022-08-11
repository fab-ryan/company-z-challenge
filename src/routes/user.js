import express from "express";
import {
  registerUser,
  getOtpVerification,
  resendOtp 
} from "../controllers/authController";

const route = express.Router();
route.post("/register", registerUser);
route.patch("/verify", getOtpVerification);
route.patch("/resend/:userId", resendOtp);

export default route;
