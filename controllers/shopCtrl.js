//importing the product module;
const Product = require('../models/product')

//creating the landing page controller 

module.exports.getLanding = async(req, res, next)=>{
    res.render('landing.ejs', {path:'/', title:'home', session: req.cookies.token ? true : false})
}

//shop page controller 

module.exports.getShop = async(req, res, next)=>{
   // fetch product for rendering;
   try {
    const products = await Product.findAll();
    res.render('shop/shop.ejs', {products, path:'/shop' , title: 'Shop Page', session: req.cookies.token ? true : false})
       
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
        res.render('shop/product.ejs', {product : productFind, title:'product detail',path:'product_detail' , session: req.cookies.token ? true : false})


    } catch (error) {
        res.json({error})
    }
   
}

//module get about us

module.exports.getAboutUs = async(req, res, next)=>{
    res.render('shop/aboutUs.ejs', {title:'About us', path:'/about', session: req.cookies.token ? true : false})
}

// get policy ctrl
module.exports.getPolicy = async (req, res, next)=>{
    res.render("shop/policy.ejs", {title:'Policy', path:'/policy', session: req.cookies.token ? true : false})
}

//get terms 

module.exports.getTerms = async(req, res, next)=>{
    res.render('shop/terms.ejs', {title:'Terms & conditions', path:'/terms', session: req.cookies.token ? true : false})
}