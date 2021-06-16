const {  DataTypes } = require('sequelize');
const {sequelize} = require('../config/db')
module.exports = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  id: {
    type: DataTypes.INET,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
  },
  email:{
    type: DataTypes.STRING,
    allowNull:true
  },
  desc:{
    type: DataTypes.STRING,
    allowNull:true
  },
  password:{
    type: DataTypes.STRING,
    allowNull:true
  },
  sex:{
    type: DataTypes.TINYINT,
    allowNull:true
  }
},{
    freezeTableName: true,
    tableName: 'user',
    createdAt:false,
    deletedAt:false,
    updatedAt:false
});

