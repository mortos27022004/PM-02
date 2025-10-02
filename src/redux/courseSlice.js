import { createSlice } from "@reduxjs/toolkit";
import { EXTENDED_COURSES } from "../data/extendedData";

const initialState = {
  courses: EXTENDED_COURSES,
  enrolledCourses: [1, 2], // Mock enrolled courses for demo
  registeredCourses: [], // Khóa học đã đăng ký (bao gồm cả chưa thanh toán)
  teachingCourses: [], // For teachers
  pendingCourses: [], // Courses waiting for approval
  filteredCourses: EXTENDED_COURSES, // For displaying filtered courses
  selectedCourse: null,
  filters: {
    category: "all",
    level: "all",
    price: "all",
    rating: 0,
  },
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    enrollCourse: (state, action) => {
      const { courseId, userId } = action.payload;

      // Find and update the course
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        // Add user to enrolledUsers array
        if (!course.enrolledUsers) {
          course.enrolledUsers = [];
        }
        if (!course.enrolledUsers.includes(userId)) {
          course.enrolledUsers.push(userId);
          course.students = course.enrolledUsers.length;
        }
      }

      // Add to user's enrolled courses
      if (!state.enrolledCourses.includes(courseId)) {
        state.enrolledCourses.push(courseId);
      }
    },
    unenrollCourse: (state, action) => {
      const courseId = action.payload;
      state.enrolledCourses = state.enrolledCourses.filter(
        (id) => id !== courseId
      );
      // Giảm số lượng học viên của khóa học
      const course = state.courses.find((c) => c.id === courseId);
      if (course && course.students > 0) {
        course.students -= 1;
      }
    },
    registerCourse: (state, action) => {
      const { courseId, userId } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);

      if (course) {
        const registration = {
          id: Date.now(),
          courseId,
          userId,
          registeredAt: new Date().toISOString(),
          paymentRequired: course.price > 0,
          paymentStatus: course.price > 0 ? "pending" : "completed",
          status: "registered",
        };

        // Kiểm tra xem đã đăng ký chưa
        const existingRegistration = state.registeredCourses.find(
          (reg) => reg.courseId === courseId && reg.userId === userId
        );

        if (!existingRegistration) {
          state.registeredCourses.push(registration);

          // Nếu miễn phí, tự động enroll
          if (course.price === 0) {
            if (!state.enrolledCourses.includes(courseId)) {
              state.enrolledCourses.push(courseId);
            }
            if (!course.enrolledUsers) {
              course.enrolledUsers = [];
            }
            if (!course.enrolledUsers.includes(userId)) {
              course.enrolledUsers.push(userId);
              course.students = course.enrolledUsers.length;
            }
          }
        }
      }
    },
    updatePaymentStatus: (state, action) => {
      const { courseId, userId, paymentStatus } = action.payload;
      const registration = state.registeredCourses.find(
        (reg) => reg.courseId === courseId && reg.userId === userId
      );

      if (registration) {
        registration.paymentStatus = paymentStatus;
        registration.paidAt =
          paymentStatus === "completed" ? new Date().toISOString() : null;

        // Nếu thanh toán thành công, tự động enroll
        if (paymentStatus === "completed") {
          if (!state.enrolledCourses.includes(courseId)) {
            state.enrolledCourses.push(courseId);
          }

          const course = state.courses.find((c) => c.id === courseId);
          if (course) {
            if (!course.enrolledUsers) {
              course.enrolledUsers = [];
            }
            if (!course.enrolledUsers.includes(userId)) {
              course.enrolledUsers.push(userId);
              course.students = course.enrolledUsers.length;
            }
          }
        }
      }
    },
    addCourse: (state, action) => {
      const newCourse = {
        ...action.payload,
        id: Math.max(...state.courses.map((c) => c.id)) + 1,
        status: "pending_review", // Mặc định chờ duyệt
        createdAt: new Date().toISOString(),
        students: 0,
        rating: 0,
        totalRatings: 0,
      };
      state.courses.push(newCourse);
    },
    deleteCourse: (state, action) => {
      const courseId = action.payload;
      state.courses = state.courses.filter((course) => course.id !== courseId);
      // Xóa khỏi enrolled courses nếu có
      state.enrolledCourses = state.enrolledCourses.filter(
        (id) => id !== courseId
      );
    },
    updateCourse: (state, action) => {
      const { id, updatedCourse } = action.payload;
      const courseIndex = state.courses.findIndex((course) => course.id === id);
      if (courseIndex !== -1) {
        state.courses[courseIndex] = {
          ...state.courses[courseIndex],
          ...updatedCourse,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    approveCourse: (state, action) => {
      const courseId = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.status = "published";
        course.updatedAt = new Date().toISOString();
      }
    },
    rejectCourse: (state, action) => {
      const { courseId, reason } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.status = "rejected";
        course.rejectionReason = reason;
        course.updatedAt = new Date().toISOString();
      }
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
});

export const {
  enrollCourse,
  unenrollCourse,
  registerCourse,
  updatePaymentStatus,
  addCourse,
  deleteCourse,
  updateCourse,
  approveCourse,
  rejectCourse,
  setSelectedCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
