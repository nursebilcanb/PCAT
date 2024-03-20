// Örnek bir dosya (örneğin, db.js)
const { Sequelize, DataTypes, where } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

// Model tanımlama
const Photo = sequelize.define('Photo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image:{
    type: DataTypes.STRING
  },
  qty: {
    type: DataTypes.INTEGER,
  }
});
module.exports= Photo;