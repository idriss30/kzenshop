const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
require('dotenv').config()

//get login page
exports.getUserPage = async(req, res, next)=>{
    res.render('users/user')
}

//create login post ctrl
exports.postUserLogin = async(req, res, next)=>{
    const data = {...req.body} //destructure the user input;
    try {
        const isUser = await User.findOne(
            {where:{
                username:data.username
            }}
        )

        if(!isUser){// if user doesn't exist
             res.render('popup.ejs', {message:'user not found', url:true})
        }
        //check if passwords match
       const isPassVerified = await bcrypt.compare(req.body.password, isUser.password);
       if(isPassVerified){
           //CREATE A token
        const token = jwt.sign({userId: isUser.id}, process.env.SECRET_PASS, {
            expiresIn:"1h"
        })
        //send a cookie 
        res.cookie('token', token);
        res.render('popup.ejs', {message:'you have been logged in', url:false})
        
       }else{
          res.render('popup.ejs', {message:'password does not match try again!', url:true})
       }
        
    } catch (error) {
        res.render('conponents/popup.ejs', {message:error, url:true} )
    }

}


//create register ctrl

exports.postCreateUser = async(req, res, next)=>{
    const userData = {...req.body};
    try {
        const userExist = await User.findOne({
            where:{
                email:userData.email
            }
        })
        if(userExist){
            res.render('popup.ejs', {message:'email found, please login instead', url:true})
        }
        else{
            const hashedPassword = await bcrypt.hash(userData.password, 10)
            const user = await User.create({
                 firstName: userData.firstName,
                 lastName:userData.lastname,
                 username:userData.username,
                 password:hashedPassword,
                 email:userData.email,
                 city:userData.city,
                 address:userData.address,
                 state:userData.state,
                 zipCode:userData.zipcode
            })
            res.render('popup.ejs', {message:'Account has been created.', url:false})

        }

       
       
    } catch (error) {
        res.render('popup.ejs', {message:error, url:true})
    }
    
    
}


// create profile ctrl
exports.getProfile = async(req, res, next)=>{
    try {
     /*    //verify token
        const decoded = await jwt.verify(req.cookies.token, process.env.SECRET_PASS);
        if(decoded){
            const user = await User.findOne({
                where:{
                    id:decoded.userId
                }
            })
            res.render('users/profile.ejs', {user})

        }else{
            res.render('popup.ejs', {message:'you do not have authorization to view this', url:true})
        } */
    
        const decoded = req.token;
        const user = await User.findOne({
            where:{
                id: decoded.userId
            }
        })
        if(user){
            res.render('users/profile.ejs',  {user})
        }
        else{
            res.render('popup.ejs', {message:'there is a problem with your account', url:true})
        }

    } catch (error) {
        res.render('popup.ejs', {message:'you do not have authorization to view this', url:false}) 
    }
}

//update the profile

exports.postUpdateProfile = async(req, res, next)=>{
    try {
        const updateData = {...req.body}
        const hashedPassword = await bcrypt.hash(updateData.password, 10)
        const updateUser= await User.update({
            email:updateData.email,
            password:hashedPassword,
            address:updateData.address,
            city:updateData.city,
            state:updateData.state,
            zipCode:updateData.zipcode
            

        }, {where:{
             id: updateData.userId
        }})
        res.render('popup.ejs', {message:'your account has been updated', url:false})



    } catch (error) {
        res.render('popup.ejs', {message:error, url:true})
        
        
    }
}


//create a logout 

exports.getLogout = async(req, res, next)=>{
    res.clearCookie('token')
    res.render('popup.ejs', {message:'you have been logged out', url:false})
}

//creating delete routes

exports.getDeleteUser = async (req, res, next)=>{
  // get the id from the url
  const userId = req.params.id;
  //query the database
  try {
      const deleteQuery = await User.destroy({
          where:{
              id:userId
          }
      });
      //handle the result;
      if(!deleteQuery )res.render('popup.ejs', {message:"can't delete your account right now", url:true})
      if(deleteQuery) res.render('popup', {message:'user deleted', url:false})
  } catch (error) {
      res.render('popup.ejs', {message:error, url:true})
  }
 
}