'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Companies.init({
    formal_name: DataTypes.STRING,
    total_employees: DataTypes.INTEGER,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Companies',
    underscored: true,
  });
  return Companies;
};