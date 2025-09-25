import { createSlice } from "@reduxjs/toolkit";
import { LEARNING_PROGRESS, COURSE_REVIEWS } from "../data/extendedData";

const initialState = {
  progress: LEARNING_PROGRESS,
  reviews: COURSE_REVIEWS,
  statistics: {
    totalStudents: 1250,
    totalCourses: 45,
    totalInstructors: 23,
    completionRate: 76.8,
    averageRating: 4.6,
    totalRevenue: 12750000, // VND
    monthlyGrowth: 15.3,
  },
  revenueData: {
    monthly: [
      { month: "T1", revenue: 2150000, orders: 45 },
      { month: "T2", revenue: 3200000, orders: 67 },
      { month: "T3", revenue: 4100000, orders: 89 },
      { month: "T4", revenue: 3400000, orders: 72 },
    ],
    byPaymentMethod: [
      { method: "VNPay", revenue: 5200000, percentage: 40.8 },
      { method: "MoMo", revenue: 4100000, percentage: 32.2 },
      { method: "PayPal", revenue: 2250000, percentage: 17.6 },
      { method: "Chuyển khoản", revenue: 1200000, percentage: 9.4 },
    ],
  },
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    updateProgress: (state, action) => {
      const { userId, courseId, lessonId, completionData } = action.payload;

      let userProgress = state.progress.find(
        (p) => p.userId === userId && p.courseId === courseId
      );

      if (!userProgress) {
        userProgress = {
          userId,
          courseId,
          completedLessons: [],
          totalLessons: 24, // Default
          completionPercentage: 0,
          lastAccessedAt: new Date().toISOString(),
          quizScores: {},
          codeSubmissions: {},
        };
        state.progress.push(userProgress);
      }

      // Update completed lessons
      if (lessonId && !userProgress.completedLessons.includes(lessonId)) {
        userProgress.completedLessons.push(lessonId);
      }

      // Update completion percentage
      userProgress.completionPercentage =
        (userProgress.completedLessons.length / userProgress.totalLessons) *
        100;

      // Update last accessed time
      userProgress.lastAccessedAt = new Date().toISOString();

      // Update quiz scores if provided
      if (completionData?.quizScore) {
        userProgress.quizScores[completionData.quizId] =
          completionData.quizScore;
      }

      // Update code submissions if provided
      if (completionData?.codeScore) {
        userProgress.codeSubmissions[completionData.codeId] = {
          score: completionData.codeScore,
          attempts: completionData.attempts || 1,
        };
      }
    },

    addReview: (state, action) => {
      const newReview = {
        id: Math.max(...state.reviews.map((r) => r.id), 0) + 1,
        ...action.payload,
        createdAt: new Date().toISOString(),
        isVerifiedPurchase: true,
      };
      state.reviews.push(newReview);
    },

    updateStatistics: (state, action) => {
      state.statistics = { ...state.statistics, ...action.payload };
    },

    addRevenueRecord: (state, action) => {
      const { amount, paymentMethod, courseId, userId } = action.payload;

      // Update total revenue
      state.statistics.totalRevenue += amount;

      // Update payment method statistics
      const methodStat = state.revenueData.byPaymentMethod.find(
        (m) => m.method === paymentMethod
      );
      if (methodStat) {
        methodStat.revenue += amount;
      }

      // Recalculate percentages
      const total = state.statistics.totalRevenue;
      state.revenueData.byPaymentMethod.forEach((method) => {
        method.percentage = (method.revenue / total) * 100;
      });
    },

    generateReport: (state, action) => {
      const { reportType, filters } = action.payload;

      // This would typically generate and cache report data
      // For demo purposes, we'll just update a timestamp
      state.lastReportGenerated = {
        type: reportType,
        filters,
        timestamp: new Date().toISOString(),
      };
    },
  },
});

export const {
  updateProgress,
  addReview,
  updateStatistics,
  addRevenueRecord,
  generateReport,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
