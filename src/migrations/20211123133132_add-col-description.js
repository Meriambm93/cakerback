exports.up = async (knex) => {
  await knex.schema.alterTable("product", (table) => {
    table.text("description").nullable()
  })
}

exports.down = async (knex) => {
  await knex.schema.alterTable("product", (table) => {
    table.dropColumns("description")
  })
}
