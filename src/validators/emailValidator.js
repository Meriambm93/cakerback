const yup = require("yup")

const emailValidator = ({ required = true } = {}) => {
  const validator = yup.string().email()

  if (required) {
    return validator.required()
  }

  return validator
}

module.exports = emailValidator
