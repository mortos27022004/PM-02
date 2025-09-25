import React from "react";
import { useSelector } from "react-redux";

const TeacherDashboard = () => {
  const { courses } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);

  // Mock data for teacher's courses (in a real app, this would be filtered by teacher)
  const teacherCourses = courses.slice(0, 2); // Simulate teacher having 2 courses
  const totalStudents = teacherCourses.reduce(
    (sum, course) => sum + course.students,
    0
  );

  return (
    <div className="main-container">
      <h2>👨‍🏫 Dashboard Giảng viên</h2>

      {/* Teacher Statistics */}
      <div className="stats-grid" style={{ marginBottom: "3rem" }}>
        <div className="stat-card">
          <div className="stat-number">{teacherCourses.length}</div>
          <div className="stat-label">Khóa học đang dạy</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalStudents}</div>
          <div className="stat-label">Tổng học viên</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">15</div>
          <div className="stat-label">Bài tập chờ chấm</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">4.7</div>
          <div className="stat-label">Đánh giá trung bình</div>
        </div>
      </div>

      {/* Teaching Tools */}
      <div className="dashboard">
        <div className="card">
          <h3>📚 Quản lý Nội dung</h3>
          <p>Tạo và chỉnh sửa bài học, tài liệu học tập</p>
          <div style={{ marginTop: "1rem" }}>
            <div>• Bài học đã tạo: 45</div>
            <div>• Video bài giảng: 23</div>
            <div>• Tài liệu tham khảo: 18</div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Tạo bài học mới
          </button>
        </div>

        <div className="card">
          <h3>📝 Bài tập & Đánh giá</h3>
          <p>Quản lý bài tập và theo dõi kết quả học viên</p>
          <div style={{ marginTop: "1rem" }}>
            <div>• Bài tập đã giao: 28</div>
            <div>• Chờ chấm điểm: 15</div>
            <div>• Đã hoàn thành: 13</div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Xem bài tập
          </button>
        </div>

        <div className="card">
          <h3>👥 Quản lý Lớp học</h3>
          <p>Theo dõi tiến độ và tương tác với học viên</p>
          <div style={{ marginTop: "1rem" }}>
            <div>• Học viên hoạt động: {totalStudents}</div>
            <div>• Câu hỏi chờ trả lời: 7</div>
            <div>• Thảo luận mới: 12</div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Xem lớp học
          </button>
        </div>

        <div className="card">
          <h3>📊 Thống kê & Báo cáo</h3>
          <p>Phân tích hiệu quả giảng dạy và học tập</p>
          <div style={{ marginTop: "1rem" }}>
            <div>• Tỷ lệ hoàn thành: 82%</div>
            <div>• Điểm trung bình: 7.8/10</div>
            <div>• Phản hồi tích cực: 94%</div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Xem báo cáo chi tiết
          </button>
        </div>
      </div>

      {/* My Courses */}
      <div style={{ marginTop: "3rem" }}>
        <h3>Khóa học của tôi</h3>
        <div className="course-grid">
          {teacherCourses.map((course) => (
            <div
              key={course.id}
              className="course-card"
              style={{ border: "2px solid #667eea" }}
            >
              <div
                className="course-image"
                style={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                }}
              >
                📚 {course.title}
              </div>
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>

                <div className="course-meta" style={{ marginTop: "1rem" }}>
                  <div>👥 {course.students} học viên</div>
                  <div>📚 {course.lessons} bài học</div>
                </div>

                <div
                  style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}
                >
                  <button className="btn btn-primary">Quản lý khóa học</button>
                  <button className="btn btn-secondary">Xem học viên</button>
                </div>

                {/* Progress indicator */}
                <div style={{ marginTop: "1rem" }}>
                  <div
                    style={{
                      background: "#e2e8f0",
                      height: "8px",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        background: "#4CAF50",
                        height: "100%",
                        width: "75%",
                        borderRadius: "4px",
                      }}
                    ></div>
                  </div>
                  <small style={{ color: "#666" }}>Tiến độ khóa học: 75%</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ marginTop: "3rem" }}>
        <h3>Hoạt động gần đây</h3>
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "1.5rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              paddingBottom: "1rem",
              borderBottom: "1px solid #e2e8f0",
              marginBottom: "1rem",
            }}
          >
            <strong>Nguyễn Văn A</strong> đã nộp bài tập "JavaScript Basics"
            <div style={{ color: "#666", fontSize: "0.9rem" }}>2 giờ trước</div>
          </div>
          <div
            style={{
              paddingBottom: "1rem",
              borderBottom: "1px solid #e2e8f0",
              marginBottom: "1rem",
            }}
          >
            <strong>Trần Thị B</strong> đã đặt câu hỏi trong khóa "React
            Development"
            <div style={{ color: "#666", fontSize: "0.9rem" }}>4 giờ trước</div>
          </div>
          <div
            style={{
              paddingBottom: "1rem",
              borderBottom: "1px solid #e2e8f0",
              marginBottom: "1rem",
            }}
          >
            <strong>Lê Văn C</strong> đã hoàn thành bài học "Node.js
            Introduction"
            <div style={{ color: "#666", fontSize: "0.9rem" }}>
              1 ngày trước
            </div>
          </div>
          <div>
            <strong>Phạm Thị D</strong> đã đánh giá khóa học 5 sao
            <div style={{ color: "#666", fontSize: "0.9rem" }}>
              2 ngày trước
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
