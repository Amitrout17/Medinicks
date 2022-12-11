import axios from "axios";

import {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  PRODUCT_RECOMANDATION_FAIL,
  PRODUCT_RECOMANDATION_REQUEST,
  PRODUCT_RECOMANDATION_SUCCESS,
  CART_RECOMANDATION_SYSTEM_REQUEST,
  CART_RECOMANDATION_SYSTEM_SUCCESS,
  CART_RECOMANDATION_SYSTEM_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_SUCCESS,
  ALL_REVIEWS_FAIL
} from "../constants//productConstant";

export const getProduct =
  (page, price = [0, 5000], Category = "", rating = 0) =>
  async (dispatch) => {
    try {
      var link;
      if (Category === "") {
        link = `/api/v1/products?&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
      } else {
        link = `/api/v1/products?&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${Category}&ratings[gte]=${rating}`;
      }
      dispatch({ type: ALL_PRODUCT_REQUEST });

      const { data } = await axios.get(link);

      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const searchProduct = (keyword) => async (dispatch) => {
  if (!keyword) {
    keyword = "";
  }
  try {
    dispatch({ type: PRODUCT_SEARCH_REQUEST });

    const { data } = await axios.get(`/api/v1/products?keyword=${keyword}`);

    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_SEARCH_FAIL,
      payload: error.message,
    });
  }
};

export const createReview =
  (productId, comment, rating) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_REVIEW_REQUEST,
      });
      const { data } = await axios.put("/api/v1/review", {
        productId,
        comment,
        rating,
      });
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//admin products

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PRODUCT_REQUEST,
    });
    const { data } = await axios.get("/api/v1/admin/allProducts");
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newProduct =
  (name, price, description, category, image, Stock) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_PRODUCT_REQUEST,
      });
      console.log(name);
      const { data } = await axios.post("/api/v1/admin/product/new", {
        name,
        price,
        description,
        category,
        image,
        Stock,
      });
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const recomandedProducts = (category) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_RECOMANDATION_REQUEST,
    });
    const { data } = await axios.post("/api/v1/products/recomandation", {
      category,
    });
    dispatch({
      type: PRODUCT_RECOMANDATION_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_RECOMANDATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const cartProductRecomandation = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CART_RECOMANDATION_SYSTEM_REQUEST,
    });
    const { data } = await axios.post("/api/v1/products/categoryById", { id });
    dispatch({
      type: CART_RECOMANDATION_SYSTEM_SUCCESS,
      payload: data.cartProductRecomendation,
    });
  } catch (error) {
    dispatch({
      type: CART_RECOMANDATION_SYSTEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id,name,price,description,Stock,category,image) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });
    const { data } = await axios.put(`/api/v1/admin/product/${id}`, { name,price,description,Stock,category,image });
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const geetAllReviews = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_REVIEWS_REQUEST,
    });
   const {data}=await axios.get(`/api/v1/reviews?id=${productId}`)
    dispatch({
      type: ALL_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
