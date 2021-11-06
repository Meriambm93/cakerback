const validate = (validators) => async (req, res, next) => {
  const keys = Object.keys(validators)
  const errors = (
    await Promise.all(
      Object.entries(validators).map(([key, validator]) =>
        validator.isValid(req.body[key]),
      ),
    )
  )
    .map((isValid, index) =>
      !isValid ? `Field "${keys[index]}" is invalid` : null,
    )
    .filter((x) => x)

  if (errors.length) {
    return res.status(420).send({ error: errors })
  }

  next()
}

module.exports = validate
