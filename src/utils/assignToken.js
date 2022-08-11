import config from "../config/config";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = config[process.env.NODE_ENV];

export const assignToken = (info) => {
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(info, JWT_SECRET, options);
};
