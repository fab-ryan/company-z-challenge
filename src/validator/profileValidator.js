import joi from 'joi';

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const ProfileValidator = (data) => {
  const Schema = joi.object({
    firstName: joi.string().min(3).max(250).required().messages({
      'string.base': '{#label} should be a string',
      'string.min': '{#label} should be at least {#min} characters',
      'string.max': '{#label} should be at most {#max} characters',
      'any.required': '{#label} is required',
    }),
    lastName: joi.string().min(3).max(250).required().messages({
      'string.base': '{#label} should be a string',
      'string.min': '{#label} should be at least {#min} characters',
      'string.max': '{#label} should be at most {#max} characters',
      'any.required': '{#label} is required',
    }),
    gender: joi
      .string()
      .required()
      .messages({ 'any.only': '{#label} is required' }),
    dateOfBirth: joi
      .date()
      .required()
      .messages({ 'any.only': '{#label} is required' }),
    martualStatus: joi
      .string()
      .required()
      .messages({ 'any.only': '{#label} is required' }),
    nationality: joi
      .string()
      .required()
      .messages({ 'any.only': '{#label} is required' }),
    age: joi
      .number()
      .required()
      .messages({ 'any.only': '{#label} is required' }),
  });
  return Schema.validate(data, options);
};
const verificationValidator = (data) => {
  const Schema = joi.object({
    nationalIdNumber: joi
      .string()
      .regex(/^[0-9]{16}$/)
      .messages({
        'string.pattern.base': `national Id  must have 16 digits.`,
      })
      .required()
      .optional(),
    passportNumber: joi
      .string()
      .regex(/^[0-9]{12}$/)
      .messages({
        'string.pattern.base': `password Id  must have 12 digits.`,
      })
      .required()
      .optional(),
    documentPhoto: joi
      .string()
      .required()
      .messages({ 'any.only': '{#label} is required' })
      .optional(),
  });
  return Schema.validate(data, options);
};
export { ProfileValidator, verificationValidator };
