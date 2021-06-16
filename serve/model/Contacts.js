const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db')
module.exports = sequelize.define('contacts', {
    id: {
        type: DataTypes.INET,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    per1: {
        type: DataTypes.INET,
        allowNull: true
    },
    per2: {
        type: DataTypes.INET,
        allowNull: true
    },
    accept:{
        type: DataTypes.TINYINT,
        allowNull: true
    },
    remark:{
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    freezeTableName: true,
    tableName: 'contacts',
    createdAt: false,
    deletedAt: false,
    updatedAt: false
});
