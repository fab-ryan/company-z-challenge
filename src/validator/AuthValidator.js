import joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const UserValidator = (data) => {
  const joiPassword = joi.extend(joiPasswordExtendCore);
  const Schema = joi.object({
    email: joi.string().email().required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(2)
      .minOfUppercase(1)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .messages({
        "password.minOfUppercase":
          "{#label} should contain at least {#min} uppercase character",
        "password.minOfSpecialCharacters":
          "{#label} should contain at least {#min} special character",
        "password.minOfLowercase":
          "{#label} should contain at least {#min} lowercase character",
        "password.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "password.noWhiteSpaces": "{#label} should not contain white spaces",
      })
      .required(),
    confirmPassword: joi.ref("password"),
  });
  return Schema.validate(data);
};

export { UserValidator };
