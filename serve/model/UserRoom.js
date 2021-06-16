const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db')
module.exports = sequelize.define('user_room', {
    id: {
        type: DataTypes.INET,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INET,
        allowNull: true
    },
    room_id: {
        type: DataTypes.INET,
        allowNull: true
    },
}, {
    freezeTableName: true,
    tableName: 'user_room',
    createdAt: false,
    deletedAt: false,
    updatedAt: false
});
