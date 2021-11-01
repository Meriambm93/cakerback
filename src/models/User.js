const { Model } = require("objection")
const Role = require("./Role")

class User extends Model {
  static tableName = "user"
  static idColumn = "id"
  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: Role,
      join: {
        from: "user.role_id",
        to: "role.id",
      },
    },
  }
}

module.exports = User
