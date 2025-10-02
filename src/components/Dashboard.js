import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { role, userInfo } = useSelector((state) => state.auth);

  return (
    <div className="main-container">
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ fontSize: "3rem" }}>{userInfo?.avatar}</div>
        <div>
          <h2 style={{ margin: "0 0 0.5rem 0" }}>
            Chào mừng trở lại, {userInfo?.fullName}! 👋
          </h2>
          <p style={{ margin: 0, color: "#666" }}>
            {userInfo?.email} • Dashboard{" "}
            {role === "admin"
              ? "Quản trị viên"
              : role === "teacher"
              ? "Giảng viên"
              : "Học viên"}
          </p>
        </div>
      </div>

      {/* Quick Search Bar (cho tất cả roles) */}
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="🔍 Tìm kiếm khóa học, giảng viên, chủ đề..."
            onClick={() => (window.location.href = "/search")}
            style={{
              width: "100%",
              padding: "1rem 3rem 1rem 1rem",
              border: "2px solid #e1e5e9",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              background: "#f8f9fa",
            }}
            readOnly
          />
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.2rem",
              color: "#667eea",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "/search")}
          >
            🔍
          </div>
        </div>
      </div>

      <div className="dashboard">
        {role === "admin" && (
          <>
            <div
              className="card"
              onClick={() => (window.location.href = "/admin/users")}
              style={{ cursor: "pointer" }}
            >
              <h3>👥 Quản lý người dùng</h3>
              <p>
                Tạo tài khoản người hỗ trợ, kiểm duyệt viên. Thêm, sửa, xóa,
                khóa tài khoản.
              </p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/admin/permissions")}
              style={{ cursor: "pointer" }}
            >
              <h3>� Quản lý quyền</h3>
              <p>Thêm, sửa, xóa quyền cho các tài khoản hệ thống.</p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/admin/courses")}
              style={{ cursor: "pointer" }}
            >
              <h3>✅ Duyệt khóa học</h3>
              <p>Kiểm duyệt và phê duyệt các khóa học mới từ giảng viên.</p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/admin/analytics")}
              style={{ cursor: "pointer" }}
            >
              <h3>📊 Thống kê & Báo cáo</h3>
              <p>Xem báo cáo doanh thu, lịch sử hành động người dùng.</p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/admin/payments")}
              style={{ cursor: "pointer" }}
            >
              <h3>💳 Quản lý giao dịch</h3>
              <p>Theo dõi tất cả giao dịch thanh toán, biên lai điện tử.</p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/admin/comments")}
              style={{ cursor: "pointer" }}
            >
              <h3>💬 Kiểm duyệt bình luận</h3>
              <p>Ẩn, gỡ hoặc khóa thread bình luận vi phạm.</p>
            </div>
          </>
        )}

        {role === "teacher" && (
          <>
            <div
              className="card"
              onClick={() => (window.location.href = "/teacher/courses")}
              style={{ cursor: "pointer" }}
            >
              <h3>📚 Quản lý khóa học</h3>
              <p>Tạo, chỉnh sửa khóa học và nội dung bài học.</p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/teacher/assignments")}
              style={{ cursor: "pointer" }}
            >
              <h3>❓ Tạo bài tập & Quiz</h3>
              <p>Tạo các bài kiểm tra, quiz và bài tập coding cho học viên.</p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/teacher/students")}
              style={{ cursor: "pointer" }}
            >
              <h3>👨‍🎓 Theo dõi học viên</h3>
              <p>Xem tiến độ học tập của tất cả học viên trong khóa học.</p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/teacher/comments")}
              style={{ cursor: "pointer" }}
            >
              <h3>💬 Quản lý thảo luận</h3>
              <p>Trả lời câu hỏi và quản lý bình luận trong bài học.</p>
            </div>
          </>
        )}

        {role === "student" && (
          <>
            <div
              className="card"
              onClick={() => (window.location.href = "/courses")}
              style={{ cursor: "pointer" }}
            >
              <h3>📚 Danh sách khóa học</h3>
              <p>Xem tất cả khóa học và đăng ký khóa học mới.</p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/my-courses")}
              style={{ cursor: "pointer" }}
            >
              <h3>🎓 Khóa học của tôi</h3>
              <p>Khóa học đã đăng ký và tiếp tục học tập.</p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/practice")}
              style={{ cursor: "pointer" }}
            >
              <h3>💻 Luyện tập coding</h3>
              <p>Thực hành lập trình với các bài tập đa ngôn ngữ.</p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/progress")}
              style={{ cursor: "pointer" }}
            >
              <h3>📊 Tiến độ học tập</h3>
              <p>Theo dõi tiến độ học tập của bạn trong từng khóa học.</p>
            </div>
            <div
              className="card"
              onClick={() => (window.location.href = "/feedback")}
              style={{ cursor: "pointer" }}
            >
              <h3>💭 Đánh giá khóa học</h3>
              <p>Chia sẻ feedback về khóa học và giảng viên.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
