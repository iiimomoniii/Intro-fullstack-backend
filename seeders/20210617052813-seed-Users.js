'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  //add filed validate for each item in data object
  data.map(item=> {
    item.created_at = new Date()
    item.updated_at = new Date()
  })
  //insert data into sqlite
  await queryInterface.bulkInsert('Users', data, {});
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};


const data = [
  {
    "username" : "admin",
    "password" : "$2a$08$F.jp1q3EGj8QKq9yNVEHIeNiFZNRN5CQCyo09mXPQeGLyq7bwAEeq",
    "level" : "admin"
  }
]
