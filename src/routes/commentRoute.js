const Comment = require("../models/Comment")

const commentRoute = ({ app }) => {
  //comment
  //CREATE
  app.post("/comment", async (req, res) => {
    const {
      body: { message, score, user_id, shop_id },
    } = req

    const commentName = await Comment.query()
      .insertAndFetch({
        message,
        score,
        user_id,
        shop_id,
      })
      .withGraphFetched("user")
      .withGraphFetched("shop")
    res.send(commentName)
  })
  // READ INDEX
  app.get("/comment", async (req, res) => {
    const comments = await Comment.query()

    res.send(comments)
  })
  // READ SINGLE
  app.get("/comment/:commentId", async (req, res) => {
    const {
      params: { commentId },
    } = req
    const comment = await Comment.query().findById(commentId)

    if (!comment) {
      return res.status(404).send({ error: "Comment not found" })
    }

    res.send(comment)
  })
  // DELETE
  app.delete("/comment/:commentId", async (req, res) => {
    const {
      params: { commentId },
    } = req
    const comment = await Comment.query().findById(commentId)

    if (!comment) {
      return res.status(404).send({ error: "comment not found" })
    }

    await Comment.query().deleteById(commentId)

    res.send(comment)
  })
}

module.exports = commentRoute
