import welcome from './welcome';
import { auth, authDefinition } from './auth';
import { profile, profileDefinition } from './profile';
const paths = {
  ...welcome,
  ...auth,
  ...profile,
};

const definitions = {
  ...authDefinition,
  ...profileDefinition,
};

const config = {
  swagger: '2.0',
  info: {
    title: 'Company Z API ',
    description: 'This is Company Z challenge',
    version: '1.0.0',
    contact: {
      name: 'ryan fab developer',
      email: 'royalfabrice1234@gmail.com',
      url: process.env.URL,
    },
    license: {
      name: 'Apache 3.0',
      url: 'http://www.apache.org/licenses/LICENSE-3.0.html',
    },
  },

  schemes: ['HTTP', 'HTTPS'],

  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },

  servers: [
    {
      url: process.env.URL,
      name: 'DEV',
    },
  ],

  paths,
  definitions,
};
export default config;
