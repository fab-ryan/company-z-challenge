import redisClient from '../utils/redis';
import model from '../database/models';
import jwt from 'jsonwebtoken';

const User = model.User;
export const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Please login first or check the token you are sending.',
      });
    }
    const foundToken = await redisClient.get(token);
    if (!foundToken) {
      return res
        .status(401)
        .json({ message: 'You are not allowed. Check Your token' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: {
        userId: decoded.userId,
      },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'User not found in the database ' });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Not authorized. No token provided' });
  }
};
export const RoleMiddleware = async (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }
  return res.status(401).json({
    message: 'You are not authorized to access this task',
  });
};
