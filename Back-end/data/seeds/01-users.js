const bcrypt = require("bcryptjs");
const secrets = require("../../secrets.js");

exports.seed = function (knex) {
  return knex("users").insert([
    {
      id: 1,
      name: "Schroeder",
      email: "cats@uni.com",
      password: bcrypt.hashSync("superposition", secrets.hashRounds),
    },
    {
      id: 2,
      name: "Quirrel",
      email: "quirrel@hogwarts.edu",
      password: bcrypt.hashSync("starlight", secrets.hashRounds),
    },
    {
      id: 3,
      name: "Xvim",
      email: "xvim@cyoria.edu",
      password: bcrypt.hashSync("shaping", secrets.hashRounds),
    },
  ]);
};
