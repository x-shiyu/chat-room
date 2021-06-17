const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
module.exports = sequelize.define(
  "Contacts",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    per1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    per2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "contacts",
    createdAt: false,
    deletedAt: false,
    updatedAt: false,
  }
);
