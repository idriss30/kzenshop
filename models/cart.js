// make all the imports
const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Cart = sequelize.define('cart', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement:true
    },
 
   
    createdAt:{
    type: Sequelize.DATE,
    allowNull:false
  },
  updatedAt: {
     allowNull: false,
     type: Sequelize.DATE
   }
     
 }, {
    freezeTableName: true
  })
 
 
 
 module.exports = Cart