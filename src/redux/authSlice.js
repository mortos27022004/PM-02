import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser } from "../data/accounts";

const initialState = {
  user: null,
  isAuthenticated: false,
  role: null, // 'admin', 'teacher', 'student'
  userInfo: null, // Thông tin chi tiết người dùng
  loginError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loginError = null;
    },
    loginSuccess: (state, action) => {
      const { user } = action.payload;
      state.user = user.username;
      state.role = user.role;
      state.userInfo = user;
      state.isAuthenticated = true;
      state.loginError = null;
    },
    loginFailure: (state, action) => {
      state.loginError = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.userInfo = null;
      state.isAuthenticated = false;
      state.loginError = null;
    },
  },
});

// Thunk action for authentication
export const loginUser = (username, password) => (dispatch) => {
  dispatch(loginStart());

  const result = authenticateUser(username, password);

  if (result.success) {
    dispatch(loginSuccess(result));
  } else {
    dispatch(loginFailure(result.message));
  }
};

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
