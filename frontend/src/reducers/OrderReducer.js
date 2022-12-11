import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ALL_ORDERS_ADMIN_REQUEST,
  ALL_ORDERS_ADMIN_SUCCESS,
  ALL_ORDERS_ADMIN_FAIL,
} from "../constants/orderCostant";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        sucess: false,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        order: action.payload,
        sucess: true,
      };
    default:
      return state;
  }
};

export const myOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
        success: true,
      };
    case MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
        sucess: false,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orderDetails: action.payload,
        success: true,
      };
    case MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
        sucess: false,
      };

    default:
      return state;
  }
};

export const allOrderAdmin = (state = {}, action) => {
  switch (action.type) {
    case ALL_ORDERS_ADMIN_REQUEST:
      return {
        loading: true,
      };
    case ALL_ORDERS_ADMIN_SUCCESS: {
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };
    }
    case ALL_ORDERS_ADMIN_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
