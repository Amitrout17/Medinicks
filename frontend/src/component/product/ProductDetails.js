import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "../product/ProductDetails.css";
import { getProductDetails, createReview } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../product/ReviewCard.js";
import Loader from "../layout/loader/loader";
import { addItemsToCart } from "../../actions/cartAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRef } from "react";
import { error } from "../alert/errorMessage";
import { success } from "../alert/sucessMessage";
import ProductRec from "./ProductRec";
import ProductRecPrimary from "./ProductRecPrimary";
import {
  recomandedProducts,
  cartProductRecomandation,
} from "../../actions/productAction";

function ProductDetails() {
  const [reviewStars, steReviewStars] = useState(0);
  const submit = useRef(null);
  const [review, setreview] = useState("");
  const { id } = useParams();
  const [quantity, setquantity] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const product = useSelector((state) => state.productDetailsReducer.product);
  const loading = useSelector((state) => state.productDetailsReducer.loading);

  const category = product.category;

  useEffect(() => {
    category && dispatch(recomandedProducts(category));
  }, [dispatch, category]);

  const reduceQuantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    } else {
      return;
    }
  };
  const increaseQuantity = () => {
    if (quantity < product.Stock) {
      setquantity(quantity + 1);
    } else {
      return;
    }
  };

  const addToCart = () => {
    if (product.Stock >= 1) {
      dispatch(addItemsToCart(id, quantity));
      toast.success("Item Added To Cart", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Product Out Of Stock", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  //react stars:
  const options = {
    count: 5,
    size: 24,
    activeColor: "#32AEB1",
    edit: false,
    value: product.ratings,
    isHalf: true,
  };
  const ratingChanged = (newRating) => {
    steReviewStars(newRating);
  };

  //review react stars
  const reviewOptions = {
    count: 5,
    size: 24,
    color2: "#32AEB1",
    isHalf: true,
  };

  //submit review

  const submitReview = () => {
    submit.current.style.display === "none"
      ? (submit.current.style.display = "flex")
      : (submit.current.style.display = "none");
  };
  const cancleReview = () => {
    setreview("");
    steReviewStars(0);
    reviewOptions.value = 0;
    submit.current.style.display = "none";
  };

  //create a review constants

  const createReviewMessage = useSelector((state) => state.createUpdateReview);

  var reviewMessage;
  if (createReviewMessage.success) {
    reviewMessage = createReviewMessage.product.message;
  } else {
    reviewMessage = createReviewMessage.error;
  }
  const submitAReview = async () => {
    await dispatch(createReview(id, review, reviewStars));
    if (createReviewMessage.success) {
      success(reviewMessage);
      window.location.reload();
    } else {
      error(reviewMessage);
    }
  };

  //recomandation system based on cart items
  //........ testing ongoing
  //note : recomandation on the basis of the cartItem

  const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  var recID = {};
  if (cartItems && cartItems.length !== 0) {
    recID = cartItems[cartItems.length - 1].product_id;
  }

  useEffect(() => {
    cartItems &&
      cartItems.length !== 0 &&
      dispatch(cartProductRecomandation(recID));
  }, [dispatch, recID]);

  //...........testing

  useEffect(() => {
    submit.current.style.display = "none";
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="main_div">
            <div className="image_slider">
              <div>
                <div className="image_caroulse">
                  {product.images &&
                    product.images.map((key) => <img src={key.url} alt="" />)}
                </div>
              </div>
            </div>
            <div className="product_description">
              <h2>{product.name}</h2>
              <h3>Product Id : #{product._id}</h3>
              <h4 className="price">₹{product.price}</h4>
              <div className="ratings">
                <ReactStars classNames="stars" {...options} />
                <p>{product.numOfReviews} Reviews</p>
              </div>
              <div className="quantity">
                <button className="pluse" onClick={reduceQuantity}>
                  -
                </button>
                <input type="number" value={quantity} readOnly={true} />
                <button className="minus" onClick={increaseQuantity}>
                  +
                </button>
                <button className="tocart" onClick={addToCart}>
                  <i className="fa-solid fa-cart-shopping"></i>Add To cart
                </button>
              </div>
              <div className="status">
                <h4 className={product.Stock >= 1 ? "green" : "red"}>
                  {product.Stock >= 1 ? "In Stock" : "Out Of Stock"}
                </h4>
              </div>
              <div className="description">
                <h4>Description</h4>
                <p>{product.description}</p>
              </div>
              <button className="review" onClick={submitReview}>
                Add Review
              </button>

              <div className="submit_review" ref={submit}>
                <h4>Submit review</h4>
                <ReactStars
                  {...reviewOptions}
                  onChange={ratingChanged}
                  classNames="review_stars"
                />
                <input
                  type="text"
                  onChange={(e) => {
                    setreview(e.target.value);
                  }}
                  value={review}
                />
                <div className="subimt_review_buttons">
                  <button style={{ color: "red" }} onClick={cancleReview}>
                    cancle
                  </button>
                  <button style={{ color: "green" }} onClick={submitAReview}>
                    submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="reviews">
            <h2>reviews</h2>
            <div className="reviewcard">
              {product.reviews && product.reviews[0] ? (
                product.reviews &&
                product.reviews.map((key) => <ReviewCard review={key} />)
              ) : (
                <p className="noreviews">No Reviews Yet</p>
              )}
            </div>
          </div>
          <ProductRecPrimary />
          <ProductRec />
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default ProductDetails;
