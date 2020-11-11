require('dotenv').config()
const stripe = require('stripe')(process.env.SECRET_KEY);


//create the session;
