import express from "express";
import userRouter from "./user";
import profileRouter from "./profile";
const routes = express.Router();

routes.use("/user", userRouter);
routes.use("/profile", profileRouter);

export default routes;
