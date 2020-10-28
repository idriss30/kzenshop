// importing dependencies 
const http = require('http');
const app = require('./app');
const sequelize = require('./util/database')
require('dotenv').config()



//creating the server
const server = http.createServer(app);

// connect to the database;
sequelize.sync({alter:true})
.then(()=>{
    server.listen(process.env.PORT)
    console.log('listening on ', process.env.PORT)
    
})
.catch(err => console.log(err))
