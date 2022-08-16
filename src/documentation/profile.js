export const profile = {
  '/api/profile': {
    get: {
      tags: ['Profile'],
      summary: 'This will get a profile',
      description: ' ',
      produces: ['application/json'],
      security: [
        {
          Bearer: [],
        },
      ],
      responses: {
        200: {
          description: 'Profile found',
        },
        404: {
          description: 'Profile not found',
        },
      },
    },
    post: {
      tags: ['Profile'],
      summary: 'This will create a profile',
      description: ' ',
      produces: ['application/json'],
      consumes: ['multipart/form-data'],
      security: [
        {
          Bearer: [],
        },
      ],

      parameters: [
        {
          in: 'formData',
          name: 'firstName',
          description: 'First name of the user',
          required: true,
          type: 'string',
        },
        {
          in: 'formData',
          name: 'lastName',
          description: 'Last name of the user',
          required: true,
          type: 'string',
        },
        {
          in: 'formData',
          name: 'gender',
          description: 'Gender of the user',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'dateOfBirth',
          description: 'Date of birth of the user',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'martualStatus',
          description: 'Marital status of the user',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'nationality',
          description: 'Nationalit of user',
        },
        {
          in: 'formData',
          name: 'age',
          description: 'Age of the user',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'profilePhoto',
          description: 'Profile photo',
          type: 'file',
        },
      ],
      responses: {
        201: {
          description: 'Profile created successfully',
        },
        400: {
          description: 'Incorrect email or password',
        },
      },
    },
    delete: {
      tags: ['Profile'],
      summary: 'This will delete a profile',
      description: ' ',
      produces: ['application/json'],
      security: [
        {
          Bearer: [],
        },
      ],
      responses: {
        201: {
          description: 'Profile deleted successfully',
        },
        404: {
          description: 'Profile not found',
        },
      },
    },
  },
  '/api/profile/all': {
    get: {
      tags: ['Profile'],
      summary: 'This will get all profiles',
      description: ' ',
      produces: ['application/json'],
      security: [
        {
          Bearer: [],
        },
      ],
      responses: {
        200: {
          description: 'all profiles found',
        },
        404: {
          description: 'all profiles not found',
        },
      },
    },
  },
  '/api/profile/complete': {
    patch: {
      tags: ['Profile'],
      summary: 'This will update a profile',
      description: ' ',
      produces: ['application/json'],
      consumes: ['multipart/form-data'],
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          in: 'formData',
          name: 'nationalIdNumber',
          description: 'National id number of the user',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'passportNumber',
          description: 'Passport number of the user',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'documentPhoto',
          description: 'Document photo of the user',
          type: 'file',
        },
      ],
      responses: {
        200: {
          description: 'Profile updated successfully',
        },
        400: {
          description: 'Profile does not exist',
        },
      },
    },
  },
  '/api/profile/verify/account/{profileId}': {
    patch: {
      tags: ['Profile'],
      summary: 'This will verify a profile',
      description: ' ',
      produces: ['application/json'],
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'profileId',
          description: 'The profile id',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        200: {
          description: 'Profile verified successfully',
        },
        404: {
          description: 'Profile not found',
        },
      },
    },
  },
};
export const profileDefinition = {};
