import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { role, userInfo } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);

  const getStats = () => {
    const totalCourses = courses.length;
    const totalStudents = courses.reduce(
      (sum, course) => sum + course.students,
      0
    );
    const totalInstructors = [
      ...new Set(courses.map((course) => course.instructor)),
    ].length;

    return { totalCourses, totalStudents, totalInstructors };
  };

  const { totalCourses, totalStudents, totalInstructors } = getStats();

  const getDashboardContent = () => {
    switch (role) {
      case "admin":
        return (
          <div>
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
                  {userInfo?.email} • Dashboard Quản trị viên
                </p>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{totalCourses}</div>
                <div className="stat-label">Tổng khóa học</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{totalStudents}</div>
                <div className="stat-label">Tổng học viên</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{totalInstructors}</div>
                <div className="stat-label">Giảng viên</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24</div>
                <div className="stat-label">Hoạt động hôm nay</div>
              </div>
            </div>

            <div className="dashboard">
              <div className="card">
                <h3>🎯 Quản lý hệ thống</h3>
                <p>
                  Theo dõi và quản lý toàn bộ hệ thống học tập trực tuyến. Xem
                  báo cáo, thống kê và điều hành các hoạt động.
                </p>
              </div>
              <div className="card">
                <h3>👥 Quản lý người dùng</h3>
                <p>
                  Quản lý tài khoản giảng viên và học viên. Phân quyền, theo dõi
                  hoạt động và hỗ trợ người dùng.
                </p>
              </div>
              <div className="card">
                <h3>📊 Báo cáo & Thống kê</h3>
                <p>
                  Xem các báo cáo chi tiết về tiến độ học tập, hiệu quả khóa học
                  và phản hồi từ người học.
                </p>
              </div>
            </div>
          </div>
        );

      case "teacher":
        return (
          <div>
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
                  Xin chào {userInfo?.fullName}! 📚
                </h2>
                <p style={{ margin: "0 0 0.3rem 0", color: "#666" }}>
                  {userInfo?.email} • Dashboard Giảng viên
                </p>
                {userInfo?.subjects && (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {userInfo.subjects.map((subject) => (
                      <span
                        key={subject}
                        style={{
                          background: "#667eea",
                          color: "white",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">3</div>
                <div className="stat-label">Khóa học đang dạy</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">156</div>
                <div className="stat-label">Học viên</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">8</div>
                <div className="stat-label">Bài tập chờ chấm</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">4.8</div>
                <div className="stat-label">Đánh giá trung bình</div>
              </div>
            </div>

            <div className="dashboard">
              <div className="card">
                <h3>📚 Quản lý khóa học</h3>
                <p>
                  Tạo và quản lý nội dung khóa học của bạn. Thêm bài học, bài
                  tập và theo dõi tiến độ học viên.
                </p>
              </div>
              <div className="card">
                <h3>👨‍🎓 Học viên của tôi</h3>
                <p>
                  Theo dõi tiến độ học tập của học viên, chấm bài và đưa ra phản
                  hồi để hỗ trợ quá trình học.
                </p>
              </div>
              <div className="card">
                <h3>📝 Bài tập & Kiểm tra</h3>
                <p>
                  Tạo và quản lý bài tập, đề kiểm tra. Xem kết quả và thống kê
                  hiệu suất học tập.
                </p>
              </div>
            </div>
          </div>
        );

      case "student":
        return (
          <div>
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
                  Chúc bạn học tập vui vẻ, {userInfo?.fullName}! 🎓
                </h2>
                <p style={{ margin: "0 0 0.3rem 0", color: "#666" }}>
                  {userInfo?.email} • Dashboard Học viên
                </p>
                {userInfo?.level && (
                  <div
                    style={{
                      background:
                        userInfo.level === "Beginner"
                          ? "#4CAF50"
                          : userInfo.level === "Intermediate"
                          ? "#FF9800"
                          : "#F44336",
                      color: "white",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      display: "inline-block",
                      marginTop: "0.5rem",
                    }}
                  >
                    Level: {userInfo.level}
                  </div>
                )}
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">5</div>
                <div className="stat-label">Khóa học đã đăng ký</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">78%</div>
                <div className="stat-label">Tiến độ hoàn thành</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">12</div>
                <div className="stat-label">Bài tập đã hoàn thành</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">245</div>
                <div className="stat-label">Điểm tích lũy</div>
              </div>
            </div>

            <div className="dashboard">
              <div className="card">
                <h3>📖 Khóa học của tôi</h3>
                <p>
                  Tiếp tục học các khóa học đã đăng ký. Theo dõi tiến độ và hoàn
                  thành các bài học.
                </p>
              </div>
              <div className="card">
                <h3>🎯 Mục tiêu học tập</h3>
                <p>
                  Đặt và theo dõi các mục tiêu học tập cá nhân. Xem thống kê
                  tiến độ và thành tích đạt được.
                </p>
              </div>
              <div className="card">
                <h3>🏆 Thành tích</h3>
                <p>
                  Xem các chứng chỉ đã đạt được, điểm số và thứ hạng trong các
                  khóa học đã tham gia.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Dashboard không xác định</div>;
    }
  };

  return <div className="main-container">{getDashboardContent()}</div>;
};

export default Dashboard;
