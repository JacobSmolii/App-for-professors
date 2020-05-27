exports.up = function (knex) {
  return knex.schema.createTable("messages", (tbl) => {
    tbl.increments();
    tbl.string("title", 128).notNullable();
    tbl.string("body", 8192).notNullable();
    tbl
      .integer("professor_id")
      .unsigned()
      .notNullable()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("student_id")
      .unsigned()
      .references("students.id")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
    tbl.datetime("time_to_send").notNullable();
    tbl.boolean("sent").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages");
};
