const Sequelize = require('sequelize');
const sequelize = require('../util/database');


//defining models

const Product = sequelize.define('products', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },

    price:{
        type:Sequelize.INTEGER,
        allowNull:false, 

    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imageFront:{
        type:Sequelize.STRING,
        allowNull:false,

    },
    imageBack:{
        type:Sequelize.STRING,
        allowNull: false
    },
    imageOn: {
        type:Sequelize.STRING,
        allowNull:false
    },
    imageDisplay:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:true
    }

}, {
    freezeTableName: true,
    timestamps: false
})


module.exports = Product