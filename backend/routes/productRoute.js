const express = require("express");
const {
  getAllProducts,
  creatProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
  getAllProductsAdmin,
  getRecomandedProducts,
  findCategoryFromId,
} = require("../controllers/productController");
const isAuthenticated = require("../middleware/auth");
const authrole = require("../middleware/authRole");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticated, authrole, creatProducts);

router
  .route("/admin/product/:id")
  .put(isAuthenticated, authrole, updateProduct)
  .delete(isAuthenticated, authrole, deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticated, createProductReview);

router
  .route("/reviews")
  .get(getAllReviews)
  .delete(isAuthenticated, deleteReview);

router
  .route("/admin/allProducts")
  .get(isAuthenticated, authrole, getAllProductsAdmin);

router.route("/products/recomandation").post(getRecomandedProducts);

router.route("/products/categoryById").post(findCategoryFromId);

module.exports = router;
