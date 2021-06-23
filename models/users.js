'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    underscored: true,
    underscoredAll: true,
    freezeTableName:true,
    createAt: "created_at",
    updateAt: "updated_at"
  });
  return Users;
};