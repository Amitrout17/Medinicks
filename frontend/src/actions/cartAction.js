import { ADD_TO_CART, REMOVE_ITEM_FROM_CART,SAVE_SHIPPING_INFO } from "../constants/CartConstant";
import axios from "axios";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product_id: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      rating: data.product.ratings,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (product_id) => async (dispatch,getState) => {
    dispatch({
      type:REMOVE_ITEM_FROM_CART,
      payload:product_id
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo=(data)=>async(dispatch)=>{
  dispatch({
    type:SAVE_SHIPPING_INFO,
    payload:data
  })
  localStorage.setItem("shippingInfo",JSON.stringify(data))
}
