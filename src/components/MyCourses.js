import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [myCourses, setMyCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Mock data - thay bằng API call thực tế
  useEffect(() => {
    setTimeout(() => {
      setMyCourses([
        {
          id: 1,
          title: "JavaScript Fundamentals",
          instructor: "Nguyễn Văn A",
          progress: 75,
          status: "in_progress",
          enrolledDate: "2024-09-15",
          lastAccessed: "2024-10-01",
          totalLessons: 20,
          completedLessons: 15,
          nextLesson: "Bài 16: Async/Await",
          certificate: false,
          image: "🚀",
          paymentStatus: "paid",
        },
        {
          id: 2,
          title: "React Development",
          instructor: "Trần Thị B",
          progress: 100,
          status: "completed",
          enrolledDate: "2024-08-01",
          lastAccessed: "2024-09-30",
          totalLessons: 18,
          completedLessons: 18,
          nextLesson: null,
          certificate: true,
          image: "⚛️",
          paymentStatus: "paid",
        },
        {
          id: 3,
          title: "Python for Beginners",
          instructor: "Lê Văn C",
          progress: 0,
          status: "enrolled",
          enrolledDate: "2024-10-01",
          lastAccessed: null,
          totalLessons: 25,
          completedLessons: 0,
          nextLesson: "Bài 1: Python Basics",
          certificate: false,
          image: "🐍",
          paymentStatus: "pending",
        },
        {
          id: 4,
          title: "Node.js Backend",
          instructor: "Phạm Văn D",
          progress: 30,
          status: "in_progress",
          enrolledDate: "2024-09-20",
          lastAccessed: "2024-09-28",
          totalLessons: 22,
          completedLessons: 7,
          nextLesson: "Bài 8: Express Middleware",
          certificate: false,
          image: "🟢",
          paymentStatus: "paid",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#4CAF50";
      case "in_progress":
        return "#FF9800";
      case "enrolled":
        return "#2196F3";
      default:
        return "#666";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "in_progress":
        return "Đang học";
      case "enrolled":
        return "Đã đăng ký";
      default:
        return status;
    }
  };

  const filteredCourses = myCourses.filter((course) => {
    if (filter === "all") return true;
    if (filter === "in_progress") return course.status === "in_progress";
    if (filter === "completed") return course.status === "completed";
    if (filter === "not_started") return course.status === "enrolled";
    if (filter === "pending_payment") return course.paymentStatus === "pending";
    return true;
  });

  if (loading) {
    return (
      <div className="main-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div>🔄 Đang tải khóa học của bạn...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      {/* Header */}
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: "0 0 0.5rem 0" }}>🎓 Khóa học của tôi</h1>
        <p style={{ margin: 0, color: "#666" }}>
          Quản lý và tiếp tục học tập các khóa học đã đăng ký
        </p>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            background: "white",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {[
            { key: "all", label: "Tất cả", count: myCourses.length },
            {
              key: "in_progress",
              label: "Đang học",
              count: myCourses.filter((c) => c.status === "in_progress").length,
            },
            {
              key: "completed",
              label: "Hoàn thành",
              count: myCourses.filter((c) => c.status === "completed").length,
            },
            {
              key: "not_started",
              label: "Chưa bắt đầu",
              count: myCourses.filter((c) => c.status === "enrolled").length,
            },
            {
              key: "pending_payment",
              label: "Chờ thanh toán",
              count: myCourses.filter((c) => c.paymentStatus === "pending")
                .length,
            },
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              style={{
                padding: "0.5rem 1rem",
                border:
                  filter === filterOption.key
                    ? "2px solid #667eea"
                    : "2px solid #e2e8f0",
                borderRadius: "5px",
                background: filter === filterOption.key ? "#667eea" : "white",
                color: filter === filterOption.key ? "white" : "#333",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: filter === filterOption.key ? "bold" : "normal",
              }}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            style={{
              background: "white",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              overflow: "hidden",
              border:
                course.paymentStatus === "pending"
                  ? "2px solid #FF9800"
                  : "none",
            }}
          >
            {/* Course Image */}
            <div
              style={{
                height: "120px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                color: "white",
                position: "relative",
              }}
            >
              {course.image}
              {course.paymentStatus === "pending" && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#FF9800",
                    color: "white",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  Chờ thanh toán
                </div>
              )}
              {course.certificate && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "#4CAF50",
                    color: "white",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  🏆 Có chứng chỉ
                </div>
              )}
            </div>

            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
                {course.title}
              </h3>
              <p
                style={{
                  margin: "0 0 1rem 0",
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                👨‍🏫 {course.instructor}
              </p>

              {/* Progress Bar */}
              <div style={{ margin: "1rem 0" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.9rem", color: "#666" }}>
                    Tiến độ: {course.completedLessons}/{course.totalLessons} bài
                  </span>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      color: getStatusColor(course.status),
                    }}
                  >
                    {course.progress}%
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "#e2e8f0",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: getStatusColor(course.status),
                      width: `${course.progress}%`,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>

              {/* Status and Next Lesson */}
              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      padding: "0.2rem 0.6rem",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      background: getStatusColor(course.status),
                      color: "white",
                    }}
                  >
                    {getStatusText(course.status)}
                  </span>
                </div>
                {course.nextLesson && (
                  <p
                    style={{ margin: 0, fontSize: "0.9rem", color: "#667eea" }}
                  >
                    📚 Tiếp theo: {course.nextLesson}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {course.paymentStatus === "pending" ? (
                  <Link
                    to={`/payment/${course.id}`}
                    style={{
                      flex: 1,
                      padding: "0.8rem",
                      background: "#FF9800",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "5px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    💳 Thanh toán ngay
                  </Link>
                ) : (
                  <Link
                    to={`/course/${course.id}`}
                    style={{
                      flex: 1,
                      padding: "0.8rem",
                      background: "#667eea",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "5px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {course.status === "completed"
                      ? "📖 Ôn tập lại"
                      : "▶️ Tiếp tục học"}
                  </Link>
                )}
                {course.certificate && (
                  <button
                    onClick={() => alert("Tải chứng chỉ...")}
                    style={{
                      padding: "0.8rem",
                      background: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    🏆
                  </button>
                )}
              </div>

              {/* Metadata */}
              <div
                style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#666" }}
              >
                <p style={{ margin: 0 }}>
                  📅 Đăng ký:{" "}
                  {new Date(course.enrolledDate).toLocaleDateString("vi-VN")}
                </p>
                {course.lastAccessed && (
                  <p style={{ margin: 0 }}>
                    🕒 Học lần cuối:{" "}
                    {new Date(course.lastAccessed).toLocaleDateString("vi-VN")}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div
          style={{
            background: "white",
            padding: "3rem",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📚</div>
          <h3>Chưa có khóa học nào</h3>
          <p style={{ color: "#666", marginBottom: "2rem" }}>
            {filter === "all"
              ? "Bạn chưa đăng ký khóa học nào. Hãy khám phá các khóa học thú vị!"
              : `Không có khóa học nào trong danh mục "${
                  [
                    { key: "in_progress", label: "Đang học" },
                    { key: "completed", label: "Hoàn thành" },
                    { key: "not_started", label: "Chưa bắt đầu" },
                    { key: "pending_payment", label: "Chờ thanh toán" },
                  ].find((f) => f.key === filter)?.label
                }"`}
          </p>
          <Link
            to="/courses"
            style={{
              padding: "1rem 2rem",
              background: "#667eea",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            🔍 Khám phá khóa học
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
