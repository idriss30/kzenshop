//importing everything needed
const Sequelize = require('sequelize');
const sequelize = require('../util/database')



//creating user model
const User = sequelize.define('users', {
   id:{
       type : Sequelize.INTEGER,
       allowNull: false,
       primaryKey: true,
       autoIncrement:true
   }, 
   firstName:{
       type:Sequelize.STRING,
       allowNull:false
   },

   lastName:{
       type:Sequelize.STRING,
       allowNull: false

   },

   email:{
       type:Sequelize.STRING,
       allowNull:false
   },
   password:{
       type:Sequelize.STRING,
       allowNull:false
   },

   username:{
       type:Sequelize.STRING,
       allowNull:false,
       unique:true

   },

   address:{
       type:Sequelize.STRING,
       allowNull :false
   },

   city:{
       type:Sequelize.STRING,
       allowNull:false
   },
   state:{
       type:Sequelize.STRING,
       allowNull:false
   },

   zipCode:{
       type:Sequelize.INTEGER,
       allowNull:false
   }
   

})





///exporting user model
module.exports = User;