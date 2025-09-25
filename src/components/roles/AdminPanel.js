import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCourse } from "../../redux/courseSlice";
import UserManagement from "../admin/UserManagement";
import CourseApproval from "../admin/CourseApproval";

const AdminPanel = () => {
  const { courses } = useSelector((state) => state.courses);
  const { statistics } = useSelector((state) => state.analytics);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
      dispatch(deleteCourse(courseId));
    }
  };

  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0
  );
  const totalInstructors = [
    ...new Set(courses.map((course) => course.instructor)),
  ].length;

  const pendingCourses = courses.filter(
    (course) => course.status === "pending_review"
  ).length;

  // Render different sections based on activeSection
  if (activeSection === "users") {
    return <UserManagement />;
  }

  if (activeSection === "course-approval") {
    return <CourseApproval />;
  }

  return (
    <div className="main-container">
      <h2>🛠️ Bảng điều khiển Quản trị viên</h2>

      {/* Navigation Menu */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {[
          { key: "dashboard", label: "📊 Tổng quan", icon: "📊" },
          { key: "users", label: "👥 Quản lý người dùng", icon: "👥" },
          {
            key: "course-approval",
            label: "📋 Duyệt khóa học",
            icon: "📋",
            badge: pendingCourses,
          },
        ].map((item) => (
          <button
            key={item.key}
            className={`btn ${
              activeSection === item.key ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveSection(item.key)}
            style={{ position: "relative" }}
          >
            {item.label}
            {item.badge && item.badge > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Statistics Overview */}
      <div className="stats-grid" style={{ marginBottom: "3rem" }}>
        <div className="stat-card">
          <div className="stat-number">{courses.length}</div>
          <div className="stat-label">Tổng khóa học</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalStudents}</div>
          <div className="stat-label">Tổng học viên</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalInstructors}</div>
          <div className="stat-label">Giảng viên hoạt động</div>
        </div>
        <div
          className="stat-card"
          style={{ cursor: "pointer" }}
          onClick={() => setActiveSection("course-approval")}
        >
          <div
            className="stat-number"
            style={{ color: pendingCourses > 0 ? "#f59e0b" : "#10b981" }}
          >
            {pendingCourses}
          </div>
          <div className="stat-label">Khóa học chờ duyệt</div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="dashboard">
        <div
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => setActiveSection("users")}
        >
          <h3>👥 Quản lý Người dùng</h3>
          <p>Tạo, sửa, xóa, khóa tài khoản người dùng trong hệ thống</p>
          <div style={{ marginTop: "1rem" }}>
            <div>• Quản trị viên: 3</div>
            <div>• Giảng viên: {totalInstructors}</div>
            <div>• Học viên: {totalStudents}</div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Quản lý tài khoản →
          </button>
        </div>

        <div
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => setActiveSection("course-approval")}
        >
          <h3>� Duyệt Khóa học</h3>
          <p>Kiểm duyệt và phê duyệt khóa học do giảng viên tạo</p>
          <div style={{ marginTop: "1rem" }}>
            <div>
              • Chờ duyệt:{" "}
              <strong style={{ color: "#f59e0b" }}>{pendingCourses}</strong>
            </div>
            <div>
              • Đã phê duyệt:{" "}
              {courses.filter((c) => c.status === "published").length}
            </div>
            <div>
              • Từ chối: {courses.filter((c) => c.status === "rejected").length}
            </div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Xem khóa học chờ duyệt →
          </button>
        </div>

        <div className="card">
          <h3>📊 Thống kê & Báo cáo</h3>
          <p>Xem báo cáo chi tiết về hoạt động và doanh thu</p>
          <div style={{ marginTop: "1rem" }}>
            <div>
              • Doanh thu tháng này:{" "}
              {statistics?.totalRevenue?.toLocaleString() || "12,750,000"}đ
            </div>
            <div>• Tỷ lệ hoàn thành: {statistics?.completionRate || 76.8}%</div>
            <div>
              • Đánh giá trung bình: {statistics?.averageRating || 4.6}/5⭐
            </div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Xem báo cáo chi tiết
          </button>
        </div>

        <div className="card">
          <h3>🔧 Quản lý Hệ thống</h3>
          <p>Cấu hình hệ thống, thông báo và bảo trì</p>
          <div style={{ marginTop: "1rem" }}>
            <div>• Phiên bản: v2.1.0</div>
            <div>• Uptime: 99.8%</div>
            <div>• Thông báo chờ gửi: 45</div>
          </div>
          <button className="btn btn-secondary" style={{ marginTop: "1rem" }}>
            Cài đặt hệ thống
          </button>
        </div>
      </div>

      {/* Course Management Table */}
      <div style={{ marginTop: "3rem" }}>
        <h3>Quản lý Khóa học Chi tiết</h3>
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "1.5rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                <th style={{ padding: "1rem", textAlign: "left" }}>Khóa học</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>
                  Giảng viên
                </th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Học viên</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>
                  Trạng thái
                </th>
                <th style={{ padding: "1rem", textAlign: "left" }}>
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.id}
                  style={{ borderBottom: "1px solid #e2e8f0" }}
                >
                  <td style={{ padding: "1rem" }}>
                    <strong>{course.title}</strong>
                    <br />
                    <small style={{ color: "#666" }}>
                      {course.description}
                    </small>
                  </td>
                  <td style={{ padding: "1rem" }}>{course.instructor}</td>
                  <td style={{ padding: "1rem" }}>{course.students}</td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        background: "#4CAF50",
                        color: "white",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                      }}
                    >
                      Hoạt động
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <button
                      className="btn btn-secondary"
                      style={{ marginRight: "0.5rem" }}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
