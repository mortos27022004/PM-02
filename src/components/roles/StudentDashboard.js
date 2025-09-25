import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { enrollCourse, unenrollCourse } from "../../redux/courseSlice";

const StudentDashboard = () => {
  const { courses, enrolledCourses } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleEnroll = (courseId) => {
    dispatch(enrollCourse(courseId));
  };

  const handleUnenroll = (courseId) => {
    dispatch(unenrollCourse(courseId));
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId);
  };

  const enrolledCoursesData = courses.filter((course) =>
    enrolledCourses.includes(course.id)
  );
  const availableCoursesData = courses.filter(
    (course) => !enrolledCourses.includes(course.id)
  );

  return (
    <div className="main-container">
      <h2>🎓 Dashboard Học viên</h2>

      {/* Student Statistics */}
      <div className="stats-grid" style={{ marginBottom: "3rem" }}>
        <div className="stat-card">
          <div className="stat-number">{enrolledCourses.length}</div>
          <div className="stat-label">Khóa học đã đăng ký</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">78%</div>
          <div className="stat-label">Tiến độ hoàn thành</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">15</div>
          <div className="stat-label">Bài tập đã hoàn thành</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">320</div>
          <div className="stat-label">Điểm tích lũy</div>
        </div>
      </div>

      {/* Learning Tools */}
      <div className="dashboard">
        <div className="card">
          <h3>📖 Học tập hôm nay</h3>
          <p>Tiếp tục với bài học đang dở và mục tiêu hôm nay</p>
          <div style={{ marginTop: "1rem" }}>
            <div>• Bài học cần hoàn thành: 3</div>
            <div>• Bài tập đã giao: 2</div>
            <div>• Mục tiêu hôm nay: 2 giờ học</div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Bắt đầu học
          </button>
        </div>

        <div className="card">
          <h3>🎯 Mục tiêu cá nhân</h3>
          <p>Theo dõi và đạt được mục tiêu học tập của bạn</p>
          <div style={{ marginTop: "1rem" }}>
            <div>• Hoàn thành khóa React: 80%</div>
            <div>• Học 20 giờ/tuần: 75%</div>
            <div>• Làm 5 project: 60%</div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Xem chi tiết
          </button>
        </div>

        <div className="card">
          <h3>🏆 Thành tích</h3>
          <p>Các chứng chỉ và thành tích đã đạt được</p>
          <div style={{ marginTop: "1rem" }}>
            <div>• Chứng chỉ hoàn thành: 2</div>
            <div>• Huy hiệu: 5</div>
            <div>• Xếp hạng: Top 10%</div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Xem thành tích
          </button>
        </div>

        <div className="card">
          <h3>💬 Cộng đồng</h3>
          <p>Tham gia thảo luận và học hỏi từ cộng đồng</p>
          <div style={{ marginTop: "1rem" }}>
            <div>• Câu hỏi đã đăng: 8</div>
            <div>• Câu trả lời: 12</div>
            <div>• Điểm uy tín: 45</div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Vào diễn đàn
          </button>
        </div>
      </div>

      {/* Enrolled Courses */}
      {enrolledCoursesData.length > 0 && (
        <div style={{ marginTop: "3rem" }}>
          <h3>Khóa học đang học ({enrolledCoursesData.length})</h3>
          <div className="course-grid">
            {enrolledCoursesData.map((course) => (
              <div
                key={course.id}
                className="course-card"
                style={{ border: "2px solid #4CAF50" }}
              >
                <div className="course-image" style={{ background: "#4CAF50" }}>
                  ✓ {course.title}
                </div>
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>

                  <div className="course-meta" style={{ marginTop: "1rem" }}>
                    <div>👨‍🏫 {course.instructor}</div>
                    <div>📚 {course.lessons} bài học</div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginTop: "1rem" }}>
                    <div
                      style={{
                        background: "#e2e8f0",
                        height: "10px",
                        borderRadius: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          background: "#4CAF50",
                          height: "100%",
                          width: `${Math.floor(Math.random() * 50) + 30}%`,
                          borderRadius: "5px",
                        }}
                      ></div>
                    </div>
                    <small style={{ color: "#666" }}>
                      Tiến độ: {Math.floor(Math.random() * 50) + 30}%
                    </small>
                  </div>

                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <button className="btn btn-primary">Tiếp tục học</button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleUnenroll(course.id)}
                    >
                      Hủy đăng ký
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Courses */}
      {availableCoursesData.length > 0 && (
        <div style={{ marginTop: "3rem" }}>
          <h3>Khóa học có thể đăng ký</h3>
          <div className="course-grid">
            {availableCoursesData.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-image">{course.title}</div>
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>

                  <div className="course-meta" style={{ marginTop: "1rem" }}>
                    <div>👨‍🏫 {course.instructor}</div>
                    <div>
                      <span
                        style={{
                          background:
                            course.level === "Beginner"
                              ? "#4CAF50"
                              : course.level === "Intermediate"
                              ? "#FF9800"
                              : "#F44336",
                          color: "white",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="course-meta" style={{ marginTop: "0.8rem" }}>
                    <div>👥 {course.students} học viên</div>
                    <div>📚 {course.lessons} bài học</div>
                  </div>

                  <div style={{ marginTop: "1rem" }}>
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      onClick={() => handleEnroll(course.id)}
                    >
                      Đăng ký học
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Schedule */}
      <div style={{ marginTop: "3rem" }}>
        <h3>Lịch học tuần này</h3>
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
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "1rem",
              textAlign: "center",
            }}
          >
            {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day, index) => (
              <div
                key={day}
                style={{
                  padding: "1rem",
                  borderRadius: "8px",
                  background: index === 2 ? "#667eea" : "#f8f9fa",
                  color: index === 2 ? "white" : "#333",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  {day}
                </div>
                {index === 2 && (
                  <div style={{ fontSize: "0.8rem" }}>
                    React Hooks
                    <br />
                    19:00 - 21:00
                  </div>
                )}
                {index === 4 && (
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>
                    JavaScript
                    <br />
                    20:00 - 22:00
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
