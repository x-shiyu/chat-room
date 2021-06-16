const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db')
module.exports = sequelize.define('room', {
    id: {
        type: DataTypes.INET,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    msg: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    freezeTableName: true,
    tableName: 'room',
    createdAt: false,
    deletedAt: false,
    updatedAt: false
});

