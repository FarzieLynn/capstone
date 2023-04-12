/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  let fakeUserArray = [];
  let usersToCreate = 20;

  const adminUser = {
    username: "admin",
    password: bcrypt.hashSync("admin", 12),
    email: "admin@milanon.com",
    branch: "USSF",
    full_name: "Admin McAdminson",
    age_group: "17-21",
    gender: "Male",
  };

  for (let i = 1; i < usersToCreate; i++) {
    let user = {
      username: faker.internet.userName(),
      password: bcrypt.hashSync("password", 12),
      email: faker.internet.email(),
      branch: "USSF",
      full_name: faker.name.fullName(),
      age_group: "17-21",
      gender: faker.name.sex(),
    };
    fakeUserArray.push(user);
  }

  await knex("users").insert(adminUser);
  await knex("users").insert(fakeUserArray);
};
