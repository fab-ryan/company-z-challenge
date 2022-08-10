import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./documentation";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.get("/api", (req, res) => {
  res.send({ message: "welcome to my server" });
});
app.use("/api", router);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    swaggerOptions: {
      docExpansion: "none",
      persistAuthorization: true,
    },
  })
);

export default app;
