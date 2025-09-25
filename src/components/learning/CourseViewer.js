import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, registeredCourses, enrolledCourses } = useSelector(
    (state) => state.courses
  );
  const { userInfo } = useSelector((state) => state.auth);
  const { progress } = useSelector((state) => state.analytics);

  const course = courses.find((c) => c.id === parseInt(courseId));
  const [selectedChapter, setSelectedChapter] = useState(0);

  // Mock course structure with chapters and lessons
  const courseStructure = {
    chapters: [
      {
        id: 1,
        title: "Chương 1: Giới thiệu cơ bản",
        lessons: [
          {
            id: "lesson_1_1",
            title: "initializeVector",
            type: "code",
            duration: "15 phút",
            completed: false,
            description: "Học cách khởi tạo vector trong C++",
          },
          {
            id: "lesson_1_2",
            title: "Các phép toán với Vector",
            type: "theory",
            duration: "10 phút",
            completed: false,
            description: "Tìm hiểu các phép toán cơ bản với vector",
          },
          {
            id: "lesson_1_3",
            title: "Bài tập: Sum Vector",
            type: "code",
            duration: "20 phút",
            completed: false,
            description: "Viết hàm tính tổng các phần tử trong vector",
          },
        ],
      },
      {
        id: 2,
        title: "Chương 2: Vector nâng cao",
        lessons: [
          {
            id: "lesson_2_1",
            title: "Vector 2D",
            type: "code",
            duration: "25 phút",
            completed: false,
            description: "Làm việc với vector 2 chiều",
          },
          {
            id: "lesson_2_2",
            title: "Algorithms với Vector",
            type: "theory",
            duration: "15 phút",
            completed: false,
            description: "Sử dụng các thuật toán STL với vector",
          },
        ],
      },
      {
        id: 3,
        title: "Chương 3: Dự án thực hành",
        lessons: [
          {
            id: "lesson_3_1",
            title: "Dự án: Quản lý danh sách",
            type: "project",
            duration: "45 phút",
            completed: false,
            description: "Xây dựng ứng dụng quản lý danh sách với vector",
          },
        ],
      },
    ],
  };

  const userProgress = progress.find(
    (p) => p.userId === userInfo?.username && p.courseId === parseInt(courseId)
  );

  // Check if user is enrolled (can access content)
  const isUserEnrolled = enrolledCourses.includes(parseInt(courseId));

  // Check if user is registered but not paid
  const userRegistration = registeredCourses.find(
    (reg) =>
      reg.courseId === parseInt(courseId) && reg.userId === userInfo?.username
  );

  const getButtonStatus = () => {
    if (isUserEnrolled) {
      return { text: "📚 Tiếp tục học", action: "continue", color: "#10b981" };
    }

    if (userRegistration) {
      if (userRegistration.paymentStatus === "completed") {
        return { text: "📚 Vào học ngay", action: "start", color: "#10b981" };
      } else if (userRegistration.paymentStatus === "pending") {
        return {
          text: "💳 Thanh toán để học",
          action: "payment",
          color: "#f59e0b",
        };
      }
    }

    if (course?.price === 0) {
      return { text: "📚 Vào học ngay", action: "register", color: "#10b981" };
    } else {
      return { text: "🎓 Đăng ký ngay", action: "register", color: "#667eea" };
    }
  };

  const buttonStatus = getButtonStatus();

  const getCompletedLessons = () => {
    return userProgress?.completedLessons || [];
  };

  const getTotalLessons = () => {
    return courseStructure.chapters.reduce(
      (total, chapter) => total + chapter.lessons.length,
      0
    );
  };

  const getCompletionPercentage = () => {
    const completed = getCompletedLessons().length;
    const total = getTotalLessons();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const isLessonCompleted = (lessonId) => {
    return getCompletedLessons().includes(lessonId);
  };

  const getLessonIcon = (lesson) => {
    if (isLessonCompleted(lesson.id)) {
      return "✅";
    }

    switch (lesson.type) {
      case "code":
        return "💻";
      case "theory":
        return "📖";
      case "quiz":
        return "❓";
      case "project":
        return "🚀";
      default:
        return "📄";
    }
  };

  const handleLessonClick = (lesson) => {
    if (!isUserEnrolled && !(userRegistration?.paymentStatus === "completed")) {
      alert("Bạn cần đăng ký và thanh toán để truy cập bài học này!");
      return;
    }

    if (lesson.type === "code") {
      navigate(`/learning/${courseId}/${lesson.id}`);
    } else {
      // For theory lessons, show content directly
      alert(`Mở bài học lý thuyết: ${lesson.title}`);
    }
  };

  const handleStartLearning = () => {
    if (buttonStatus.action === "payment") {
      navigate(`/payment/${courseId}`);
    } else if (buttonStatus.action === "register") {
      // Register for the course first
      navigate("/courses"); // Let them register from course list
    } else {
      // Start with first lesson if enrolled
      const firstLesson = courseStructure.chapters[0]?.lessons[0];
      if (firstLesson) {
        handleLessonClick(firstLesson);
      }
    }
  };

  if (!course) {
    return (
      <div className="main-container">
        <div className="card">
          <h3>❌ Không tìm thấy khóa học</h3>
          <button
            onClick={() => navigate("/courses")}
            className="btn btn-primary"
          >
            Quay lại danh sách khóa học
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "2rem 0",
        }}
      >
        <div className="main-container">
          <button
            onClick={() => navigate("/courses")}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            ← Quay lại danh sách khóa học
          </button>

          <h1 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>
            {course.title}
          </h1>
          <p style={{ margin: "0 0 1rem 0", opacity: 0.9 }}>
            {course.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              marginTop: "1.5rem",
            }}
          >
            <div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {getCompletionPercentage()}%
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Hoàn thành</div>
            </div>
            <div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {getCompletedLessons().length}/{getTotalLessons()}
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Bài học</div>
            </div>
            <div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {course.instructor}
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Giảng viên</div>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <button
              onClick={handleStartLearning}
              style={{
                background: buttonStatus.color,
                color: "white",
                border: "none",
                padding: "0.8rem 2rem",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: `0 4px 12px ${buttonStatus.color}40`,
              }}
            >
              {buttonStatus.text}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="main-container"
        style={{ marginTop: "-1rem", marginBottom: "2rem" }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "1.5rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          {/* Registration Status */}
          {!isUserEnrolled && (
            <div
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor:
                  userRegistration?.paymentStatus === "pending"
                    ? "#fef3c7"
                    : "#f3f4f6",
                border:
                  userRegistration?.paymentStatus === "pending"
                    ? "2px solid #f59e0b"
                    : "2px solid #e5e7eb",
              }}
            >
              {userRegistration?.paymentStatus === "pending" ? (
                <div style={{ color: "#92400e" }}>
                  <strong>⏳ Chờ thanh toán</strong>
                  <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem" }}>
                    Bạn đã đăng ký khóa học này nhưng chưa thanh toán.
                    <button
                      onClick={() => navigate(`/payment/${courseId}`)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#f59e0b",
                        textDecoration: "underline",
                        cursor: "pointer",
                        marginLeft: "0.5rem",
                      }}
                    >
                      Thanh toán ngay
                    </button>
                  </p>
                </div>
              ) : (
                <div style={{ color: "#374151" }}>
                  <strong>💡 Chưa đăng ký</strong>
                  <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem" }}>
                    Bạn chưa đăng ký khóa học này. Vui lòng đăng ký để truy cập
                    nội dung.
                  </p>
                </div>
              )}
            </div>
          )}

          <div
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.9rem",
              color: "#666",
            }}
          >
            Tiến độ khóa học
          </div>
          <div
            style={{
              backgroundColor: "#e5e7eb",
              height: "12px",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: isUserEnrolled ? "#4ade80" : "#9ca3af",
                height: "100%",
                width: `${getCompletionPercentage()}%`,
                borderRadius: "6px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="main-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "2rem",
          }}
        >
          {/* Sidebar - Chapter Navigation */}
          <div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "1.5rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                position: "sticky",
                top: "2rem",
              }}
            >
              <h3 style={{ margin: "0 0 1rem 0" }}>📚 Nội dung khóa học</h3>

              {courseStructure.chapters.map((chapter, index) => (
                <div key={chapter.id} style={{ marginBottom: "1rem" }}>
                  <button
                    onClick={() => setSelectedChapter(index)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background:
                        selectedChapter === index ? "#667eea" : "#f8f9fa",
                      color: selectedChapter === index ? "white" : "#333",
                      border: "none",
                      padding: "0.8rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    {chapter.title}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Lessons */}
          <div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "2rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ margin: "0 0 1.5rem 0" }}>
                {courseStructure.chapters[selectedChapter]?.title}
              </h2>

              <div style={{ display: "grid", gap: "1rem" }}>
                {courseStructure.chapters[selectedChapter]?.lessons.map(
                  (lesson, index) => (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "1.5rem",
                        border: "2px solid #e5e7eb",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        backgroundColor: isLessonCompleted(lesson.id)
                          ? "#f0fdf4"
                          : "white",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <div style={{ fontSize: "2rem", marginRight: "1rem" }}>
                        {getLessonIcon(lesson)}
                      </div>

                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
                          {lesson.title}
                        </h4>
                        <p
                          style={{
                            margin: "0 0 0.5rem 0",
                            color: "#666",
                            fontSize: "0.9rem",
                          }}
                        >
                          {lesson.description}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            fontSize: "0.8rem",
                            color: "#888",
                          }}
                        >
                          <span>⏱️ {lesson.duration}</span>
                          <span>
                            📋{" "}
                            {lesson.type === "code" ? "Lập trình" : "Lý thuyết"}
                          </span>
                        </div>
                      </div>

                      <div style={{ marginLeft: "1rem" }}>
                        {isLessonCompleted(lesson.id) ? (
                          <span
                            style={{ color: "#10b981", fontWeight: "bold" }}
                          >
                            ✅ Hoàn thành
                          </span>
                        ) : (
                          <span
                            style={{ color: "#667eea", fontWeight: "bold" }}
                          >
                            ▶️ Bắt đầu
                          </span>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
