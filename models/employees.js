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
    image: DataTypes.STRING,
    salary: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Employees',
    underscored: true,
    underscoredAll: true,
    freezeTableName:true,
    createAt: "created_at",
    updateAt: "updated_at"
  });
  return Employees;
};