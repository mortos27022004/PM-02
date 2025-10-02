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
    updateProfileStart: (state) => {
      state.loginError = null;
    },
    updateProfileSuccess: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    updateProfileFailure: (state, action) => {
      state.loginError = action.payload;
    },
    registerStart: (state) => {
      state.loginError = null;
    },
    registerSuccess: (state, action) => {
      const { user } = action.payload;
      state.user = user.username;
      state.role = user.role;
      state.userInfo = user;
      state.isAuthenticated = true;
      state.loginError = null;
    },
    registerFailure: (state, action) => {
      state.loginError = action.payload;
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

// Thunk action for profile update
export const updateProfile = (profileData) => (dispatch) => {
  dispatch(updateProfileStart());

  try {
    // Mock profile update logic
    setTimeout(() => {
      dispatch(updateProfileSuccess(profileData));
    }, 1000);
  } catch (error) {
    dispatch(updateProfileFailure("Cập nhật profile thất bại"));
  }
};

// Thunk action for registration
export const register = (userData) => (dispatch) => {
  dispatch(registerStart());

  try {
    // Mock registration logic
    const newUser = {
      username: userData.email,
      email: userData.email,
      fullName: userData.fullName,
      role: userData.role || "student",
      avatar: userData.avatar || "👤",
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      dispatch(registerSuccess({ user: newUser }));
    }, 1000);
  } catch (error) {
    dispatch(registerFailure("Đăng ký thất bại"));
  }
};

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} = authSlice.actions;
export default authSlice.reducer;
