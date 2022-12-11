import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_USER,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
} from "../constants/userConstant";
import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post("/api/v1/loginUser", { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const signupUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });

      const { data } = await axios.post("/api/v1/register", {
        name,
        email,
        password,
        avatar,
      });
      dispatch({ type: SIGNUP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SIGNUP_FAIL, payload: error });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/me");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error });
  }
};

export const clearUserData = () => async (dispatch) => {
  dispatch({ type: CLEAR_USER });
};

export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const { data } = await axios.put("/api/v1/me/update", {
      name,
      email,
      avatar,
    });
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error });
  }
};

export const updateUserPassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      const { data } = await axios.put("/api/v1/password/update", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const forgotUserPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });
    const { data } = await axios.post("/api/v1/password/forgot", { email });
    dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetPasswordViaEmail =
  (password, confirmPassword, token) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      const { data } = await axios.put(`/api/v1/password/reset/${token}`, {
        password,
        confirmPassword,
      });
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const allUser = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_USER_REQUEST,
    });
    const {data}=await axios.get("/api/v1/admin/users");
    dispatch({
      type:ALL_USER_SUCCESS,
      payload:data.user
    })
  } catch (error) {
    dispatch({
      type:ALL_USER_FAIL,
      payload:error.response.data.message
    })
  }
};
