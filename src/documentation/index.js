import welcome from "./welcome";
const paths = {
  ...welcome,

};

const definitions = {

};

const config = {
  swagger: "2.0",
  info: {
    title: "Church services API ",
    description: "This is team project,Dominators team",
    version: "1.0.0",
    contact: {
      name: "ryan fab developer",
      email: "royalfabrice1234@gmail.com",
      url: process.env.URL,
    },
    license: {
      name: "Apache 3.0",
      url: "http://www.apache.org/licenses/LICENSE-3.0.html",
    },
  },

  schemes: ["HTTP", "HTTPS"],

  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },

  servers: [
    {
      url: process.env.URL,
      name: "DEV",
    },
  ],

  paths,
  definitions,
};
export default config;
