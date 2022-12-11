import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  productSearchReducer,
  newReview,
  adminProducts,
  newProduct,
  productRecomandation,
  cartProductRecomandation,
  updateProduct,
  adminReviews
} from "./reducers/ProductReducer";

import {
  userReducerLogin,
  userReducerSignup,
  loadUserReducer,
  userProfileUpdate,
  passwordReset,
  resetPasswordViaEmailReducer,
  getAllUser,
} from "./reducers/userReducer.js";

import { cartReducer } from "./reducers/CartReducer";

import {
  orderReducer,
  myOrderReducer,
  orderDetailsReducer,
  allOrderAdmin,
} from "./reducers/OrderReducer";

const reducer = combineReducers({
  productsReducer,
  productDetailsReducer,
  productSearchReducer,
  userReducerLogin,
  userReducerSignup,
  loadUserReducer,
  userProfileUpdate,
  passwordReset,
  resetPasswordViaEmailReducer,
  cart: cartReducer,
  order: orderReducer,
  myOrder: myOrderReducer,
  orderDetails: orderDetailsReducer,
  createUpdateReview: newReview,
  allProducts: adminProducts,
  allOrders: allOrderAdmin,
  allUsers: getAllUser,
  createProduct: newProduct,
  recProduct: productRecomandation,
  cartRecomandation: cartProductRecomandation,
  updated: updateProduct,
  adminReviews
});

let initialState = {
  //we have put the cart item in the local storage so that the state does not become empty on page refresh and on new page load
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

//This will contain the array of all the middleware
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
