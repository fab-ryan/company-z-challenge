import app from "./index";
import config from "./config/config";
const currentConfig = config[process.env.NODE_ENV];

const { port } = currentConfig;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
