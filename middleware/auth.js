const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = async(req, res, next)=>{
    // check if there is a token
    if(req.cookies.token){
     // verify the token;
     const isTokenVerified = await jwt.verify(req.cookies.token, process.env.SECRET_PASS, (err, decoded)=>{
         if(err){
             res.render('popup.ejs', {message:err,  url:true})
         }
         else{
             req.token = decoded
             next()
         }
     })
    }
}