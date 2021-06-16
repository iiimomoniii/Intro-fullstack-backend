'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        field: "first_name"
      },
      last_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        field: "last_name"
      },
      address: {
        type: Sequelize.STRING(250),
        field: "address"
      },
      email: {
        type: Sequelize.STRING(50),
        field: "email"
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        field: "phone"
      },
      Image: {
        type: Sequelize.STRING(20),
        field: "image"
      },
      salary: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        field: "salary"
      },
      created_At: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_At"
      },
      updated_At: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_At"
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Employees');
  }
};

