//make import
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const Cart = require("../models/cart");
const Order = require("../models/orders");

//payment intents
module.exports.postPaymentIntent = async (req, res, next) => {
  const cart = await Cart.findOne({
    where: {
      id: req.cookies.cart,
    },
  });

  if (cart) {
    try {
      const products = await cart.getProducts();
      if (products) {
        const arr = [];
        products.forEach((element) => {
          arr.push(element.cartItem.quantity * element.cartItem.price);
        });

        // get total;
        const total = arr.reduce((a, b) => {
          return a + b;
        });

        //create the intent
        const intent = await stripe.paymentIntents.create({
          amount: total,
          currency: "usd",
        });
        res.json({ clientSecret: intent.client_secret });
      }
    } catch (error) {
      res.send(error);
    }
  }
};

// get checkout
module.exports.getCheckout = async (req, res, next) => {
  if (req.cookies.cart) {
    res.render("checkout/checkout", {
      path: "/checkout",
      title: "checkout",
      session: req.cookies.token ? true : false,
    });
  } else {
    res.redirect("/shop");
  }
};

// checkout order intent
module.exports.postOrders = async (req, res, next) => {
  try {
    const orderDetail = { ...req.body };
    const createOrder = await Order.create({
      fullName: orderDetail.fullName,
      address: orderDetail.address,
      email: orderDetail.email,
      city: orderDetail.city,
      zipCode: orderDetail.zipcode,
      state: orderDetail.state,
      total: orderDetail.total,
      products: `${orderDetail.qty} watch(es) from kzen collection`,
    });
    if (createOrder) {
      res.cookie("order", createOrder.id, {
        expires: new Date(Date.now() + 900000),
      });
      res.redirect("/checkout/checkout");
    }
  } catch (error) {
    res.render("popup.ejs", {
      message: error,
      title: "popup",
      path: "/popup",
      url: "shop",
      session: req.cookies.token ? true : false,
    });
  }
};

module.exports.getDeleteOrder = async (req, res, next) => {
  try {
    const orderId = req.cookies.order;
    const deleteOrder = await Order.destroy({
      where: {
        id: orderId,
      },
    });

    if (deleteOrder) {
      res.clearCookie("order");
      res.clearCookie("cart");
      res.end();
    }
  } catch (error) {
    res.json({ error });
  }
};

module.exports.getDeleteCookies = async (req, res, next) => {
  res.end();
};
//get success

module.exports.getSuccess = async (req, res, next) => {
  res.clearCookie("cart");
  res.clearCookie("order");
  res.render("checkout/success", {
    path: "/success",
    title: "success",
    session: req.cookies.token ? true : false,
  });
};
