import * as api from "../../api";
import { openAlertMessage } from "./alertActions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

export const login = createAsyncThunk(
  "auth/login",
  async (userDetails, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.login(userDetails);
      if (response.error) {
        dispatch(openAlertMessage(response?.exception?.response?.data));
        return rejectWithValue(response?.exception?.response?.data);
      } else {
        const { userDetails } = response?.data;
        localStorage.setItem("user", JSON.stringify(userDetails));
        dispatch(setUserDetails(userDetails));
        return userDetails;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userDetails, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.register(userDetails);
      if (response.error) {
        dispatch(openAlertMessage(response?.exception?.response?.data));
        return rejectWithValue(response?.exception?.response?.data);
      } else {
        const { userDetails } = response?.data;
        localStorage.setItem("user", JSON.stringify(userDetails));
        dispatch(setUserDetails(userDetails));
        return userDetails;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
