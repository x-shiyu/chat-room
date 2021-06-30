const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
module.exports = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    from_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    from_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: new Date(),
    },
    deleted_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "message",
    updatedAt: false,
    createdAt: false,
    deletedAt: false,
  }
);
