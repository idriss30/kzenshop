//get login page
module.exports.getUserPage = async(req, res, next)=>{
    res.render('users/user')
}

//create login post ctrl
module.exports.postUserLogin = async(req, res, next)=>{
    const data = {...req.body} //destructure the user input;
    res.json({data})
}