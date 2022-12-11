import React from "react";
import Sidebar from "./Sidebar";
import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import Id from "./Id";
import Name from "./Name";
import Stock from "./Stock";
import Action from "./Action";
import Price from "./Price";
import { useEffect } from "react";
import { getAllProducts } from "../../actions/productAction";
import { useRef } from "react";
function ProductList() {
  const focusPoint = useRef(null);
  const secondPoint = useRef(null);

  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.allProducts);
  var products;
  if (productReducer) {
    if (productReducer.products) {
      products = productReducer.products.products;
    }
  }
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const showSidebar = () => {
    if (focusPoint.current.style.display === "none") {
      focusPoint.current.style.display = "block";
    } else {
      focusPoint.current.style.display = "none";
      secondPoint.current.style.width = "100%";
    }
  };

  return (
    <>
      <div className="product_list_main">
        <div ref={focusPoint}>
          <Sidebar />
        </div>

        <div className="product_list" ref={secondPoint}>
          <h3>
            <i
              className="fa-solid fa-bars sidebar_menue"
              onClick={showSidebar}
            />{" "}
            all products
          </h3>
          <div className="product_list_items">
            <div className="product_list_heading">
              <h4 className="product_list_heading_id">product_id</h4>
              <h4 className="product_list_heading_name">name</h4>
              <h4 className="product_list_heading_stock">stock</h4>
              <h4 className="product_list_heading_price">price</h4>
              <h4>actions</h4>
            </div>
            <div className="product_item_container">
              <div>{products && products.map((i) => <Id data={i._id} />)}</div>
              <div>
                {products && products.map((i) => <Name data={i.name} />)}
              </div>
              <div>
                {products && products.map((i) => <Stock data={i.Stock} />)}
              </div>
              <div>
                {products && products.map((i) => <Price data={i.price} />)}
              </div>
              <div>
                {products && products.map((i) => <Action id={i._id} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
