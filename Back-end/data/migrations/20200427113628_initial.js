exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.string("email", 128).notNullable();
      tbl.string("password", 255).notNullable();

      tbl.unique(["email"]);
    })
    .createTable("students", (tbl) => {
      tbl.increments();
      tbl
        .integer("professor_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.string("name", 128).notNullable();
      tbl.string("email", 128).notNullable();
    })
    .createTable("projects", (tbl) => {
      tbl.increments();
      tbl
        .integer("student_id")
        .unsigned()
        .notNullable()
        .references("students.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.string("name", 128).notNullable();
      tbl.string("description", 8192).notNullable();
      tbl.datetime("due_date");
      tbl.boolean("completed");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("projects")
    .dropTableIfExists("students")
    .dropTableIfExists("users");
};
