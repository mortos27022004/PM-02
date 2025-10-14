import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import StudentList from "./components/StudentList";
import StudentProgress from "./components/StudentProgress";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import CourseFeedback from "./components/CourseFeedback";
import RevenueStatistics from "./components/RevenueStatistics";
import EmailTemplateManager from "./components/EmailTemplateManager";
import AdminManagement from "./components/AdminManagement";
import UserManagement from "./components/admin/UserManagement";
import CourseApproval from "./components/admin/CourseApproval";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CourseList from "./components/CourseList";
import AdminPanel from "./components/roles/AdminPanel";
import TeacherDashboard from "./components/roles/TeacherDashboard";
import StudentDashboard from "./components/roles/StudentDashboard";
import LearningInterface from "./components/learning/LearningInterface";
import CourseViewer from "./components/learning/CourseViewer";
import LessonDetail from "./components/learning/LessonDetail";
import Payment from "./components/Payment";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Notifications from "./components/Notifications";
import HelpCenter from "./components/HelpCenter";
import Profile from "./components/Profile";
import CodingPractice from "./components/CodingPractice";
import CourseEnrollment from "./components/CourseEnrollment";
import ProgressTracking from "./components/ProgressTracking";
import FeedbackSystem from "./components/FeedbackSystem";
import MyCourses from "./components/MyCourses";
import SearchCourses from "./components/SearchCourses";
import CodeEditor from "./components/CodeEditor";
import NotificationCenter from "./components/NotificationCenter";
import AccountInfo from "./components/AccountInfo";
import AccountSettings from "./components/AccountSettings";
import SupportCenter from "./components/SupportCenter";
import CodePracticeManagement from "./components/CodePracticeManagement";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Header />

      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CourseList />
            </ProtectedRoute>
          }
        />

        {/* Admin only routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Teacher only routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* Student only routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Learning routes */}
        <Route
          path="/course/:courseId"
          element={
            <ProtectedRoute>
              <CourseViewer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment/:courseId"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learning/:courseId/:lessonId"
          element={
            <ProtectedRoute>
              <LessonDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learning-interface/:courseId/:lessonId"
          element={
            <ProtectedRoute>
              <LearningInterface />
            </ProtectedRoute>
          }
        />

        {/* Additional features */}
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <HelpCenter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <CodingPractice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/enroll/:courseId"
          element={
            <ProtectedRoute>
              <CourseEnrollment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <ProgressTracking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <FeedbackSystem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-courses"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MyCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/code-editor"
          element={
            <ProtectedRoute>
              <CodeEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notification-center"
          element={
            <ProtectedRoute>
              <NotificationCenter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account-info"
          element={
            <ProtectedRoute>
              <AccountInfo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account-settings"
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <SupportCenter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-list"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <StudentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-progress/:studentId"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <StudentProgress />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <AnalyticsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course-feedback/:courseId"
          element={
            <ProtectedRoute>
              <CourseFeedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/code-practice-management"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <CodePracticeManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/revenue-statistics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RevenueStatistics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/email-templates"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <EmailTemplateManager />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-management"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/permissions"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CourseApproval />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AnalyticsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RevenueStatistics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/comments"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SupportCenter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/courses"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/assignments"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <CodePracticeManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/students"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <StudentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/comments"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <SupportCenter />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
