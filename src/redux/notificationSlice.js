import { createSlice } from "@reduxjs/toolkit";
import { NOTIFICATIONS } from "../data/extendedData";

const initialState = {
  notifications: NOTIFICATIONS,
  unreadCount: NOTIFICATIONS.filter((n) => !n.isRead).length,
  emailSettings: {
    courseUpdates: true,
    newEnrollments: true,
    assignments: true,
    promotions: false,
    systemNotifications: true,
  },
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const newNotification = {
        id: Math.max(...state.notifications.map((n) => n.id), 0) + 1,
        ...action.payload,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      state.notifications.unshift(newNotification);
      state.unreadCount += 1;
    },

    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(
        (n) => n.id === notificationId
      );
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount -= 1;
      }
    },

    markAllAsRead: (state, action) => {
      const userId = action.payload;
      state.notifications.forEach((notification) => {
        if (notification.userId === userId && !notification.isRead) {
          notification.isRead = true;
        }
      });
      state.unreadCount = 0;
    },

    deleteNotification: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(
        (n) => n.id === notificationId
      );
      if (notification && !notification.isRead) {
        state.unreadCount -= 1;
      }
      state.notifications = state.notifications.filter(
        (n) => n.id !== notificationId
      );
    },

    updateEmailSettings: (state, action) => {
      state.emailSettings = { ...state.emailSettings, ...action.payload };
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  updateEmailSettings,
} = notificationSlice.actions;

export default notificationSlice.reducer;
