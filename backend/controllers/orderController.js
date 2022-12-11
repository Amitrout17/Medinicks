const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Create New Order

exports.newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(200).json({
      sucess: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some erroe occured, can not create product",
      error_message: error.message,
    });
  }
};

//Get single order

exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return res.status(404).json({
      sucess: false,
      message: `order not found with the id: ${req.params.id}`,
    });
    next();
  }

  res.status(200).json({
    success: true,
    order,
  });
};

//Get logged in user Orders
exports.myOrders = async (req, res, next) => {
  try {
    console.log(req.cookies)
    const myOrder = await Order.find({ user: req.user.id });

    if (!myOrder) {
      return res.status(404).json({
        sucess: false,
        message: `order not found with the id: ${req.user.id}`,
      });
      next();
    }

    res.status(200).json({
      sucess: true,
      myOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "some error occured, can not get user orders",
      error_message: error.message,
    });
  }
};

//Get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const order = await Order.find();
    var totalAmount = 0;
    order.forEach((x) => {
      totalAmount += x.totalPrice;
    });

    res.status(200).json({
      sucess: true,
      Total_price: totalAmount,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "some error occured, can not fetch all the orders",
      error_message: error.message,
    });
  }
};

//update order status --Admin
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "order not found",
      });
      next();
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        message: "You have already delivered this Product",
      });
      next();
    }
    

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.orderItems.forEach(async (x) => {
        await updateStocks(x.product, x.quantity);
      });
      order.deliveredAt = Date.now();
    }

    await order.save({ validationBeforeSave: false });

    res.status(200).json({
      sucess: true,
      message: "Order updated sucessfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "some error occured, can Update order",
      error_message: error.message,
    });
  }
};

async function updateStocks(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;
  await product.save();
}

//delete Order --Admin
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "order not found",
      });
      next();
    }

    await order.remove();

    res.status(200).json({
      sucess: true,
      message: "Order deleted sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "some error occured, can not fetch all the orders",
      error_message: error.message,
    });
  }
};
