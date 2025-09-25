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

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleUnenroll = (courseId) => {
    dispatch(unenrollCourse(courseId));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
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
    switch (filterType) {
      case "free":
        filtered = filtered.filter((course) => course.price === 0);
        break;
      case "paid":
        filtered = filtered.filter((course) => course.price > 0);
        break;
      case "enrolled":
        filtered = filtered.filter((course) => isUserEnrolled(course.id));
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    // Apply sorting
    const sortedCourses = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "price":
          return a.price - b.price;
        case "level":
          const levelOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          return levelOrder[a.level] - levelOrder[b.level];
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return sortedCourses;
  };

  const displayedCourses = getFilteredAndSortedCourses();

  return (
    <div className="main-container" style={{ padding: "2rem 0" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ margin: "0 0 1rem 0", color: "#333" }}>
          📚 Danh sách khóa học
        </h1>
        <p style={{ color: "#666", margin: "0" }}>
          Khám phá và tham gia các khóa học chất lượng cao từ đội ngũ giảng viên
          kinh nghiệm
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="🔍 Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>

          {/* Filter Dropdown */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                padding: "0.8rem",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "1rem",
                background: "white",
                cursor: "pointer",
              }}
            >
              <option value="all">🎯 Tất cả</option>
              <option value="free">🆓 Miễn phí</option>
              <option value="paid">💰 Có phí</option>
              <option value="enrolled">✅ Đã đăng ký</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "0.8rem",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "1rem",
                background: "white",
                cursor: "pointer",
              }}
            >
              <option value="title">📝 Tên khóa học</option>
              <option value="price">💵 Giá</option>
              <option value="level">📊 Độ khó</option>
              <option value="rating">⭐ Đánh giá</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div style={{ marginBottom: "1.5rem", color: "#666" }}>
        Hiển thị <strong>{displayedCourses.length}</strong> khóa học
        {searchTerm && (
          <span>
            {" "}
            cho từ khóa "<strong>{searchTerm}</strong>"
          </span>
        )}
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

      {/* No Results Message */}
      {displayedCourses.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
            Không tìm thấy khóa học nào
          </h3>
          <p style={{ margin: "0", color: "#666" }}>
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để xem thêm kết quả
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseList;
