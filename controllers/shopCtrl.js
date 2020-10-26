//creating the landing page controller 

module.exports.getLanding = async(req, res, next)=>{
    res.render('landing.ejs')
}

//shop page controller 

module.exports.getShop = async(req, res, next)=>{
    res.render('shop/shop.ejs')
}


//product detail controller

module.exports.getProduct = async(req, res, next)=>{
    res.render('shop/product.ejs')
}

//module get about us

module.exports.getAboutUs = async(req, res, next)=>{
    res.render('shop/aboutUs.ejs')
}