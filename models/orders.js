const sequelize = require('../util/database');
const Sequelize = require('sequelize')


const Order = sequelize.define('Order', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement:true
    },
    
    email:{
        type:Sequelize.STRING,
        allowNull: false,

    },
    fullName: {
        type:Sequelize.STRING,
        allowNull:false
    },
    address:{
        type:Sequelize.STRING,
        allowNull : false
    },
    city:{
        type:Sequelize.STRING,
        allowNull : false
    },
    state:{
      type:Sequelize.STRING,
      allowNull : false

    },

    zipCode:{
        type:Sequelize.STRING,
        allowNull : false

    },

    total:{
       type:Sequelize.STRING,
       allowNull :false
    },
    
    products:{
        type:Sequelize.STRING,
        allowNull:false
    }
    


})


module.exports = Order