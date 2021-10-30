const Role = require("../models/Role")

const roleRoute = ({ app }) => {
  //role
  //CREATE
  app.post("/role", async (req, res) => {
    const {
      body: { role },
    } = req

    const roleName = await Role.query().insertAndFetch({
      role,
    })

    res.send(roleName)
  })
  // READ INDEX
  app.get("/role", async (req, res) => {
    const roles = await Roles.query()

    res.send(roles)
  })
  // READ SINGLE
  app.get("/role/:roleId", async (req, res) => {
    const {
      params: { roleId },
    } = req
    const role = await Role.query().findById(roleId)

    if (!role) {
      return res.status(404).send({ error: "Role not found" })
    }

    res.send(role)
  })
  // UPDATE
  app.put("/role/:roleId", async (req, res) => {
    const {
      params: { roleId },
      body: { role },
    } = req

    const roleName = await Role.query().updateAndFetchById(roleId, {
      role,
    })

    res.send(roleName)
  })
  // DELETE
  app.delete("/role/:roleId", async (req, res) => {
    const {
      params: { roleId },
    } = req
    const role = await Role.query().findById(roleId)

    if (!role) {
      return res.status(404).send({ error: "role not found" })
    }

    await Role.query().deleteById(roleId)

    res.send(role)
  })
}

module.exports = roleRoute
