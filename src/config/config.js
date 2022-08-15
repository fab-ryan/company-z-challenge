import dotenv from "dotenv";
dotenv.config();
module.exports = {
  development: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    port: process.env.PORT,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PWD: process.env.REDIS_PWD,
    FRONTEND_URL: process.env.FRONTEND_URL,
    
  },
  production: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    port: process.env.PORT,
    logging: false,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PWD: process.env.REDIS_PWD,
    FRONTEND_URL: process.env.FRONTEND_URL,
  },
};
