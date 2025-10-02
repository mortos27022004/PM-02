import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProgressTracking = () => {
  const { userInfo, role } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(
    role === "teacher"
      ? "students"
      : role === "admin"
      ? "dashboard"
      : "overview"
  );
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [timeRange, setTimeRange] = useState("week");

  // Mock progress data
  // Mock student progress data for teacher/admin view
  const [studentProgressData] = useState([
    {
      id: 1,
      studentName: "Nguyễn Văn An",
      email: "an.nguyen@email.com",
      avatar: "https://via.placeholder.com/40",
      totalCourses: 3,
      completedCourses: 1,
      currentCourses: 2,
      totalLessons: 45,
      completedLessons: 28,
      studyTime: 35,
      lastActive: "2024-01-20",
      averageQuizScore: 85,
      avgGrade: "B+",
      courses: [
        {
          courseId: 1,
          courseName: "JavaScript Cơ bản",
          progress: 100,
          status: "completed",
          grade: "A",
          quizAverage: 92,
          assignmentAverage: 88,
          studyTime: 15,
          lastAccessed: "2024-01-15",
        },
        {
          courseId: 2,
          courseName: "React Framework",
          progress: 65,
          status: "in_progress",
          grade: "B+",
          quizAverage: 78,
          assignmentAverage: 82,
          studyTime: 12,
          lastAccessed: "2024-01-20",
        },
      ],
    },
    {
      id: 2,
      studentName: "Trần Thị Bình",
      email: "binh.tran@email.com",
      avatar: "https://via.placeholder.com/40",
      totalCourses: 2,
      completedCourses: 2,
      currentCourses: 0,
      totalLessons: 30,
      completedLessons: 30,
      studyTime: 25,
      lastActive: "2024-01-19",
      averageQuizScore: 94,
      avgGrade: "A",
      courses: [
        {
          courseId: 1,
          courseName: "JavaScript Cơ bản",
          progress: 100,
          status: "completed",
          grade: "A+",
          quizAverage: 96,
          assignmentAverage: 92,
          studyTime: 12,
          lastAccessed: "2024-01-10",
        },
        {
          courseId: 3,
          courseName: "Python Data Science",
          progress: 100,
          status: "completed",
          grade: "A",
          quizAverage: 92,
          assignmentAverage: 94,
          studyTime: 13,
          lastAccessed: "2024-01-19",
        },
      ],
    },
    {
      id: 3,
      studentName: "Lê Minh Cường",
      email: "cuong.le@email.com",
      avatar: "https://via.placeholder.com/40",
      totalCourses: 4,
      completedCourses: 0,
      currentCourses: 4,
      totalLessons: 62,
      completedLessons: 15,
      studyTime: 8,
      lastActive: "2024-01-18",
      averageQuizScore: 65,
      avgGrade: "C+",
      courses: [
        {
          courseId: 1,
          courseName: "JavaScript Cơ bản",
          progress: 30,
          status: "in_progress",
          grade: "C",
          quizAverage: 65,
          assignmentAverage: 70,
          studyTime: 3,
          lastAccessed: "2024-01-18",
        },
        {
          courseId: 2,
          courseName: "React Framework",
          progress: 15,
          status: "in_progress",
          grade: "C-",
          quizAverage: 58,
          assignmentAverage: 62,
          studyTime: 2,
          lastAccessed: "2024-01-17",
        },
      ],
    },
  ]);

  const [progressData] = useState({
    overall: {
      totalCourses: 8,
      completedCourses: 3,
      inProgressCourses: 5,
      totalLessons: 125,
      completedLessons: 87,
      totalStudyTime: 142, // hours
      currentStreak: 12, // days
      longestStreak: 25,
      averageSessionTime: 45, // minutes
      skillsAcquired: 23,
      certificatesEarned: 3,
    },
    courses: [
      {
        id: 1,
        title: "JavaScript Fundamentals",
        progress: 100,
        status: "completed",
        totalLessons: 20,
        completedLessons: 20,
        studyTime: 35,
        lastAccessed: "2024-01-15",
        grade: "A+",
        certificate: true,
        skills: ["JavaScript", "DOM", "ES6"],
        difficulty: "Beginner",
        quizScores: [
          {
            quiz: "Bài kiểm tra 1: Cơ bản",
            score: 95,
            maxScore: 100,
            passed: true,
          },
          {
            quiz: "Bài kiểm tra 2: Functions",
            score: 88,
            maxScore: 100,
            passed: true,
          },
          {
            quiz: "Bài kiểm tra 3: DOM",
            score: 92,
            maxScore: 100,
            passed: true,
          },
          {
            quiz: "Kiểm tra cuối khóa",
            score: 96,
            maxScore: 100,
            passed: true,
          },
        ],
        assignments: [
          { name: "Bài tập 1: Variables", status: "completed", score: 100 },
          { name: "Bài tập 2: Functions", status: "completed", score: 95 },
          {
            name: "Bài tập 3: DOM Manipulation",
            status: "completed",
            score: 88,
          },
          { name: "Project cuối khóa", status: "completed", score: 92 },
        ],
      },
      {
        id: 2,
        title: "React Development",
        progress: 75,
        status: "in_progress",
        totalLessons: 18,
        completedLessons: 14,
        studyTime: 28,
        lastAccessed: "2024-01-20",
        grade: "A",
        certificate: false,
        skills: ["React", "JSX", "Hooks"],
        difficulty: "Intermediate",
        quizScores: [
          {
            quiz: "Bài kiểm tra 1: JSX",
            score: 85,
            maxScore: 100,
            passed: true,
          },
          {
            quiz: "Bài kiểm tra 2: Components",
            score: 78,
            maxScore: 100,
            passed: true,
          },
          {
            quiz: "Bài kiểm tra 3: Hooks",
            score: 92,
            maxScore: 100,
            passed: true,
          },
        ],
        assignments: [
          {
            name: "Bài tập 1: First Component",
            status: "completed",
            score: 90,
          },
          { name: "Bài tập 2: Props & State", status: "completed", score: 85 },
          { name: "Bài tập 3: useEffect Hook", status: "completed", score: 88 },
          {
            name: "Bài tập 4: Context API",
            status: "in_progress",
            score: null,
          },
        ],
      },
      {
        id: 3,
        title: "Node.js Backend",
        progress: 60,
        status: "in_progress",
        totalLessons: 25,
        completedLessons: 15,
        studyTime: 32,
        lastAccessed: "2024-01-18",
        grade: "B+",
        certificate: false,
        skills: ["Node.js", "Express", "MongoDB"],
        difficulty: "Intermediate",
      },
      {
        id: 4,
        title: "Python for Data Science",
        progress: 45,
        status: "in_progress",
        totalLessons: 30,
        completedLessons: 14,
        studyTime: 25,
        lastAccessed: "2024-01-16",
        grade: "B",
        certificate: false,
        skills: ["Python", "Pandas", "NumPy"],
        difficulty: "Intermediate",
      },
      {
        id: 5,
        title: "Machine Learning Basics",
        progress: 30,
        status: "in_progress",
        totalLessons: 22,
        completedLessons: 7,
        studyTime: 15,
        lastAccessed: "2024-01-14",
        grade: "B-",
        certificate: false,
        skills: ["ML", "Algorithms", "Statistics"],
        difficulty: "Advanced",
      },
    ],
    weeklyProgress: [
      { day: "Mon", lessons: 3, time: 2.5 },
      { day: "Tue", lessons: 2, time: 1.8 },
      { day: "Wed", lessons: 4, time: 3.2 },
      { day: "Thu", lessons: 1, time: 0.8 },
      { day: "Fri", lessons: 3, time: 2.4 },
      { day: "Sat", lessons: 5, time: 4.1 },
      { day: "Sun", lessons: 2, time: 1.6 },
    ],
    skills: [
      { name: "JavaScript", level: 85, category: "Programming" },
      { name: "React", level: 75, category: "Framework" },
      { name: "Node.js", level: 60, category: "Backend" },
      { name: "Python", level: 55, category: "Programming" },
      { name: "HTML/CSS", level: 90, category: "Frontend" },
      { name: "Git", level: 70, category: "Tools" },
      { name: "MongoDB", level: 50, category: "Database" },
      { name: "Machine Learning", level: 35, category: "AI/ML" },
    ],
    achievements: [
      {
        id: 1,
        title: "Fast Learner",
        description: "Hoàn thành 5 bài học trong 1 ngày",
        date: "2024-01-20",
        icon: "🚀",
        type: "speed",
      },
      {
        id: 2,
        title: "Consistent Student",
        description: "Học liên tục 7 ngày",
        date: "2024-01-19",
        icon: "📚",
        type: "streak",
      },
      {
        id: 3,
        title: "JavaScript Master",
        description: "Hoàn thành khóa học JavaScript",
        date: "2024-01-15",
        icon: "⭐",
        type: "completion",
      },
    ],
    studyHours: {
      week: [
        { date: "14/01", hours: 2.5 },
        { date: "15/01", hours: 3.2 },
        { date: "16/01", hours: 1.8 },
        { date: "17/01", hours: 4.1 },
        { date: "18/01", hours: 2.4 },
        { date: "19/01", hours: 3.6 },
        { date: "20/01", hours: 2.8 },
      ],
      month: [
        { date: "Tuần 1", hours: 18.5 },
        { date: "Tuần 2", hours: 22.3 },
        { date: "Tuần 3", hours: 19.8 },
        { date: "Tuần 4", hours: 25.1 },
      ],
    },
  });

  const getStatusColor = (status) => {
    const colors = {
      completed: "#4CAF50",
      in_progress: "#FF9800",
      not_started: "#9E9E9E",
    };
    return colors[status] || "#666";
  };

  const getStatusText = (status) => {
    const texts = {
      completed: "Hoàn thành",
      in_progress: "Đang học",
      not_started: "Chưa bắt đầu",
    };
    return texts[status] || status;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: "#4CAF50",
      Intermediate: "#FF9800",
      Advanced: "#F44336",
    };
    return colors[difficulty] || "#666";
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "#4CAF50";
    if (grade.startsWith("B")) return "#FF9800";
    if (grade.startsWith("C")) return "#FF5722";
    return "#9E9E9E";
  };

  const renderOverview = () => (
    <div>
      {/* Key Metrics */}
      <div className="stats-grid" style={{ marginBottom: "2rem" }}>
        <div className="stat-card">
          <div className="stat-number">
            {progressData.overall.completedCourses}/
            {progressData.overall.totalCourses}
          </div>
          <div className="stat-label">Khóa học hoàn thành</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            {Math.round(
              (progressData.overall.completedCourses /
                progressData.overall.totalCourses) *
                100
            )}
            % tổng khóa học
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {progressData.overall.completedLessons}/
            {progressData.overall.totalLessons}
          </div>
          <div className="stat-label">Bài học đã học</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            {Math.round(
              (progressData.overall.completedLessons /
                progressData.overall.totalLessons) *
                100
            )}
            % tổng bài học
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {progressData.overall.totalStudyTime}h
          </div>
          <div className="stat-label">Thời gian học tập</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            ~{progressData.overall.averageSessionTime} phút/phiên
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {progressData.overall.currentStreak}
          </div>
          <div className="stat-label">Ngày học liên tiếp</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            Kỷ lục: {progressData.overall.longestStreak} ngày
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>📊 Tiến độ tuần này</h3>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              gap: "1rem",
              height: "200px",
              padding: "1rem 0",
            }}
          >
            {progressData.weeklyProgress.map((day, index) => (
              <div key={index} style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    height: `${(day.time / 5) * 150}px`,
                    background:
                      "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "4px 4px 0 0",
                    marginBottom: "0.5rem",
                    position: "relative",
                    minHeight: "10px",
                  }}
                >
                  {day.time > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#333",
                        color: "white",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.7rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {day.time}h
                    </div>
                  )}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>
                  {day.day}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#999" }}>
                  {day.lessons} bài
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>🏆 Thành tích gần đây</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {progressData.achievements.slice(0, 3).map((achievement) => (
              <div
                key={achievement.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  background: "#f8f9fa",
                  borderRadius: "8px",
                }}
              >
                <div style={{ fontSize: "2rem" }}>{achievement.icon}</div>
                <div style={{ flex: 1 }}>
                  <h5 style={{ margin: "0 0 0.3rem 0" }}>
                    {achievement.title}
                  </h5>
                  <p style={{ margin: "0", fontSize: "0.8rem", color: "#666" }}>
                    {achievement.description}
                  </p>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "#999",
                      marginTop: "0.3rem",
                    }}
                  >
                    {new Date(achievement.date).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Overview */}
      <div className="card">
        <h3 style={{ marginBottom: "1.5rem" }}>🎯 Kỹ năng đạt được</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {progressData.skills.slice(0, 6).map((skill, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{skill.name}</span>
                <span style={{ fontSize: "0.9rem", color: "#666" }}>
                  {skill.level}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, 
                      ${
                        skill.level >= 80
                          ? "#4CAF50"
                          : skill.level >= 60
                          ? "#FF9800"
                          : "#F44336"
                      } 0%, 
                      ${
                        skill.level >= 80
                          ? "#8BC34A"
                          : skill.level >= 60
                          ? "#FFC107"
                          : "#FF5722"
                      } 100%)`,
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#666",
                  marginTop: "0.3rem",
                }}
              >
                {skill.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCourseProgress = () => (
    <div>
      {/* Course Filter */}
      <div style={{ marginBottom: "2rem" }}>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          style={{
            padding: "0.8rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        >
          <option value="all">Tất cả khóa học</option>
          {progressData.courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Course Cards */}
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {progressData.courses
          .filter(
            (course) =>
              selectedCourse === "all" ||
              course.id.toString() === selectedCourse
          )
          .map((course) => (
            <div key={course.id} className="card" style={{ padding: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 0.5rem 0" }}>{course.title}</h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        background: getStatusColor(course.status),
                        color: "white",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {getStatusText(course.status)}
                    </span>
                    <span
                      style={{
                        background: getDifficultyColor(course.difficulty),
                        color: "white",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {course.difficulty}
                    </span>
                    <span
                      style={{
                        background: getGradeColor(course.grade),
                        color: "white",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                      }}
                    >
                      Điểm: {course.grade}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#667eea",
                    }}
                  >
                    {course.progress}%
                  </div>
                  {course.certificate && (
                    <div style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>
                      🏆
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "100%",
                    height: "12px",
                    background: "#f0f0f0",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${course.progress}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, 
                      ${
                        course.progress >= 80
                          ? "#4CAF50"
                          : course.progress >= 60
                          ? "#FF9800"
                          : "#667eea"
                      } 0%, 
                      ${
                        course.progress >= 80
                          ? "#8BC34A"
                          : course.progress >= 60
                          ? "#FFC107"
                          : "#764ba2"
                      } 100%)`,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>

              {/* Course Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "0.8rem",
                    background: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#667eea",
                    }}
                  >
                    {course.completedLessons}/{course.totalLessons}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>
                    Bài học
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    padding: "0.8rem",
                    background: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#667eea",
                    }}
                  >
                    {course.studyTime}h
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>
                    Thời gian học
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    padding: "0.8rem",
                    background: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#667eea",
                    }}
                  >
                    {new Date(course.lastAccessed).toLocaleDateString("vi-VN")}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>
                    Lần cuối truy cập
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h5 style={{ marginBottom: "0.8rem" }}>Kỹ năng đạt được:</h5>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {course.skills.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        background: "#667eea",
                        color: "white",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quiz Scores - Only show if course has quizzes */}
              {course.quizScores && course.quizScores.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <h5
                    style={{
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    📝 Điểm quiz
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        background: "#f0f0f0",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "10px",
                      }}
                    >
                      {course.quizScores.filter((q) => q.passed).length}/
                      {course.quizScores.length} đạt
                    </span>
                  </h5>
                  <div style={{ display: "grid", gap: "0.8rem" }}>
                    {course.quizScores.map((quiz, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.8rem",
                          background: quiz.passed ? "#e8f5e8" : "#fff3e0",
                          border: `1px solid ${
                            quiz.passed ? "#4CAF50" : "#FF9800"
                          }`,
                          borderRadius: "8px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontWeight: "500",
                              marginBottom: "0.3rem",
                            }}
                          >
                            {quiz.name}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#666" }}>
                            {quiz.score}/{quiz.maxScore} điểm
                            {quiz.attempts > 1 && (
                              <span style={{ marginLeft: "0.5rem" }}>
                                (Lần thử: {quiz.attempts})
                              </span>
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                              color: quiz.passed ? "#4CAF50" : "#FF9800",
                            }}
                          >
                            {Math.round((quiz.score / quiz.maxScore) * 100)}%
                          </div>
                          <div style={{ fontSize: "1.2rem" }}>
                            {quiz.passed ? "✅" : "⚠️"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignments - Only show if course has assignments */}
              {course.assignments && course.assignments.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <h5
                    style={{
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    📋 Bài tập
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        background: "#f0f0f0",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "10px",
                      }}
                    >
                      {
                        course.assignments.filter(
                          (a) => a.status === "completed"
                        ).length
                      }
                      /{course.assignments.length} hoàn thành
                    </span>
                  </h5>
                  <div style={{ display: "grid", gap: "0.8rem" }}>
                    {course.assignments.map((assignment, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.8rem",
                          background:
                            assignment.status === "completed"
                              ? "#e8f5e8"
                              : "#f8f9fa",
                          border: `1px solid ${
                            assignment.status === "completed"
                              ? "#4CAF50"
                              : "#ddd"
                          }`,
                          borderRadius: "8px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontWeight: "500",
                              marginBottom: "0.3rem",
                            }}
                          >
                            {assignment.name}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#666" }}>
                            {assignment.status === "completed" ? (
                              <span>
                                Điểm: {assignment.score}/{assignment.maxScore}
                                {assignment.submittedAt && (
                                  <span style={{ marginLeft: "0.5rem" }}>
                                    • Nộp:{" "}
                                    {new Date(
                                      assignment.submittedAt
                                    ).toLocaleDateString("vi-VN")}
                                  </span>
                                )}
                              </span>
                            ) : assignment.status === "in_progress" ? (
                              <span style={{ color: "#FF9800" }}>Đang làm</span>
                            ) : (
                              <span style={{ color: "#999" }}>
                                Chưa bắt đầu
                              </span>
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          {assignment.status === "completed" && (
                            <div
                              style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: "#4CAF50",
                              }}
                            >
                              {Math.round(
                                (assignment.score / assignment.maxScore) * 100
                              )}
                              %
                            </div>
                          )}
                          <div style={{ fontSize: "1.2rem" }}>
                            {assignment.status === "completed"
                              ? "✅"
                              : assignment.status === "in_progress"
                              ? "⏳"
                              : "📝"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div
                style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}
              >
                <button
                  style={{
                    flex: 1,
                    padding: "0.8rem",
                    background:
                      course.status === "completed" ? "#4CAF50" : "#667eea",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  {course.status === "completed"
                    ? "✓ Đã hoàn thành"
                    : "📚 Tiếp tục học"}
                </button>

                <button
                  style={{
                    padding: "0.8rem 1.5rem",
                    background: "#f0f0f0",
                    color: "#666",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  📊 Chi tiết
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div>
      {/* Time Range Selector */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[
            { value: "week", label: "Tuần này" },
            { value: "month", label: "Tháng này" },
            { value: "quarter", label: "Quý này" },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              style={{
                padding: "0.8rem 1.5rem",
                background: timeRange === range.value ? "#667eea" : "#f0f0f0",
                color: timeRange === range.value ? "white" : "#666",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Study Time Chart */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1.5rem" }}>⏰ Thời gian học tập</h3>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            gap: "1rem",
            height: "250px",
            padding: "1rem 0",
          }}
        >
          {progressData.studyHours[timeRange]?.map((data, index) => (
            <div key={index} style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  height: `${(data.hours / 30) * 200}px`,
                  background:
                    "linear-gradient(180deg, #4CAF50 0%, #8BC34A 100%)",
                  borderRadius: "4px 4px 0 0",
                  marginBottom: "0.5rem",
                  position: "relative",
                  minHeight: "10px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#333",
                    color: "white",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {data.hours}h
                </div>
              </div>
              <div style={{ fontSize: "0.8rem", color: "#666" }}>
                {data.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>📈 Hiệu suất học tập</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span>Tỷ lệ hoàn thành bài học</span>
                <span style={{ fontWeight: "bold" }}>87%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    width: "87%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span>Điểm trung bình</span>
                <span style={{ fontWeight: "bold" }}>8.3/10</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    width: "83%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #FF9800 0%, #FFC107 100%)",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span>Tương tác với nội dung</span>
                <span style={{ fontWeight: "bold" }}>92%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    width: "92%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>🎯 Mục tiêu học tập</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "1rem",
                background: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎯</div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#667eea",
                  marginBottom: "0.3rem",
                }}
              >
                75%
              </div>
              <div style={{ fontSize: "0.9rem", color: "#666" }}>
                Mục tiêu tháng này
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#4CAF50",
                  }}
                >
                  12/15
                </div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>
                  Khóa học
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#FF9800",
                  }}
                >
                  45h
                </div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>
                  Thời gian
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Recommendations */}
      <div className="card">
        <h3 style={{ marginBottom: "1.5rem" }}>💡 Gợi ý cải thiện</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              icon: "📅",
              title: "Lên lịch học tập thường xuyên",
              description:
                "Học 30 phút mỗi ngày tốt hơn học 3 tiếng vào cuối tuần",
              priority: "high",
            },
            {
              icon: "🎯",
              title: "Tập trung vào JavaScript",
              description:
                "Kỹ năng này cần cải thiện để đạt mục tiêu nghề nghiệp",
              priority: "medium",
            },
            {
              icon: "🤝",
              title: "Tham gia thảo luận nhiều hơn",
              description: "Tương tác với cộng đồng giúp học tập hiệu quả hơn",
              priority: "low",
            },
          ].map((tip, index) => (
            <div
              key={index}
              style={{
                padding: "1.5rem",
                border: `2px solid ${
                  tip.priority === "high"
                    ? "#F44336"
                    : tip.priority === "medium"
                    ? "#FF9800"
                    : "#4CAF50"
                }`,
                borderRadius: "8px",
                background: `${
                  tip.priority === "high"
                    ? "#fff5f5"
                    : tip.priority === "medium"
                    ? "#fff8f0"
                    : "#f8fff8"
                }`,
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>
                {tip.icon}
              </div>
              <h4 style={{ margin: "0 0 0.8rem 0" }}>{tip.title}</h4>
              <p
                style={{
                  margin: 0,
                  color: "#666",
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                }}
              >
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Teacher Dashboard View
  const renderTeacherDashboard = () => (
    <div>
      {/* Class Overview Stats */}
      <div className="stats-grid" style={{ marginBottom: "2rem" }}>
        <div className="stat-card">
          <div className="stat-number">{studentProgressData.length}</div>
          <div className="stat-label">Tổng học viên</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            {studentProgressData.filter((s) => s.currentCourses > 0).length}{" "}
            đang học
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {Math.round(
              studentProgressData.reduce(
                (acc, s) => acc + s.averageQuizScore,
                0
              ) / studentProgressData.length
            )}
            %
          </div>
          <div className="stat-label">Điểm trung bình lớp</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            Tất cả bài quiz
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {studentProgressData.reduce(
              (acc, s) => acc + s.completedCourses,
              0
            )}
          </div>
          <div className="stat-label">Khóa học hoàn thành</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            Tổng tất cả học viên
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {studentProgressData.reduce((acc, s) => acc + s.studyTime, 0)}h
          </div>
          <div className="stat-label">Tổng giờ học</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            Của tất cả học viên
          </div>
        </div>
      </div>

      {/* Student Progress Table */}
      <div className="card" style={{ padding: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h3 style={{ margin: 0 }}>👥 Danh sách học viên</h3>
          <button
            style={{
              padding: "0.8rem 1.5rem",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            📊 Xuất báo cáo
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    borderBottom: "2px solid #dee2e6",
                  }}
                >
                  Học viên
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    borderBottom: "2px solid #dee2e6",
                  }}
                >
                  Khóa học
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    borderBottom: "2px solid #dee2e6",
                  }}
                >
                  Tiến độ
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    borderBottom: "2px solid #dee2e6",
                  }}
                >
                  Điểm TB
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    borderBottom: "2px solid #dee2e6",
                  }}
                >
                  Giờ học
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    borderBottom: "2px solid #dee2e6",
                  }}
                >
                  Hoạt động cuối
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    borderBottom: "2px solid #dee2e6",
                  }}
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {studentProgressData.map((student) => (
                <tr
                  key={student.id}
                  style={{ borderBottom: "1px solid #dee2e6" }}
                >
                  <td style={{ padding: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <img
                        src={student.avatar}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: "500" }}>
                          {student.studentName}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#666" }}>
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <div style={{ fontWeight: "500" }}>
                      {student.completedCourses}/{student.totalCourses}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>
                      hoàn thành
                    </div>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <div style={{ fontWeight: "500" }}>
                      {student.completedLessons}/{student.totalLessons}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>
                      bài học
                    </div>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        color:
                          student.averageQuizScore >= 80
                            ? "#4CAF50"
                            : student.averageQuizScore >= 60
                            ? "#FF9800"
                            : "#F44336",
                      }}
                    >
                      {student.averageQuizScore}%
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>
                      ({student.avgGrade})
                    </div>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <div style={{ fontWeight: "500" }}>
                      {student.studyTime}h
                    </div>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <div style={{ fontSize: "0.8rem" }}>
                      {new Date(student.lastActive).toLocaleDateString("vi-VN")}
                    </div>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={{
                          padding: "0.5rem",
                          background: "#667eea",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      <button
                        style={{
                          padding: "0.5rem",
                          background: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                        title="Gửi tin nhắn"
                      >
                        💬
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Performance Analysis */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>📈 Xu hướng học tập</h3>
          <div
            style={{
              padding: "1rem",
              background: "#f8f9fa",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📊</div>
            <p style={{ color: "#666", margin: 0 }}>
              Biểu đồ xu hướng học tập theo thời gian
            </p>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>🎯 Học viên cần hỗ trợ</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {studentProgressData
              .filter((s) => s.averageQuizScore < 70)
              .slice(0, 3)
              .map((student) => (
                <div
                  key={student.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    background: "#fff3e0",
                    border: "1px solid #FF9800",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={student.avatar}
                    alt=""
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "500" }}>
                      {student.studentName}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>
                      Điểm TB: {student.averageQuizScore}% • Cần hỗ trợ
                    </div>
                  </div>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#FF9800",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                    }}
                  >
                    Hỗ trợ
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Admin Dashboard View
  const renderAdminDashboard = () => (
    <div>
      {/* System Overview Stats */}
      <div className="stats-grid" style={{ marginBottom: "2rem" }}>
        <div className="stat-card">
          <div className="stat-number">1,234</div>
          <div className="stat-label">Tổng học viên</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            +15% so với tháng trước
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">45</div>
          <div className="stat-label">Khóa học hoạt động</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            8 khóa mới tháng này
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">23</div>
          <div className="stat-label">Giảng viên</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            5 giảng viên mới
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">87%</div>
          <div className="stat-label">Tỷ lệ hoàn thành</div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            Trung bình hệ thống
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>📊 Thống kê hệ thống</h3>
          <div
            style={{
              padding: "2rem",
              background: "#f8f9fa",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📈</div>
            <p style={{ color: "#666", margin: 0 }}>
              Biểu đồ thống kê tổng quan hệ thống
            </p>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>🚨 Cảnh báo hệ thống</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                padding: "1rem",
                background: "#fff5f5",
                border: "1px solid #F44336",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                ⚠️ Server Load
              </div>
              <div style={{ fontSize: "0.8rem", color: "#666" }}>
                CPU usage: 85% - Cần kiểm tra
              </div>
            </div>

            <div
              style={{
                padding: "1rem",
                background: "#fff8f0",
                border: "1px solid #FF9800",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                📝 Báo cáo chờ duyệt
              </div>
              <div style={{ fontSize: "0.8rem", color: "#666" }}>
                12 báo cáo cần xem xét
              </div>
            </div>

            <div
              style={{
                padding: "1rem",
                background: "#f8fff8",
                border: "1px solid #4CAF50",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                ✅ Hệ thống ổn định
              </div>
              <div style={{ fontSize: "0.8rem", color: "#666" }}>
                Tất cả dịch vụ đang hoạt động tốt
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Tools */}
      <div className="card" style={{ padding: "2rem" }}>
        <h3 style={{ marginBottom: "1.5rem" }}>📥 Công cụ xuất dữ liệu</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              padding: "1.5rem",
              border: "2px solid #667eea",
              borderRadius: "8px",
              textAlign: "center",
              background: "#f8f9fa",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📊</div>
            <h4 style={{ margin: "0 0 0.5rem 0" }}>Báo cáo học tập</h4>
            <p
              style={{
                margin: "0 0 1rem 0",
                fontSize: "0.9rem",
                color: "#666",
              }}
            >
              Xuất báo cáo tiến độ tất cả học viên
            </p>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Xuất CSV
            </button>
          </div>

          <div
            style={{
              padding: "1.5rem",
              border: "2px solid #28a745",
              borderRadius: "8px",
              textAlign: "center",
              background: "#f8f9fa",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💰</div>
            <h4 style={{ margin: "0 0 0.5rem 0" }}>Báo cáo doanh thu</h4>
            <p
              style={{
                margin: "0 0 1rem 0",
                fontSize: "0.9rem",
                color: "#666",
              }}
            >
              Thống kê doanh thu theo khóa học
            </p>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Xuất Excel
            </button>
          </div>

          <div
            style={{
              padding: "1.5rem",
              border: "2px solid #dc3545",
              borderRadius: "8px",
              textAlign: "center",
              background: "#f8f9fa",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍</div>
            <h4 style={{ margin: "0 0 0.5rem 0" }}>Báo cáo hệ thống</h4>
            <p
              style={{
                margin: "0 0 1rem 0",
                fontSize: "0.9rem",
                color: "#666",
              }}
            >
              Logs và performance metrics
            </p>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Xuất PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="main-container">
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: "0 0 0.5rem 0" }}>
          📊 Theo dõi tiến độ {role === "teacher" ? "học viên" : "học tập"}
        </h1>
        <p style={{ margin: 0, color: "#666" }}>
          {role === "teacher"
            ? "Theo dõi tiến độ học tập của học viên trong các khóa học của bạn"
            : "Phân tích và theo dõi quá trình học tập của bạn trong từng khóa học"}
        </p>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            borderBottom: "2px solid #f0f0f0",
          }}
        >
          {(role === "teacher"
            ? [
                { key: "students", label: "👥 Học viên" },
                { key: "overview", label: "📈 Tổng quan lớp" },
                { key: "analytics", label: "📊 Phân tích" },
              ]
            : role === "admin"
            ? [
                { key: "dashboard", label: "🎛️ Bảng điều khiển" },
                { key: "overview", label: "📈 Tổng quan hệ thống" },
                { key: "analytics", label: "📊 Thống kê" },
              ]
            : [
                { key: "overview", label: "📈 Tổng quan" },
                { key: "courses", label: "📚 Khóa học" },
                { key: "analytics", label: "📊 Phân tích" },
              ]
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "1rem 2rem",
                background: "none",
                border: "none",
                borderBottom:
                  activeTab === tab.key
                    ? "3px solid #667eea"
                    : "3px solid transparent",
                color: activeTab === tab.key ? "#667eea" : "#666",
                cursor: "pointer",
                fontWeight: activeTab === tab.key ? "bold" : "normal",
                fontSize: "1rem",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {role === "teacher" ? (
        <>
          {activeTab === "students" && renderTeacherDashboard()}
          {activeTab === "overview" && renderOverview()}
          {activeTab === "analytics" && renderAnalytics()}
        </>
      ) : role === "admin" ? (
        <>
          {activeTab === "dashboard" && renderAdminDashboard()}
          {activeTab === "overview" && renderOverview()}
          {activeTab === "analytics" && renderAnalytics()}
        </>
      ) : (
        <>
          {activeTab === "overview" && renderOverview()}
          {activeTab === "courses" && renderCourseProgress()}
          {activeTab === "analytics" && renderAnalytics()}
        </>
      )}
    </div>
  );
};

export default ProgressTracking;
