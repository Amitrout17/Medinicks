import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./searchProduct.css"
/* import { useEffect } from "react";
 */
export default function Product(Product) {
  const product = Product.product;

  const options = {
    count: 5,
    size: 24,
    activeColor: "#32AEB1",
    edit: false,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <>
      <div className="search">
        <div className="product">
          <Link to={`/product/${product._id}`} className="product_card">
            <img src={product.images[0].url} alt="" />
            <div className="product_details">
              <h2>{product.name}</h2>
              <h3>{product.description.slice(0, 57)}...</h3>
              <div className="rating_div">
                <ReactStars classNames="stars" {...options} />
                <p>{product.numOfReviews} Reviews</p>
              </div>
              <h4>₹ {product.price} /-</h4>
              <div className="buttons">
                <button>
                  <i className="fa-solid fa-bag-shopping"></i>Buy Now{" "}
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
