const { randomBytes, pbkdf2Sync } = require("crypto")

const config = require("./config")

const security = config.security.password

const hashPassword = (
  password,
  salt = randomBytes(security.saltLength).toString("hex"),
  iteration = security.iteration,
  length = security.hashLength,
  algo = security.algo,
) => ({
  salt,
  hash: pbkdf2Sync(password, salt, iteration, length, algo).toString("hex"),
})

module.exports = hashPassword
