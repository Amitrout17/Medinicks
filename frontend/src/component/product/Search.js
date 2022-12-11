import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../actions/productAction";
import SearchProductItem from "../product/SearchProductItem";
import Loader from "../layout/loader/loader";

import "./search.css";
function Search() {
  const { keyword } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchProduct(keyword));
  }, [dispatch, keyword]);

  const Products = useSelector(
    (state) => state.productSearchReducer.product.product
  );

  const load = useSelector((state) => state.productSearchReducer.loading);

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <div className="search_products">
          <h2 className="relevent_products">Relevant Products</h2>
          {Products && Products[0] ? (
            Products.map((key) => <SearchProductItem product={key} />)
          ) : (
            <h2 className="no_product">no products found</h2>
          )}
        </div>
      )}
    </>
  );
}

export default Search;
