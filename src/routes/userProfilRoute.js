const user = require("../models/User")

const userProfilRoute = ({ app }) => {
  // GET one user profil
  app.get("/user/profil/:user_id", async (req, res) => {
    const {
      params: { user_id },
    } = req

    // je cherche dans la base de données les info de l'utilitsateur
    const userProfil = await user.query().findById(user_id)

    // je vérifie si l'utilisateur existe sinon j'envoie un msg d'erreur
    if (!userProfil) {
      return res.status(404).send({ error: "User profil not found." })
    }

    // Si l'utilisateur existe alors j'envoie toute la données de l'utilisateur
    // send = Envoyer
    res.send(userProfil)
  })

  // UPDATE user profil
  app.put("/user/profil/:user_id", async (req, res) => {
    const {
      params: { user_id },
      body: {
        firstName,
        lastName,
        email,
        passwordHash,
        passwordSalt,
        address,
        city,
        zipCode,
        profilePicture,
        role_id,
      },
    } = req

    const userProfilUpdated = await user.query().updateAndFetchById(user_id, {
      firstName,
      lastName,
      email,
      passwordHash,
      passwordSalt,
      address,
      city,
      zipCode,
      profilePicture,
      role_id,
    })

    if (!userProfilUpdated) {
      return res.status(404).send({ error: "User profil not found." })
    }

    res.send(userProfilUpdated)
  })

  // DELETE
  app.delete("/user/profil/:user_id", async (req, res) => {
    const {
      params: { user_id },
    } = req

    // je cherche dans la bdd l'id de l'utilisateur a supprimer
    const userProfil = await user.query().deleteById(user_id)

    // je vérifie si l'utilisateur existe sinon j'envoie un msg d'erreur
    if (!userProfil) {
      return res.status(404).send({ error: "User profil not found." })
    }

    // Si l'utilisateur existe alors j'envoie toute la données de l'utilisateur
    // send = Envoyer
    res.send("User deleted")
  })
}

module.exports = userProfilRoute
