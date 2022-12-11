import React from "react";
import Sidebar from "./Sidebar";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { geetAllReviews } from "../../actions/productAction";
import ReviewCard from "../product/ReviewCard";
import Loader from "../layout/loader/loader";
function Reviews() {
  const dispatch = useDispatch();
  const focusPoint = useRef(null);
  const secondPoint = useRef(null);

  const [productId, setproductId] = useState("");

  const showSidebar = () => {
    if (focusPoint.current.style.display === "none") {
      focusPoint.current.style.display = "block";
    } else {
      focusPoint.current.style.display = "none";
      secondPoint.current.style.width = "100%";
    }
  };

  const reviews = useSelector((state) => state.adminReviews.reviews);
  const loading = useSelector((state) => state.adminReviews.loading);

  const getReviews = async () => {
    dispatch(geetAllReviews(productId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard_main">
          <div ref={focusPoint}>
            <Sidebar />
          </div>
          <div
            className="dashboard"
            ref={secondPoint}
            style={{ height: "100vh", overflow: "scroll" }}
          >
            <h3 className="show_slide_bar1">all reviews</h3>
            <h3 className="show_sidebar">
              <i class="fa-solid fa-bars" onClick={showSidebar} /> all reviews
            </h3>
            <div className="admin_reviews_main">
              <div className="admin_reviews_searchBox">
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => {
                    setproductId(e.target.value);
                  }}
                  placeholder="Enter Product ID"
                />
                <button onClick={getReviews}>Search reviews</button>
              </div>
              <div className="admin_review_cards">
                {reviews && reviews.map((i) => <ReviewCard review={i} />)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
