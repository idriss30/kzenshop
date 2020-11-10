// import all the dependencies 
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const path = require('path');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart')


//initializing express
const app = express();

//setting views to ejs
app.set('view engine', 'ejs');
app.set('views', 'views')

//using body parser to extract data from body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
//serving static files
app.use(express.static(path.join(__dirname, 'public')))
//using cookie parser to manage cookie

app.use(cookieParser())

//use shop routes
app.use('/', shopRoutes)


//user routes 
app.use('/users', userRoutes)


//cart routes
app.use('/cart', cartRoutes)

//404 pages
app.use((req, res, next)=>{
    res.render('404.ejs', {path:'404' , session: req.cookies.token ? true : false })
})

module.exports = app;
