import model from "../database/models";
import { UserValidator } from "../validator";
import bcrypt from "bcryptjs";
import {
  AddMinutesToDate,
  generateOTP,
  generateDate,
  signUpMessage,
  sendSignUpOtp,
  verifyDate,
  assignToken,
} from "../utils";
const User = model.User;
const registerUser = async (req, res) => {
  const { error } = UserValidator(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const userFound = await User.findOne({ where: { email: req.body.email } });
  if (userFound) {
    return res.status(400).json({ error: "User already exists" });
  } else {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const user = await new User({
        email: req.body.email,
        password: hash,
      });
      await user.save();
      user.password = undefined;
      const otp = generateOTP();
      const expiration_time = AddMinutesToDate(generateDate(), 4);
      await user.update({ otp, expiration_time });
      const message = signUpMessage(otp);
      sendSignUpOtp(message, user.email);
      res.status(201).json({
        message: "User created successfully",
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
    const user = await User.findOne({ where: { otp } });
    if (user) {
      const currentDate = generateDate();
      if (verifyDate.compare(user.expiration_time, currentDate) === 1) {
        if (user.otp === otp) {
          await user.update({ otp: null, expiration_time: null });
          const payload = {
            userId: user.userId,
            email: user.email,
          };
          const token = assignToken(payload);
          res.status(200).json({
            message: "OTP verified successfully",
            token,
          });
        } else {
          console.log(user.otp);
          res.status(400).json({
            message: "OTP does not match",
          });
        }
      } else {
        await user.update({ otp: null, expiration_time: null });
        res.status(400).json({ error: "OTP expired" });
      }
    } else {
      res.status(400).json({ error: "OTP does not exists" });
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
      const expiration_time = AddMinutesToDate(generateDate(), 4);
      await user.update({ otp, expiration_time });
      const message = signUpMessage(otp);
      sendSignUpOtp(message, user.email);
      res.status(200).json({
        message: "OTP sent successfully",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAndCountAll();
    res.status(200).json({
      message: "All users",
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
      message: "User found",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (user) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      await User.update({ password: hash }, { where: { id: req.params.id } });
      res.status(200).json({
        message: "Password reset successfully",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      await User.update({ password: hash }, { where: { id: user.id } });
      res.status(200).json({
        message: "Password reset successfully",
      });
    } else {
      res.status(404).json({
        message: "User not found",
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
          message: "Password changed successfully",
        });
      } else {
        res.status(400).json({
          message: "Password does not match",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const loginUser=async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (passwordMatch) {
        const payload = {
          userId: user.userId,
          email: user.email,
        };
        const token = assignToken(payload);
        res.status(200).json({
          message: "User logged in successfully",
          token,
        });
      } else {
        res.status(400).json({
          message: "Password does not match",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
}
export { registerUser, getAllUsers, getUser, getOtpVerification, resendOtp };
