exports.up = async (knex) => {
  await knex.schema.alterTable("product", (table) => {
    table.dropColumns("mainPicture", "secondaryPicture")
    table.integer("imageCount").notNullable().defaultTo(0)
  })
}

exports.down = async (knex) => {
  await knex.schema.alterTable("product", (table) => {
    table.string("mainPicture", 120).notNullable()
    table.string("secondaryPicture", 120).nullable()
    table.dropColumns("imageCount")
  })
}
