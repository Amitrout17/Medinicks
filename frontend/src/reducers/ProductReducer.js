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

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        product: [],
        result: action.payload,
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.product,
        productsCount: action.payload.Total_Product,
        productsPerPage: action.payload.resultPerPage,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//Now using a empty object instead of an empty array (as before) in state
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//PRODUCT SEARCH REDUCER
export const productSearchReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_SEARCH_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_SEARCH_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//create a review
export const newReview = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//get all products (admin)
export const adminProducts = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      };
    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

//CREATE PRODUCT

export const newProduct = (state = {}, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case NEW_PRODUCT_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//PRODUCT RECOMANDATION SYSTEM

export const productRecomandation = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_RECOMANDATION_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case PRODUCT_RECOMANDATION_SUCCESS:
      return {
        loading: false,
        success: true,
        recP: action.payload,
      };
    case PRODUCT_RECOMANDATION_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const cartProductRecomandation = (state = {}, action) => {
  switch (action.type) {
    case CART_RECOMANDATION_SYSTEM_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case CART_RECOMANDATION_SYSTEM_SUCCESS:
      return {
        loading: false,
        success: true,
        cartRec: action.payload,
      };
    case CART_RECOMANDATION_SYSTEM_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateProduct = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        newProduct: action.payload,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adminReviews = (state = {}, action) => {
  switch (action.type) {
    case ALL_REVIEWS_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case ALL_REVIEWS_SUCCESS:
      return {
        loading: false,
        success: true,
        reviews: action.payload,
      };
    case ALL_REVIEWS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
