const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
module.exports = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    msg: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "room",
    createdAt: false,
    deletedAt: false,
    updatedAt: false,
  }
);
