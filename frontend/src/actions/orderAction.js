import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_ADMIN_REQUEST,
  ALL_ORDERS_ADMIN_SUCCESS,
  ALL_ORDERS_ADMIN_FAIL
} from "../constants/orderCostant";

import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const { data } = await axios.post("/api/v1/order/new", order);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error,
    });
  }
};

export const myOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });
    const { data } = await axios.get("/api/v1/orders/me");
    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: data.myOrder,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetails = (orderID) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/order/${orderID}`);
    dispatch({
      type:ORDER_DETAILS_SUCCESS,
      payload:data.order
    })
  } catch (error) {
    dispatch({
      type:ORDER_DETAILS_FAIL,
      payload:error.response.data.message
    })
  }
};

export const allOrdersDetails = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_ADMIN_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/orders`);
    dispatch({
      type:ALL_ORDERS_ADMIN_SUCCESS,
      payload:data
    })
  } catch (error) {
    dispatch({
      type:ALL_ORDERS_ADMIN_FAIL,
      payload:error.response.data.message
    })
  }
};
