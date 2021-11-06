const yup = require("yup")

const config = require("../config")

const security = config.security.password

const passwordValidator = ({ required = true } = {}) => {
  const validator = yup
    .string()
    .min(security.minLength)
    .matches(security.pattern)

  if (required) {
    return validator.required()
  }

  return validator
}

module.exports = passwordValidator
