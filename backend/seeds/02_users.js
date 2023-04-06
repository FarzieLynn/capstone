/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require("@faker-js/faker");

let fakeUserArray = [];
let usersToCreate = 200;

for (let i = 0; i < usersToCreate; i++) {
  let user = {
    id:i+1,
    username: faker.internet.userName(),
    password: faker.internet.password(15),
    email: faker.internet.email(),
    branch: "USSF",
    full_name: faker.name.fullName(),
    age_group: 2,
    gender: faker.name.sex(),
  };
  fakeUserArray.push(user);
}

exports.seed = async function (knex) {
  await knex("users").insert(fakeUserArray);
};
