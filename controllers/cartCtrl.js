const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const Product = require('../models/product');
const User = require('../models/user');
require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports.postCart = async (req, res, next) => {
    const product = await Product.findOne({
        where: {
            id: req.body.productId
        }
    })
    if (req.cookies.cart) {
        const cart = await Cart.findOne({
            where: {
                id: req.cookies.cart
            }
        })
        if (cart) {
            // check if product is inside cart
            const isProd = await cart.hasProduct(product);
            if (isProd) {
                try {
                    const itemToUpdate = await CartItem.findOne({
                        where: {
                            cartId: cart.id
                        }
                    })
                    if (itemToUpdate) {
                        const update = await CartItem.update({
                            quantity: itemToUpdate.quantity + 1
                        }, {
                            where: {
                                cartId: cart.id,
                                productId: product.id
                            }
                        })
                        if (update) {
                            res.redirect(req.get('referer'))
                        }
                    }

                } catch (error) {
                    res.render('popup.ejs', {
                        message: "can not add product",
                        url: 'shop',
                        path: '/popup',
                        title: 'popup',
                        session: req.cookies.token ? true : false
                    })
                }
            } else {
                // add product
                const addingProd = await cart.addProduct(product, {
                    through: {
                        productId: product.id,
                        cartId: cart.id,
                        quantity: 1,
                        price: product.price
                    }
                })
                res.redirect(req.get('referer'))

            }
        }


    } else {


        try {
            //create cart
            const cart = await Cart.create();
            if (cart) {
                //create the cookie; 

                const addProd = await cart.addProduct(product, {
                    through: {
                        productId: product.id,
                        cartId: cart.id,
                        quantity: 1,
                        price: product.price
                    }
                })
                if (addProd) {
                    res.cookie('cart', cart.id, {
                        expires: new Date(Date.now() + 	
                        3600000)
                    });
                    res.redirect(req.get('referer'))
                } else {
                    res.render('popup.ejs', {
                        message: "can not add product",
                        url: 'shop',
                        path: '/popup',
                        title: 'popup',
                        session: req.cookies.token ? true : false
                    })
                }
            }

        } catch (error) {
            res.render('popup.ejs', {
                message: error,
                url: 'shop',
                path: '/popup',
                title: 'popup',
                session: req.cookies.token ? true : false
            })
        }

    }

}


module.exports.getCart = async (req, res, next)=>{

    // checkif cart
    if(req.cookies.cart){
        try {
            // get cart
            const cart = await Cart.findOne({
                where:{
                    id: req.cookies.cart
                }
            })
            if(cart){
                //get the products
                const totals = [];// create array of totals
                const products = await cart.getProducts();
                if(products){
                  // add every total the the array
                  products.forEach(product =>{
                      totals.push(product.cartItem.quantity * product.cartItem.price)
                  })
                  // reduce the array to get the final total
                  if(totals.length >0){
                    const total = totals.reduce((a,b)=>{
                        return a +b
                    })
                    //before render check if(user is connected)
                    if(req.cookies.token){
                        //verify the token
                        
                        try {
                            const verified = jwt.verify(req.cookies.token, process.env.SECRET_PASS);
                            const user = await User.findOne({
                                where:{
                                    id: verified.userId
                                }
                            })
                            if(user){
                                res.render('cart/cart', {products, total, user, path:'/cart', title:'cart', session:true})
                            }
                        } catch (error) {
                            res.render('popup.ejs',{path:'/popup', url:'home', message:'problem with your account try login out', token:true })
                        }
                    
                     
                      

                        
                       

                        
                    }
                
                    else{
                        res.render('cart/cart', {products, total, path:'/cart', title:'cart', session:false, user:undefined})
                    }
                   
                  }else{
                    res.render('popup.ejs', {message: 'you do not have any product in your cart', url:'shop', title:'popup', path:'/popup', session:req.cookies.token? true:false})
                  }
                 
                }
                else{
                    res.redirect('/shop')
                }


            }else{
                res.clearCookie('cart');
                res.redirect('/')
            }
        } catch (error) {
             res.render('popup.ejs', {message: error, url:'shop', title:'popup', path:'/popup', session:req.cookies.token? true:false})
        }
      
    }
    else{
        res.render('popup.ejs', {message: 'you do not have any product in your cart', url:'shop', title:'popup', path:'/popup', session:req.cookies.token? true:false})
    }
}


//create delete product ctrl
exports.getDeleteProduct = async (req, res, next)=>{
    // find the product id
    const prodId = req.params.id;
    // get the product from database
    const deleteProduct =  await CartItem.destroy({
        where:{
            productId : prodId,
            cartId : req.cookies.cart
        }
    })
    if(deleteProduct){
        res.redirect('/cart/cartItems')
    }
    else{
        res.render('popup.ejs', {url:'shop', path:'/popup', message:"can't delete product " , session:req.cookies.token?true:false})
    }

}


// create the increase ctrl
exports.IncreaseQuantity = async(req, res,next)=>{
  try {    
    // get cart and product id
    const cartID = req.cookies.cart;
    const prodId = req.params.id;
  //get prod
  const item  = await CartItem.findOne({where:{
      cartId:cartID,
      productId:prodId
  }})

  if(item){
     if(item.quantity === 10){
         res.json({message:'many'})
     }
     else{
         const updateItem = await item.update({quantity:item.quantity +1})
         if(updateItem){
             res.json({message:"success"})
         }
         else{
             res.redirect('/cart/cartItems')
         }
         
     }

  }
   else{
       res.redirect("/cart/cartItems")
   }
     
  } catch (error) {
      res.render('popup',{ url:"shop", message:error, path:'/popup', session:req.cookies.token?true:false })
  }
  



}


//create decrease ctrl

exports.decreaseQuantity = async(req, res, next)=>{
    try {    
        // get cart and product id
        const cartID = req.cookies.cart;
        const prodId = req.params.id;
      //get prod
      const item  = await CartItem.findOne({where:{
          cartId:cartID,
          productId:prodId
      }})
    
      if(item){
         if(item.quantity === 1){
             res.json({message:'one'})
         }
         else{
             const updateItem = await item.update({quantity:item.quantity - 1})
             if(updateItem){
                 res.json({message:"success"})
             }
             else{
                 res.redirect('/cart/cartItems')
             }
             
         }
    
      }
       else{
           res.redirect("/cart/cartItems")
       }
         
      } catch (error) {
          res.render('popup',{ url:"shop", message:error, path:'/popup', session:req.cookies.token?true:false })
      }
      
    
    
}


// delete Cart method 

exports.DeleteCart = async(req, res, next)=>{
 
 try {
     //get the cart id
     const cartID = req.cookies.cart;
     const deleteItem = await Cart.destroy({
         where:{
            id:cartID
         }
       
     });

     if(deleteItem){
         res.redirect('/')
     }
     else{
         res.render('popup.ejs', )
     }
  
 } catch (error) {
    res.render('popup',{ url:"shop", message:error, path:'/popup', session:req.cookies.token?true:false })
 
}

}