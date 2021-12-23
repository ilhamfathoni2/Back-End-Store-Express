"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      barang.belongsTo(models.user, {
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  barang.init(
    {
      idUser: DataTypes.INTEGER,
      image: DataTypes.STRING,
      name: DataTypes.STRING,
      priceBuy: DataTypes.INTEGER,
      priceSell: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "barang",
    }
  );
  return barang;
};
