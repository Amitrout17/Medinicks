import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function Product(Produc) {
  const products = Produc.produc;

  //For star ratings
  const options = {
    count: 5,
    size: 24,
    activeColor: "#32AEB1",
    edit: false,
    value: products.ratings,
    isHalf: true,
  };
  return (
    <>
      <div className="product">
        <Link to={`product/${products._id}`} className="product_card">
          <img src={products.images[0].url} alt="" />
          <div className="product_details">
            <h2>{products.name.slice(0,25)}...</h2>
            <h3>{products.description.slice(0, 40)}...</h3>
            <div className="rating_div">
              <ReactStars classNames="stars" {...options} />
              <p>{products.numOfReviews} Reviews</p>
            </div>

            <h4>₹ {products.price} /-</h4>
            <div className="buttons">
              <button>
                <i className="fa-solid fa-bag-shopping"></i>Buy Now{" "}
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
