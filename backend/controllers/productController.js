//Now importing product Model
const { query } = require("express");
const Product = require("../models/productModel");
const cloudinary = require("cloudinary");

//Now importing Apifeature class

const Apifeatures = require("../utils/apifeatures");

//Get all products

exports.getAllProducts = async (req, res) => {
  const resultPerPage = 15;
  const productCount = await Product.countDocuments();
  try {
    const apiFeatures = new Apifeatures(Product.find(), req.query);
    apiFeatures.search();
    apiFeatures.filter();
    apiFeatures.pagination(resultPerPage);
    const product = await apiFeatures.query;

    //REF: Can also write this

    /*    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const product =await Product.find({ ...keyword }); */

    res.status(200).json({
      success: true,
      product,
      resultPerPage,
      Total_Product: productCount,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Some internal server error occured",
    });
  }
};

//Get recomanded products

exports.getRecomandedProducts = async (req, res) => {
  try {
    const data = await Product.find({ category: req.body.category });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Some internal server error occured",
    });
  }
};

//find category from id

exports.findCategoryFromId = async (req, res) => {
  try {
    var cartProductRecomendation;
    const data = await Product.findById(req.body.id);
    if (data) {
      cartProductRecomendation = await Product.find({
        category: data.category,
      });
    } else {
      cartProductRecomendation = [];
    }

    res.status(200).json({
      success: true,
      cartProductRecomendation,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Some internal server error occured",
    });
  }
};

//create products-Admin Route

exports.creatProducts = async (req, res, next) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "products",
    });
    const imagesLinks = [];

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });

    req.body.images = imagesLinks;

    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      error_type: error.message,
      message: "Some internal server error occured",
    });
  }
};

//Update Product-Admin Route

exports.updateProduct = async (req, res, next) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "products",
    });
    const imagesLinks = [];

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });

    req.body.images = imagesLinks;

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
      useFindAndMondify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      error_type: error.message,
      message: "Some internal server error occured",
    });
  }
};

//Delete Product

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
      next();
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product Deleted Sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      error_type: error.message,
      message: "Some internal server error occured",
    });
  }
};

//Get single Product Details

exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({
        message: `Resource Not found/Invalid Id :  ${error.value}`,
      });
    } else {
      res.status(500).json({
        error_type: error.message,
        message: "Some internal server error occured",
      });
    }
  }
};

//Create new review or update the review
exports.createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    //To check if the current user has made any review or not
    //If he has made the review then just update his review
    //If he has not made any review then just add a new review in the review section by pushing the user review into

    var isReviewed;
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        isReviewed = true;
      } else {
        isReviewed = false;
      }
    });

    //if the product is already being reviewd by the user then just update the review of that user

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        //now finding the review of that perticular user
        if (rev.user.toString() === req.user._id.toString())
          //updating the review of that perticular user
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      //User has not put the review, ie:A new review
      //just push the review into the *reviews*
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Product reviewd sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured, can not review the product",
      error_msg: error.message,
    });
  }
};

//Get all reviews of a single product

exports.getAllReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);
    if (!product) {
      return res.status(404).json({
        sucess: false,
        message: "product not found",
      });
      next();
    }
    res.status(200).json({
      sucess: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured, can not get reviews of the product",
      error_msg: error.message,
    });
  }
};

//Delete a review
exports.deleteReview = async (req, res, next) => {
  try {
    //Finding which product to be deleted
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return res.status(404).json({
        sucess: false,
        message: "product not found",
      });
      next();
    }

    //now finding the user review in that producct

    const reviewToBeDeleted = await product.reviews.find((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        //when the user if found then remove the user from that array
        product.reviews.pop(rev);
      }
    });

    //updating the product length, because the product length is continue..
    // only updated when the review is created so it must be updated when the review is deleted
    product.numOfReviews = await product.reviews.length;

    //Now updating the rating , because rating is only updated on review creation continue...
    //So it needed to be deleted when deleting the review also

    var sum = 0;
    product.reviews.forEach((rev) => {
      sum += rev.rating;
    });

    product.ratings = sum / product.numOfReviews;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      message: "Review Deleted sucessfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured, can not delete reviews of the product",
      error_msg: error.message,
    });
  }
};

//get all products admin

exports.getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Some internal server error occured",
    });
  }
};
