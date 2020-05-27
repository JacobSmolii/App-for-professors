exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("students").insert([
    // Professor Schroeder's students
    { id: 1, professor_id: 1, name: "Trevor", email: "trevor@gmail.com" },
    { id: 2, professor_id: 1, name: "Bob", email: "bob@gmail.com" },

    // Professor Quirrel's students
    { id: 3, professor_id: 2, name: "Harry", email: "harry@hogwarts.edu" },
    {
      id: 4,
      professor_id: 2,
      name: "Hermoine",
      email: "hermoine@hogwarts.edu",
    },
    { id: 5, professor_id: 2, name: "Draco", email: "draco@hogwarts.edu" },

    // Professor Xvim's students
    { id: 6, professor_id: 3, name: "Zorian", email: "zorian@cyoria.edu" },
    { id: 7, professor_id: 3, name: "Zach", email: "zach@cyoria.edu" },
  ]);
};
