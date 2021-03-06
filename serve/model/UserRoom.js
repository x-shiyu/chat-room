const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
module.exports = sequelize.define(
  "UserRoom",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "user_room",
    createdAt: false,
    deletedAt: false,
    updatedAt: false,
  }
);
