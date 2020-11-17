// importing dependencies 
const http = require('http');
const app = require('./app');
const Product = require('./models/product');
const sequelize = require('./util/database')
require('dotenv').config()
const Cart = require("./models/cart");
const CartItem = require('./models/cart-item');
const User = require('./models/user');
const Order = require('./models/orders')


//creating the server
const server = http.createServer(app);
//create the relations;
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Cart);
Cart.belongsTo(User)
Product.belongsToMany(Cart, {through:CartItem});
Cart.belongsToMany(Product, {through:CartItem});

// connect to the database;
sequelize.sync()
.then(()=>{
    server.listen(process.env.PORT)
    console.log('listening on ', process.env.PORT)
    
})
.catch(err => console.log(err))
