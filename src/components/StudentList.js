import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./StudentList.css";

const StudentList = () => {
  const { user } = useSelector((state) => state.auth);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    // Load teacher's courses
    const mockCourses = [
      { id: 1, name: "JavaScript Cơ Bản", studentCount: 45 },
      { id: 2, name: "React Advanced", studentCount: 32 },
      { id: 3, name: "Node.js Backend", studentCount: 28 },
      { id: 4, name: "Python for Beginners", studentCount: 56 },
    ];
    setCourses(mockCourses);

    if (mockCourses.length > 0) {
      setSelectedCourse(mockCourses[0].id.toString());
    }
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadStudents();
    }
  }, [selectedCourse]);

  const loadStudents = async () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockStudents = [
        {
          id: 1,
          name: "Nguyễn Văn A",
          email: "nguyenvana@email.com",
          avatar: null,
          enrollDate: "2024-01-15",
          lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          progress: 75,
          status: "active",
          completedLessons: 15,
          totalLessons: 20,
          averageScore: 8.5,
          totalQuizzes: 12,
          completedQuizzes: 10,
          totalAssignments: 8,
          completedAssignments: 6,
          studyTime: 45, // hours
          certificates: 2,
        },
        {
          id: 2,
          name: "Trần Thị B",
          email: "tranthib@email.com",
          avatar: null,
          enrollDate: "2024-01-20",
          lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          progress: 90,
          status: "active",
          completedLessons: 18,
          totalLessons: 20,
          averageScore: 9.2,
          totalQuizzes: 12,
          completedQuizzes: 12,
          totalAssignments: 8,
          completedAssignments: 8,
          studyTime: 52,
          certificates: 3,
        },
        {
          id: 3,
          name: "Lê Văn C",
          email: "levanc@email.com",
          avatar: null,
          enrollDate: "2024-02-01",
          lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
          progress: 45,
          status: "inactive",
          completedLessons: 9,
          totalLessons: 20,
          averageScore: 7.1,
          totalQuizzes: 12,
          completedQuizzes: 6,
          totalAssignments: 8,
          completedAssignments: 3,
          studyTime: 28,
          certificates: 0,
        },
        {
          id: 4,
          name: "Phạm Thị D",
          email: "phamthid@email.com",
          avatar: null,
          enrollDate: "2024-01-10",
          lastActive: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
          progress: 100,
          status: "completed",
          completedLessons: 20,
          totalLessons: 20,
          averageScore: 9.8,
          totalQuizzes: 12,
          completedQuizzes: 12,
          totalAssignments: 8,
          completedAssignments: 8,
          studyTime: 68,
          certificates: 1,
        },
        {
          id: 5,
          name: "Hoàng Văn E",
          email: "hoangvane@email.com",
          avatar: null,
          enrollDate: "2024-02-15",
          lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
          progress: 20,
          status: "at_risk",
          completedLessons: 4,
          totalLessons: 20,
          averageScore: 6.2,
          totalQuizzes: 12,
          completedQuizzes: 3,
          totalAssignments: 8,
          completedAssignments: 1,
          studyTime: 12,
          certificates: 0,
        },
      ];

      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "#27ae60",
      inactive: "#f39c12",
      completed: "#3498db",
      at_risk: "#e74c3c",
    };
    return colors[status] || "#666";
  };

  const getStatusText = (status) => {
    const texts = {
      active: "Đang học",
      inactive: "Không hoạt động",
      completed: "Hoàn thành",
      at_risk: "Có nguy cơ bỏ học",
    };
    return texts[status] || status;
  };

  const formatLastActive = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || student.status === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;

      switch (sortBy) {
        case "name":
          return order * a.name.localeCompare(b.name);
        case "progress":
          return order * (a.progress - b.progress);
        case "enrollDate":
          return order * (new Date(a.enrollDate) - new Date(b.enrollDate));
        case "lastActive":
          return order * (a.lastActive - b.lastActive);
        case "averageScore":
          return order * (a.averageScore - b.averageScore);
        default:
          return 0;
      }
    });

  const handleExport = async (format) => {
    setExportLoading(true);

    const courseName =
      courses.find((c) => c.id.toString() === selectedCourse)?.name ||
      "Unknown";

    // Simulate export process
    setTimeout(() => {
      const headers = [
        "Tên học viên",
        "Email",
        "Ngày đăng ký",
        "Hoạt động cuối",
        "Tiến độ (%)",
        "Trạng thái",
        "Bài học hoàn thành",
        "Điểm trung bình",
        "Quiz hoàn thành",
        "Bài tập hoàn thành",
        "Thời gian học (giờ)",
        "Chứng chỉ",
      ];

      const csvContent = [
        headers.join(","),
        ...filteredAndSortedStudents.map((student) =>
          [
            student.name,
            student.email,
            student.enrollDate,
            formatLastActive(student.lastActive),
            student.progress,
            getStatusText(student.status),
            `${student.completedLessons}/${student.totalLessons}`,
            student.averageScore,
            `${student.completedQuizzes}/${student.totalQuizzes}`,
            `${student.completedAssignments}/${student.totalAssignments}`,
            student.studyTime,
            student.certificates,
          ].join(",")
        ),
      ].join("\n");

      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `students_${courseName}_${
        new Date().toISOString().split("T")[0]
      }.${format}`;
      link.click();

      setExportLoading(false);
      alert(`Đã xuất danh sách ${filteredAndSortedStudents.length} học viên`);
    }, 2000);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "#27ae60";
    if (progress >= 60) return "#f39c12";
    if (progress >= 40) return "#e67e22";
    return "#e74c3c";
  };

  return (
    <div className="student-list">
      <div className="list-header">
        <h2>👥 Danh sách học viên</h2>
        <p>Quản lý và theo dõi học viên trong các khóa học</p>
      </div>

      <div className="controls">
        <div className="course-selector">
          <label>Khóa học:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} ({course.studentCount} học viên)
              </option>
            ))}
          </select>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-status">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang học</option>
            <option value="inactive">Không hoạt động</option>
            <option value="completed">Hoàn thành</option>
            <option value="at_risk">Có nguy cơ bỏ học</option>
          </select>
        </div>

        <div className="export-buttons">
          <button
            onClick={() => handleExport("csv")}
            disabled={exportLoading}
            className="export-btn"
          >
            {exportLoading ? "⏳" : "📊"} CSV
          </button>
          <button
            onClick={() => handleExport("xlsx")}
            disabled={exportLoading}
            className="export-btn"
          >
            {exportLoading ? "⏳" : "📈"} Excel
          </button>
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-number">{students.length}</div>
          <div className="stat-label">Tổng học viên</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {students.filter((s) => s.status === "active").length}
          </div>
          <div className="stat-label">Đang học</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {students.filter((s) => s.status === "completed").length}
          </div>
          <div className="stat-label">Hoàn thành</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {students.length > 0
              ? Math.round(
                  students.reduce((sum, s) => sum + s.progress, 0) /
                    students.length
                )
              : 0}
            %
          </div>
          <div className="stat-label">Tiến độ TB</div>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <p>⏳ Đang tải danh sách học viên...</p>
        </div>
      ) : (
        <div className="students-table">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("name")} className="sortable">
                    Học viên{" "}
                    {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("progress")}
                    className="sortable"
                  >
                    Tiến độ{" "}
                    {sortBy === "progress" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("averageScore")}
                    className="sortable"
                  >
                    Điểm TB{" "}
                    {sortBy === "averageScore" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("lastActive")}
                    className="sortable"
                  >
                    Hoạt động{" "}
                    {sortBy === "lastActive" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Trạng thái</th>
                  <th>Chi tiết</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="student-info">
                      <div className="student-avatar">
                        {student.avatar ? (
                          <img src={student.avatar} alt={student.name} />
                        ) : (
                          <div className="avatar-placeholder">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="student-details">
                        <div className="student-name">{student.name}</div>
                        <div className="student-email">{student.email}</div>
                        <div className="enroll-date">
                          Đăng ký:{" "}
                          {new Date(student.enrollDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${student.progress}%`,
                              backgroundColor: getProgressColor(
                                student.progress
                              ),
                            }}
                          />
                        </div>
                        <span className="progress-text">
                          {student.progress}%
                        </span>
                      </div>
                      <div className="lesson-progress">
                        {student.completedLessons}/{student.totalLessons} bài
                        học
                      </div>
                    </td>
                    <td>
                      <div className="score-info">
                        <div className="average-score">
                          {student.averageScore}/10
                        </div>
                        <div className="quiz-progress">
                          Quiz: {student.completedQuizzes}/
                          {student.totalQuizzes}
                        </div>
                        <div className="assignment-progress">
                          BT: {student.completedAssignments}/
                          {student.totalAssignments}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="activity-info">
                        <div className="last-active">
                          {formatLastActive(student.lastActive)}
                        </div>
                        <div className="study-time">
                          {student.studyTime}h học tập
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: getStatusColor(student.status),
                        }}
                      >
                        {getStatusText(student.status)}
                      </span>
                    </td>
                    <td>
                      <div className="detail-info">
                        <div>🏆 {student.certificates} chứng chỉ</div>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() =>
                            (window.location.href = `/student-progress/${student.id}`)
                          }
                        >
                          👁️ Xem
                        </button>
                        <button
                          className="message-btn"
                          onClick={() =>
                            alert(`Gửi tin nhắn cho ${student.name}`)
                          }
                        >
                          💬 Nhắn
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedStudents.length === 0 && (
            <div className="empty-state">
              <p>📭 Không tìm thấy học viên nào</p>
              {searchTerm && (
                <button onClick={() => setSearchTerm("")}>Xóa bộ lọc</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentList;
