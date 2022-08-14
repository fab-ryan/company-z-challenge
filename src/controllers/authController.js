import model from '../database/models';
import { UserValidator, LoginValidator } from '../validator';
import bcrypt from 'bcryptjs';
import {
  AddMinutesToDate,
  generateOTP,
  generateDate,
  signUpMessage,
  sendSignUpOtp,
  verifyDate,
  assignToken,
  sendForgotPasswordMessage,
  sendForgotPasswordOtp,
} from '../utils';
import redisClient from '../utils/redis';
import jwt from "jsonwebtoken"

const User = model.User;
const registerUser = async (req, res) => {
  const { error } = UserValidator(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const userFound = await User.findOne({ where: { email: req.body.email } });
  if (userFound) {
    return res.status(400).json({ error: 'User already exists' });
  } else {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const user = await new User({
        email: req.body.email,
        password: hash,
        role: req.body.role,
      });
      await user.save();
      user.password = undefined;
      const otp = generateOTP();
      const otpExpiry = AddMinutesToDate(generateDate(), 4);
      await user.update({ otp, otpExpiry });
      const message = signUpMessage(otp);
      sendSignUpOtp(message, user.email);
      res.status(201).json({
        message: 'User created successfully',
        user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
const getOtpVerification = async (req, res) => {
  try {
    const otp = req.body.otp;
    const user = await User.findOne({
      where: { otp },
      include: [{ model: model.Profile, as: 'profile' }],
    });
    if (user) {
      const currentDate = generateDate();
      if (verifyDate.compare(user.otpExpiry, currentDate) === 1) {
        if (user.otp === otp) {
          await user.update({ otp: null, otpExpiry: null });
          const payload = {
            userId: user.userId,
            email: user.email,
            profile: user.profile,
            role: user.role,
          };
          const token = assignToken(payload);
          await redisClient.set(token, token);
          res.status(200).json({
            message: 'OTP verified successfully',
            token,
          });
        } else {
          res.status(400).json({
            message: 'OTP does not match',
          });
        }
      } else {
        await user.update({ otp: null, otpExpiry: null });
        res.status(400).json({ error: 'OTP expired' });
      }
    } else {
      res.status(400).json({ error: 'OTP does not exists' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resendOtp = async (req, res) => {
  try {
    const user = await User.findOne({ where: { userId: req.params.userId } });

    if (user) {
      const otp = generateOTP();
      const otpExpiry = AddMinutesToDate(generateDate(), 4);
      await user.update({ otp, otpExpiry });
      const message = signUpMessage(otp);
      sendSignUpOtp(message, user.email);
      res.status(200).json({
        message: 'OTP sent successfully',
      });
    } else {
      res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    console.log(req);
    const users = await User.findAndCountAll({
      include: [
        {
          model: model.Profile,
          as: 'profile',
        },
      ],
    });
    res.status(200).json({
      message: 'All users',
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    res.status(200).json({
      message: 'User found',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenVerify = await jwt.verify(token, process.env.JWT_SECRET);
    if (tokenVerify) {
      const user = await User.findOne({
        where: { userId: tokenVerify.userId },
      });
      if (user) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        await user.update({ password: hash });
        res.status(200).json({
          message: 'Password reset successfully',
        });
      } else {
        res.status(404).json({
          message: 'User not found',
        });
      }
    } else {
      res.status(400).json({
        message: 'Invalid token',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      const token = assignToken({ userId: user.userId }, '3m');
      await redisClient.set(token, token);
      const FRONTEND_URL = process.env.FRONTEND_URL;
      const message = sendForgotPasswordMessage(`${FRONTEND_URL}/?${token}`);
      sendForgotPasswordOtp(message, user.email);
      res.status(200).json({
        message: 'email sent successfully',
        token,
      });
    } else {
      res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const changePassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (user) {
      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (passwordMatch) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.newPassword, salt);

        await User.update({ password: hash }, { where: { id: req.params.id } });
        res.status(200).json({
          message: 'Password changed successfully',
        });
      } else {
        res.status(400).json({
          message: 'Password does not match',
        });
      }
    } else {
      res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { error } = LoginValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await User.findOne({
      where: { email: req.body.email },
      include: [{ model: model.Profile, as: 'profile' }],
    });
    if (user) {
      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (passwordMatch) {
        const payload = {
          userId: user.userId,
          email: user.email,
          profile: user.profile,
        };
        user.password = undefined;
        const token = assignToken(payload);
        await redisClient.set(token, token);
        res.status(200).json({
          message: 'User logged in successfully',
          token,
          user,
        });
      } else {
        res.status(400).json({
          message: 'Password does not match',
        });
      }
    } else {
      res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await redisClient.del(token);
    res.status(200).json({
      message: 'User logged out successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  registerUser,
  getAllUsers,
  getUser,
  getOtpVerification,
  resendOtp,
  loginUser,
  logoutUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
