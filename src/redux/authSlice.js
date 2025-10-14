import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser } from "../data/accounts";

// Load auth state from localStorage
const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return {
        user: null,
        isAuthenticated: false,
        role: null,
        userInfo: null,
        loginError: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      user: null,
      isAuthenticated: false,
      role: null,
      userInfo: null,
      loginError: null,
    };
  }
};

// Save auth state to localStorage
const saveAuthState = (state) => {
  try {
    const serializedState = JSON.stringify({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      role: state.role,
      userInfo: state.userInfo,
      loginError: null, // Don't persist errors
    });
    localStorage.setItem("authState", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = loadAuthState();

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
      saveAuthState(state);
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
      localStorage.removeItem("authState");
    },
    updateProfileStart: (state) => {
      state.loginError = null;
    },
    updateProfileSuccess: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      saveAuthState(state);
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
      saveAuthState(state);
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
