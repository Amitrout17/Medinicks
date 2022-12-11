import React, { Fragment } from "react";
import banner1 from "./images/banner1.jpg";
import "./Home.css";
import "./Product.css";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Product from "./Product.js";
import Loader from "../layout/loader/loader";
import { useState } from "react";
import { Pagination } from "@mui/material";
import { Slider } from "@mui/material";

export default function Home() {
  //for page no filter
  const [pageNo, setPageNo] = useState(1);

  //For price filter
  const [price, setprice] = useState([0, 5000]);

  //For category

  const [Category, setCategory] = useState("");
  const categories = ["General", "Dibetics", "Gastric","Cold","Skin Care","Hair Care","Fitness","Homeopathy"];

  //For ratings

  const [rating, setrating] = useState(0);

  const dispatch = useDispatch();

  const result = useSelector((state) => state.productsReducer.products);
  const loading = useSelector((state) => state.productsReducer.loading);

  const productPerPage = useSelector(
    (state) => state.productsReducer.productsPerPage
  );
  const totalProduct = useSelector(
    (state) => state.productsReducer.productsCount
  );

  const paginationNo =
    (totalProduct / productPerPage) % 1 === 0
      ? totalProduct / productPerPage
      : parseInt(totalProduct / productPerPage) + 1;

  const priceHandler = (event, value) => {
    setprice(value);
  };

  const setPage = (event, value) => {
    setPageNo(value);
  };

  //For clearing all filters
  const clearAllFilters = () => {
    setprice([0, 5000]);
    setCategory("");
    setrating(0);
  };

  useEffect(() => {
    dispatch(getProduct(pageNo, price, Category, rating));
  }, [dispatch, pageNo, price, Category, rating]);

  return (
    <>
      {/* cheacking for loading status from redux store*/}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="fragment">
            <div className="banner">
              <img src={banner1} alt="" />
            </div>
            <h2 className="product_heading">Products</h2>
            <h3 /* onClick={displayChangeProperty} */ className="filterClick">
              Filters<i className="fa-solid fa-caret-down"></i>
            </h3>
            <div className="filterBox">
              <div className="price_filter">
                <p>Price</p>
                
                <Slider
                  value={price}
                  onChange={priceHandler}
                  size="small"
                  defaultValue={70}
                  aria-label="Custom marks"
                  valueLabelDisplay="on"
                  aria-labelledby="valuetext"
                  min={0}
                  max={5000}
                />
              </div>

              <ul className="categoryBox">
                <p>Categories</p>
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => {
                      setCategory(category);
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <ul className="rating_box">
                <p>Ratings</p>
                <li onClick={() => setrating(1)}>Above ★</li>
                <li onClick={() => setrating(2)}>Above ★★</li>
                <li onClick={() => setrating(3)}>Above ★★★</li>
                <li onClick={() => setrating(4)}>Above ★★★★</li>
              </ul>
            </div>
            <div className="clearFilter_">
              <button
                className="clearFilters_buttons"
                onClick={clearAllFilters}
              >
                Clear all filters
              </button>
            </div>
            <div className="starting_products">
              {result && result.map((product) => <Product produc={product} />)}
            </div>
            <div className="pagination">
              <Pagination
                count={paginationNo}
                variant="outlined"
                shape="rounded"
                onChange={setPage}
                defaultPage={pageNo}
                siblingCount={0}
                boundaryCount={2}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
