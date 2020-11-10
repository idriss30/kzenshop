const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = async(req, res, next)=>{
    // check if there is a token
    if(req.cookies.token){
     // verify the token;
     const isTokenVerified = await jwt.verify(req.cookies.token, process.env.SECRET_PASS, (err, decoded)=>{
         if(err){
             res.render('popup.ejs', {message:err,  url:'login', path:'popup',session: req.cookies.token ? true : false})
         }
         else{
             req.token = decoded
             next()
         }
     })
    }
    else{
        res.render('popup.ejs', {message:'you do not have authorization to view this.', url:'login', path:'popup',session: req.cookies.token ? true : false})
    }
}