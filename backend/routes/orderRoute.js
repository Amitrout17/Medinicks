const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const isAuthenticated = require("../middleware/auth");
const authrole = require("../middleware/authRole");

router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/order/:id").get(isAuthenticated, getSingleOrder);

router.route("/orders/me").get(isAuthenticated, myOrders);

router.route("/admin/orders").get(isAuthenticated, authrole, getAllOrders);

router
  .route("/admin/orders/:id")
  .put(isAuthenticated, authrole, updateOrder)
  .delete(isAuthenticated, authrole, deleteOrder);

module.exports = router;
