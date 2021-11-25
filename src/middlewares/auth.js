const auth = async (req, res, next) => {
  const { sessionId } = req.cookies
  const userId = await redis.get(`sessionId:${sessionId}`)

  if (!userId) {
    return res.status(401).send("FORBIDDEN")
  }

  req.userId = userId

  next()
}
module.exports = auth
