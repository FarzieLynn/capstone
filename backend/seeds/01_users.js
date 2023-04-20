/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


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

  const adminUser2 = {
    username: "admin2",
    password: bcrypt.hashSync("admin", 12),
    email: "admin2@milanon.com",
    branch: "USSF",
    full_name: "Admin McAdminson",
    age_group: "17-21",
    gender: "Male",
  };

  const user1 = {
    username: "user1",
    password: bcrypt.hashSync("password", 12),
    email: "user1@milanon.com",
    branch: "USSF",
    full_name: "User McUser",
    age_group: "17-21",
    gender: "Female",
    is_professional: false,
    is_verified: false,
    is_anonymous: false,
    anon_username: 'user12345678'
  }
  const user2 = {
    username: "user2",
    password: bcrypt.hashSync("password", 12),
    email: "user2@milanon.com",
    branch: "USSF",
    full_name: "User McUser2",
    age_group: "17-21",
    gender: "Male",
    is_professional: false,
    is_verified: false,
    is_anonymous: false,
    anon_username: 'user87654321'
  }
  const chaplain = {
    username: "chaplain",
    password: bcrypt.hashSync("password", 12),
    email: "chaplain@milanon.com",
    branch: "USSF",
    full_name: "Father Chaplain",
    age_group: "17-21",
    gender: "Male",
    education_level: "Doctor of Divinity",
    phone_number: "555-555-5555",
    about_you: "I am a chaplain and I love to help people get through their struggles.",
    is_professional: true,
    is_verified: false,
    is_anonymous: false,
    anon_username: 'user123'
  }
  const fitness = {
    username: "fitness",
    password: bcrypt.hashSync("password", 12),
    email: "fitness@milanon.com",
    branch: "USSF",
    full_name: "Fit Woman",
    age_group: "17-21",
    gender: "Female",
    education_level: "Masters of Physical Fitness",
    phone_number: "555-555-5555",
    about_you: "I am a fitness professional and I love to help people get fit and stay fit.",
    is_professional: true,
    is_verified: false,
    is_anonymous: false,
    anon_username: 'user1234'
  }

  const finance = {
    username: "finance",
    password: bcrypt.hashSync("password", 12),
    email: "finance@milanon.com",
    branch: "USSF",
    full_name: "Finance Wizard",
    age_group: "17-21",
    gender: "Male",
    education_level: "Masters of Financial Planning",
    phone_number: "555-555-5555",
    about_you: "I am a financial professional and I love to help people get their finances in order.",
    is_professional: true,
    is_verified: false,
    is_anonymous: false,
    anon_username: 'user12345'
  }
  await knex("users").insert(adminUser);
  await knex("users").insert(adminUser2);
  await knex("users").insert(user1);
  await knex("users").insert(user2);
  await knex("users").insert(chaplain);
  await knex("users").insert(fitness);
  await knex("users").insert(finance);


  const genFakerData = async () => {
    const { faker } = require("@faker-js/faker");
    for (let i = 7; i < usersToCreate; i++) {
      let user = {
        username: faker.internet.userName().toLowerCase(),
        password: bcrypt.hashSync("password", 12),
        email: faker.internet.email(),
        branch: "USSF",
        full_name: faker.name.fullName(),
        age_group: "17-21",
        gender: faker.name.sex(),
      };
      fakeUserArray.push(user);
    }
    await knex("users").insert(fakeUserArray);
  }

  if(process.env.NODE_ENV === 'development') await genFakerData();
};
