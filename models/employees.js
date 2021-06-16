'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Employees.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    Image: DataTypes.STRING,
    salary: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Employees',
    underscoredAll : true,
    underscored: true,
    freezeTableName: true,
    createAt: "created_At",
    updateAt: "updated_At"
  });
  return Employees;
};