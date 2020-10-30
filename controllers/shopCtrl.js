//importing the product module;
const Product = require('../models/product')

//creating the landing page controller 

module.exports.getLanding = async(req, res, next)=>{
    res.render('landing.ejs')
}

//shop page controller 

module.exports.getShop = async(req, res, next)=>{
   // fetch product for rendering;
   try {
    const products = await Product.findAll();
    res.render('shop/shop.ejs', {products})
       
   } catch (error) {
       res.json({error})
   }
   
}


//product detail controller

module.exports.getProduct = async(req, res, next)=>{
    const productId = req.params.id; // get the product id from parameters
    //fetch the product 
    try {
        const productFind =  await Product.findOne({
            where:{
                id:productId
            }
        })
        res.render('shop/product.ejs', {product : productFind})


    } catch (error) {
        res.json({error})
    }
   
}

//module get about us

module.exports.getAboutUs = async(req, res, next)=>{
    res.render('shop/aboutUs.ejs')
}

// get policy ctrl
module.exports.getPolicy = async (req, res, next)=>{
    res.render("shop/policy.ejs")
}

//get terms 

module.exports.getTerms = async(req, res, next)=>{
    res.render('shop/terms.ejs')
}