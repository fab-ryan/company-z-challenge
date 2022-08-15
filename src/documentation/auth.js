export const auth = {
  '/api/user/register': {
    post: {
      tags: ['Authentication'],
      summary: 'This will register a user',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/Register',
          },
        },
      ],
      responses: {
        201: {
          description: 'User registered successfully',
        },
        400: {
          description: 'Email already exists!',
        },
        401: {
          description: 'Incorrect email or password',
        },
      },
    },
  },
  '/api/user/login': {
    post: {
      tags: ['Authentication'],
      summary: 'This will login a user',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/Login',
          },
        },
      ],
      responses: {
        201: {
          description: 'User logged in successfully',
        },
        400: {
          description: 'Incorrect email or password',
        },
      },
    },
  },
  '/api/user/verify': {
    patch: {
      tags: ['Authentication'],
      summary: 'This will verify a user',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/Verify',
          },
        },
      ],
      responses: {
        201: {
          description: 'User verified successfully',
        },
        400: {
          description: 'Incorrect email or password',
        },
      },
    },
  },
  '/api/user/resend/{userId}': {
    patch: {
      tags: ['Authentication'],
      summary: 'This will resend a user',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          description: 'user Id',
          required: true,
          type: 'string',
        },
      ],

      responses: {
        201: {
          description: 'User verified successfully',
        },
        400: {
          description: 'Incorrect email or password',
        },
      },
    },
  },
  '/api/user': {
    get: {
      tags: ['Authentication'],
      summary: 'This will get a user',
      description: ' ',
      produces: ['application/json'],
      security: [
        {
          Bearer: [],
        },
      ],
      responses: {
        200: {
          description: 'User found',
        },
        404: {
          description: 'User not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/api/user/all': {
    get: {
      tags: ['Authentication'],
      summary: 'This will get all users',
      description: ' ',
      produces: ['application/json'],
      security: [
        {
          Bearer: [],
        },
      ],
      responses: {
        200: {
          description: 'all users found',
        },
        404: {
          description: 'all users not found',
        },
      },
    },
  },
  '/api/user/logout': {
    delete: {
      tags: ['Authentication'],
      summary: 'This will logout a user',
      description: ' ',
      produces: ['application/json'],
      security: [
        {
          Bearer: [],
        },
      ],
      responses: {
        201: {
          description: 'User logged out successfully',
        },
        400: {
          description: 'Incorrect email or password',
        },
      },
    },
  },
  '/api/user/forgot': {
    post: {
      tags: ['Authentication'],
      summary: 'This will send a reset password link to a user',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/Forgot',
          },
        },
      ],
      responses: {
        201: {
          description: 'Reset password link sent successfully',
        },
        400: {
          description: 'Incorrect email or password',
        },
      },
    },
  },
  '/api/user/reset/{token}': {
    patch: {
      tags: ['Authentication'],
      summary: 'This will reset a user password',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'token',
          in: 'path',
          description: 'token',
          required: true,
          type: 'string',
        },
        {
          name: 'Body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/Reset',
          },
        },
      ],
      responses: {
        201: {
          description: 'Password reset successfully',
        },
        400: {
          description: 'Incorrect email or password',
        },
      },
    },
  },
  '/api/user/change': {
    patch: {
      tags: ['Authentication'],
      summary: 'This will change a user password',
      description: ' ',
      produces: ['application/json'],
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          name: 'Body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/Change',
          },
        },
      ],
      responses: {
        201: {
          description: 'Password changed successfully',
        },
        400: {
          description: 'Incorrect email or password',
        },
      },
    },
  },
};
export const authDefinition = {
  Register: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Email of the user',
      },
      password: {
        type: 'string',
        format: 'password',
        description: 'Password of the user',
      },
      confirmPassword: {
        type: 'string',
        format: 'password',
        description: 'Confirm password of the user',
      },
    },
  },
  Login: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Email of the user',
      },
      password: {
        type: 'string',
        format: 'password',
        description: 'Password of the user',
      },
    },
  },
  Verify: {
    type: 'object',
    properties: {
      otp: {
        type: 'string',
        format: 'otp',
        description: 'OTP of the user',
      },
    },
  },
  Forgot: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Email of the user',
      },
    },
  },
  Reset: {
    type: 'object',
    properties: {
      password: {
        type: 'string',
        format: 'password',
        description: 'Password of the user',
      },
      confirmPassword: {
        type: 'string',
        format: 'password',
        description: 'Confirm password of the user',
      },
    },
  },
  Change: {
    type: 'object',
    properties: {
      currentPassword: {
        type: 'string',
        format: 'password',
        description: 'Current password of the user',
      },
      newPassword: {
        type: 'string',
        format: 'password',
        description: 'Password of the user',
      },
      newConfirmPassword: {
        type: 'string',
        format: 'password',
        description: 'Confirm password of the user',
      },
    },
  },
};
