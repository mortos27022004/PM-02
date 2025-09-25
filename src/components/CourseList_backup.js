import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  enrollCourse,
  unenrollCourse,
  registerCourse,
} from "../redux/courseSlice";

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, enrolledCourses, registeredCourses } = useSelector(
    (state) => state.courses
  );
  const { userInfo, role } = useSelector((state) => state.auth);
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  const handleEnrollCourse = (courseId) => {
    dispatch(
      registerCourse({
        courseId: courseId,
        userId: userInfo?.username,
      })
    );

    // Navigate to course detail to show registration status
    navigate(`/course/${courseId}`);
  };

  const handleUnenroll = (courseId) => {
    dispatch(unenrollCourse(courseId));
  };

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const isUserEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId);
  };

  const isUserRegistered = (courseId) => {
    return registeredCourses.some(
      (reg) => reg.courseId === courseId && reg.userId === userInfo?.username
    );
  };

  const getUserRegistration = (courseId) => {
    return registeredCourses.find(
      (reg) => reg.courseId === courseId && reg.userId === userInfo?.username
    );
  };

  const getButtonStatus = (course) => {
    if (isUserEnrolled(course.id)) {
      return { text: "📚 Tiếp tục học", action: "continue", color: "#10b981" };
    }

    const registration = getUserRegistration(course.id);
    if (registration) {
      if (registration.paymentStatus === "completed") {
        return { text: "📚 Vào học ngay", action: "start", color: "#10b981" };
      } else if (registration.paymentStatus === "pending") {
        return { text: "💳 Thanh toán", action: "payment", color: "#f59e0b" };
      }
    }

    if (course.price === 0) {
      return { text: "📚 Vào học ngay", action: "register", color: "#10b981" };
    } else {
      return { text: "🎓 Đăng ký ngay", action: "register", color: "#667eea" };
    }
  };

  const getFilteredAndSortedCourses = () => {
    let filtered = courses.filter((course) => course.status === "published");

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType === "enrolled") {
      filtered = filtered.filter((course) => isUserEnrolled(course.id));
    } else if (filterType === "free") {
      filtered = filtered.filter((course) => course.price === 0);
    } else if (filterType === "paid") {
      filtered = filtered.filter((course) => course.price > 0);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "price":
          return a.price - b.price;
        case "students":
          return b.students - a.students;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const displayedCourses = getFilteredAndSortedCourses();

  return (
    <div className="main-container">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ color: "#333", marginBottom: "1rem" }}>
          🎓 Danh sách khóa học
        </h1>

        {/* Search and Filters */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "1rem",
            marginBottom: "2rem",
            padding: "1.5rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
          }}
        >
          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "0.8rem",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          />

          {/* Filter by Type */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: "0.8rem",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          >
            <option value="all">📚 Tất cả</option>
            <option value="enrolled">✅ Đã đăng ký</option>
            <option value="free">🆓 Miễn phí</option>
            <option value="paid">💰 Trả phí</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "0.8rem",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          >
            <option value="title">📝 Tên A-Z</option>
            <option value="price">💰 Giá thấp-cao</option>
            <option value="students">👥 Học viên nhiều</option>
            <option value="rating">⭐ Đánh giá cao</option>
          </select>

          {/* Results count */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#667eea",
              color: "white",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            📊 {displayedCourses.length} khóa học
          </div>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>
              {courses.filter((c) => c.status === "published").length}
            </h3>
            <p style={{ margin: 0, opacity: 0.9 }}>📚 Tổng khóa học</p>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
              color: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>
              {
                courses.filter((c) => c.price === 0 && c.status === "published")
                  .length
              }
            </h3>
            <p style={{ margin: 0, opacity: 0.9 }}>🆓 Miễn phí</p>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>
              {enrolledCourses.length}
            </h3>
            <p style={{ margin: 0, opacity: 0.9 }}>✅ Đã đăng ký</p>
          </div>

          {role === "teacher" && (
            <div
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>
                {
                  courses.filter((c) => c.instructor === userInfo?.fullName)
                    .length
                }
              </h3>
              <p style={{ margin: 0, opacity: 0.9 }}>🎯 Của tôi</p>
            </div>
          )}
        </div>
      </div>

      {/* Course Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "2rem",
        }}
      >
        {displayedCourses.map((course) => {
          const enrolled = isUserEnrolled(course.id);
          const buttonStatus = getButtonStatus(course);

          return (
            <div
              key={course.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                border: enrolled
                  ? "2px solid #10b981"
                  : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}
            >
              {/* Course Header */}
              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h3
                    style={{
                      margin: "0",
                      color: "#333",
                      fontSize: "1.2rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {course.title}
                  </h3>
                  {enrolled && (
                    <span
                      style={{
                        backgroundColor: "#10b981",
                        color: "white",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ✅ Đã đăng ký
                    </span>
                  )}
                </div>

                <p
                  style={{
                    margin: "0",
                    color: "#666",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  {course.description}
                </p>
              </div>

              {/* Course Meta */}
              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#f3f4f6",
                      color: "#374151",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    👨‍🏫 {course.instructor}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    📊 {course.level}
                  </span>
                  {course.rating && (
                    <span
                      style={{
                        backgroundColor: "#fef3c7",
                        color: "#d97706",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                      }}
                    >
                      ⭐ {course.rating}/5
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    fontSize: "0.8rem",
                    color: "#666",
                  }}
                >
                  <span>⏱️ {course.duration}</span>
                  <span>👥 {course.students} học viên</span>
                  <span>📚 {course.lessons} bài học</span>
                </div>
              </div>

              {/* Price */}
              <div style={{ marginBottom: "1rem" }}>
                {course.price === 0 ? (
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#10b981",
                    }}
                  >
                    🆓 Miễn phí
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#dc2626",
                    }}
                  >
                    💰 {course.price.toLocaleString("vi-VN")}đ
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {enrolled ? (
                  <div
                    style={{ display: "flex", gap: "0.5rem", width: "100%" }}
                  >
                    <button
                      onClick={() => handleViewCourse(course.id)}
                      style={{
                        flex: 1,
                        padding: "0.8rem",
                        backgroundColor: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "1rem",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#059669")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#10b981")
                      }
                    >
                      {buttonStatus.text}
                    </button>
                    <button
                      onClick={() => handleUnenroll(course.id)}
                      style={{
                        padding: "0.8rem",
                        backgroundColor: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#dc2626")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#ef4444")
                      }
                    >
                      ✖️
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleViewCourse(course.id)}
                      style={{
                        flex: 1,
                        padding: "0.8rem",
                        backgroundColor: "#f3f4f6",
                        color: "#374151",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#e5e7eb")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#f3f4f6")
                      }
                    >
                      👁️ Xem chi tiết
                    </button>
                    <button
                      onClick={() => {
                        if (buttonStatus.action === "payment") {
                          navigate(`/payment/${course.id}`);
                        } else {
                          handleEnrollCourse(course.id);
                        }
                      }}
                      style={{
                        flex: 2,
                        padding: "0.8rem",
                        backgroundColor: buttonStatus.color,
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      {buttonStatus.text}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {displayedCourses.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#666",
          }}
        >
          <h3>🔍 Không tìm thấy khóa học phù hợp</h3>
          <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;
