import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from "./courseSlice";
import notificationReducer from "./notificationSlice";
import supportReducer from "./supportSlice";
import analyticsReducer from "./analyticsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    notifications: notificationReducer,
    support: supportReducer,
    analytics: analyticsReducer,
  },
});
