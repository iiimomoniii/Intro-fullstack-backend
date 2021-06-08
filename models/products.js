'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
    underscored: true,
    underscoredAll: true,
    freezeTableName:true,
    createAt: "created_at",
    updateAt: "updated_at"
  });
  return Products;
};

//Command for generate product.js
//sequelize model:generate --name Products --attributes "name:string, image:string, stock:integer, price:integer" --underscored true

//--underscored true for create column example "created_at"

//freezeTableName use fixed Tablename when create table example "Products"