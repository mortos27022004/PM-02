import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./AnalyticsDashboard.css";

const AnalyticsDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("students");
  const [dateRange, setDateRange] = useState("30days");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const [analyticsData, setAnalyticsData] = useState({
    studentStats: {
      total: 1250,
      active: 890,
      completed: 234,
      atRisk: 126,
      growth: 12.5,
    },
    learningStats: {
      totalCourses: 45,
      completionRate: 78.5,
      averageScore: 8.2,
      totalStudyHours: 15680,
      certificatesIssued: 234,
    },
    topCourses: [
      {
        id: 1,
        name: "JavaScript Cơ Bản",
        students: 345,
        completion: 85,
        rating: 4.8,
      },
      {
        id: 2,
        name: "React Advanced",
        students: 289,
        completion: 76,
        rating: 4.6,
      },
      {
        id: 3,
        name: "Python for Beginners",
        students: 267,
        completion: 91,
        rating: 4.9,
      },
      {
        id: 4,
        name: "Node.js Backend",
        students: 198,
        completion: 69,
        rating: 4.4,
      },
      {
        id: 5,
        name: "Vue.js Fundamentals",
        students: 156,
        completion: 82,
        rating: 4.7,
      },
    ],
    reports: [
      {
        id: 1,
        type: "comment",
        content: "Bình luận có nội dung không phù hợp về chính trị",
        author: "Nguyễn Văn A",
        course: "JavaScript Cơ Bản",
        reportedBy: "Trần Thị B",
        reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        status: "pending",
        severity: "high",
      },
      {
        id: 2,
        type: "comment",
        content: "Spam link quảng cáo",
        author: "Lê Văn C",
        course: "React Advanced",
        reportedBy: "Phạm Thị D",
        reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
        status: "pending",
        severity: "medium",
      },
      {
        id: 3,
        type: "comment",
        content: "Ngôn từ thô tục, xúc phạm người khác",
        author: "Hoàng Văn E",
        course: "Python Basics",
        reportedBy: "Mai Thị F",
        reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        status: "resolved",
        severity: "high",
        action: "hidden",
        resolvedBy: user?.name,
        resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
      },
    ],
  });

  const [courses, setCourses] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    loadCourses();
    loadChartData();
  }, [dateRange, selectedCourse]);

  const loadCourses = () => {
    const mockCourses = [
      { id: "all", name: "Tất cả khóa học" },
      { id: 1, name: "JavaScript Cơ Bản" },
      { id: 2, name: "React Advanced" },
      { id: 3, name: "Python for Beginners" },
      { id: 4, name: "Node.js Backend" },
      { id: 5, name: "Vue.js Fundamentals" },
    ];
    setCourses(mockCourses);
  };

  const loadChartData = () => {
    // Simulate chart data based on date range
    const days = dateRange === "7days" ? 7 : dateRange === "30days" ? 30 : 90;
    const enrollmentData = [];
    const progressData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      enrollmentData.push({
        date: date.toLocaleDateString("vi-VN"),
        students: Math.floor(Math.random() * 20) + 5,
      });

      progressData.push({
        date: date.toLocaleDateString("vi-VN"),
        completed: Math.floor(Math.random() * 15) + 2,
        inProgress: Math.floor(Math.random() * 25) + 10,
      });
    }

    setChartData({
      enrollment: enrollmentData,
      progress: progressData,
    });
  };

  const handleReportAction = (reportId, action) => {
    setAnalyticsData((prev) => ({
      ...prev,
      reports: prev.reports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              status: "resolved",
              action,
              resolvedBy: user?.name,
              resolvedAt: new Date(),
            }
          : report
      ),
    }));

    alert(`Đã ${action === "hidden" ? "ẩn" : "gỡ"} bình luận thành công`);
  };

  const exportData = (type) => {
    setExportLoading(true);

    setTimeout(() => {
      let data = [];
      let filename = "";

      if (type === "students") {
        data = [
          ["Thống kê học viên", ""],
          ["Khoảng thời gian", dateRange],
          ["Ngày xuất", new Date().toLocaleDateString("vi-VN")],
          [""],
          ["Chỉ số", "Giá trị"],
          ["Tổng học viên", analyticsData.studentStats.total],
          ["Đang hoạt động", analyticsData.studentStats.active],
          ["Hoàn thành khóa", analyticsData.studentStats.completed],
          ["Có nguy cơ bỏ học", analyticsData.studentStats.atRisk],
          ["Tăng trưởng (%)", analyticsData.studentStats.growth],
        ];
        filename = "student_analytics";
      } else if (type === "learning") {
        data = [
          ["Thống kê học tập", ""],
          ["Khoảng thời gian", dateRange],
          ["Ngày xuất", new Date().toLocaleDateString("vi-VN")],
          [""],
          ["Chỉ số", "Giá trị"],
          ["Tổng khóa học", analyticsData.learningStats.totalCourses],
          ["Tỷ lệ hoàn thành (%)", analyticsData.learningStats.completionRate],
          ["Điểm trung bình", analyticsData.learningStats.averageScore],
          ["Giờ học tổng", analyticsData.learningStats.totalStudyHours],
          ["Chứng chỉ cấp", analyticsData.learningStats.certificatesIssued],
        ];
        filename = "learning_analytics";
      } else if (type === "courses") {
        data = [
          ["Top khóa học phổ biến", "", "", "", ""],
          ["Tên khóa học", "Học viên", "Hoàn thành (%)", "Đánh giá", ""],
          ...analyticsData.topCourses.map((course) => [
            course.name,
            course.students,
            course.completion,
            course.rating,
            "",
          ]),
        ];
        filename = "top_courses";
      }

      const csvContent = data.map((row) => row.join(",")).join("\n");
      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      link.click();

      setExportLoading(false);
      alert("Đã xuất dữ liệu thành công");
    }, 1500);
  };

  const getReportSeverityColor = (severity) => {
    const colors = {
      high: "#e74c3c",
      medium: "#f39c12",
      low: "#27ae60",
    };
    return colors[severity] || "#666";
  };

  const getReportStatusColor = (status) => {
    const colors = {
      pending: "#f39c12",
      resolved: "#27ae60",
      rejected: "#e74c3c",
    };
    return colors[status] || "#666";
  };

  const renderStudentAnalytics = () => (
    <div className="analytics-section">
      <div className="section-header">
        <h3>👥 Thống kê học viên</h3>
        <button
          className="export-btn"
          onClick={() => exportData("students")}
          disabled={exportLoading}
        >
          {exportLoading ? "⏳" : "📊"} Xuất dữ liệu
        </button>
      </div>

      <div className="stats-overview">
        <div className="stat-card primary">
          <div className="stat-number">
            {analyticsData.studentStats.total.toLocaleString()}
          </div>
          <div className="stat-label">Tổng học viên</div>
          <div className="stat-change positive">
            +{analyticsData.studentStats.growth}% so với tháng trước
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {analyticsData.studentStats.active.toLocaleString()}
          </div>
          <div className="stat-label">Đang hoạt động</div>
          <div className="stat-percentage">
            {Math.round(
              (analyticsData.studentStats.active /
                analyticsData.studentStats.total) *
                100
            )}
            %
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {analyticsData.studentStats.completed.toLocaleString()}
          </div>
          <div className="stat-label">Hoàn thành khóa</div>
          <div className="stat-percentage">
            {Math.round(
              (analyticsData.studentStats.completed /
                analyticsData.studentStats.total) *
                100
            )}
            %
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-number">
            {analyticsData.studentStats.atRisk.toLocaleString()}
          </div>
          <div className="stat-label">Có nguy cơ bỏ học</div>
          <div className="stat-percentage">
            {Math.round(
              (analyticsData.studentStats.atRisk /
                analyticsData.studentStats.total) *
                100
            )}
            %
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h4>📈 Đăng ký mới theo ngày</h4>
          <div className="simple-chart">
            {chartData.enrollment?.map((day, index) => (
              <div key={index} className="chart-bar">
                <div
                  className="bar-fill"
                  style={{ height: `${(day.students / 25) * 100}%` }}
                  title={`${day.date}: ${day.students} học viên`}
                />
                <div className="bar-label">{day.date.split("/")[0]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h4>🎯 Phân bố trạng thái học viên</h4>
          <div className="pie-chart">
            <div className="pie-item">
              <div className="pie-color active"></div>
              <span>Đang học ({analyticsData.studentStats.active})</span>
            </div>
            <div className="pie-item">
              <div className="pie-color completed"></div>
              <span>Hoàn thành ({analyticsData.studentStats.completed})</span>
            </div>
            <div className="pie-item">
              <div className="pie-color at-risk"></div>
              <span>Nguy cơ bỏ học ({analyticsData.studentStats.atRisk})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLearningAnalytics = () => (
    <div className="analytics-section">
      <div className="section-header">
        <h3>📚 Thống kê tình hình học tập</h3>
        <button
          className="export-btn"
          onClick={() => exportData("learning")}
          disabled={exportLoading}
        >
          {exportLoading ? "⏳" : "📊"} Xuất dữ liệu
        </button>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-number">
            {analyticsData.learningStats.totalCourses}
          </div>
          <div className="stat-label">Tổng khóa học</div>
        </div>

        <div className="stat-card primary">
          <div className="stat-number">
            {analyticsData.learningStats.completionRate}%
          </div>
          <div className="stat-label">Tỷ lệ hoàn thành TB</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {analyticsData.learningStats.averageScore}/10
          </div>
          <div className="stat-label">Điểm trung bình</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {analyticsData.learningStats.totalStudyHours.toLocaleString()}h
          </div>
          <div className="stat-label">Tổng giờ học</div>
        </div>

        <div className="stat-card success">
          <div className="stat-number">
            {analyticsData.learningStats.certificatesIssued}
          </div>
          <div className="stat-label">Chứng chỉ đã cấp</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card full-width">
          <h4>📊 Tiến độ học tập theo ngày</h4>
          <div className="progress-chart">
            {chartData.progress?.map((day, index) => (
              <div key={index} className="progress-day">
                <div className="progress-bars">
                  <div
                    className="progress-bar completed"
                    style={{ height: `${(day.completed / 20) * 100}%` }}
                    title={`Hoàn thành: ${day.completed}`}
                  />
                  <div
                    className="progress-bar in-progress"
                    style={{ height: `${(day.inProgress / 30) * 100}%` }}
                    title={`Đang học: ${day.inProgress}`}
                  />
                </div>
                <div className="progress-label">{day.date.split("/")[0]}</div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color completed"></div>
              <span>Hoàn thành bài học</span>
            </div>
            <div className="legend-item">
              <div className="legend-color in-progress"></div>
              <span>Bắt đầu học</span>
            </div>
          </div>
        </div>
      </div>

      <div className="top-courses">
        <div className="section-header">
          <h4>🏆 Top khóa học phổ biến</h4>
          <button
            className="export-btn small"
            onClick={() => exportData("courses")}
          >
            📊 Xuất
          </button>
        </div>

        <div className="courses-table">
          <table>
            <thead>
              <tr>
                <th>Khóa học</th>
                <th>Học viên</th>
                <th>Hoàn thành</th>
                <th>Đánh giá</th>
                <th>Xu hướng</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topCourses.map((course, index) => (
                <tr key={course.id}>
                  <td>
                    <div className="course-info">
                      <span className="rank">#{index + 1}</span>
                      <span className="name">{course.name}</span>
                    </div>
                  </td>
                  <td>{course.students}</td>
                  <td>
                    <div className="completion-bar">
                      <div
                        className="completion-fill"
                        style={{ width: `${course.completion}%` }}
                      />
                      <span>{course.completion}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="rating">⭐ {course.rating}</div>
                  </td>
                  <td>
                    <div className="trend positive">
                      📈 +{Math.floor(Math.random() * 20) + 5}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCommentModeration = () => (
    <div className="analytics-section">
      <div className="section-header">
        <h3>🛡️ Kiểm duyệt bình luận</h3>
        <div className="moderation-stats">
          <span className="stat">
            Chờ xử lý:{" "}
            {analyticsData.reports.filter((r) => r.status === "pending").length}
          </span>
          <span className="stat">
            Đã xử lý:{" "}
            {
              analyticsData.reports.filter((r) => r.status === "resolved")
                .length
            }
          </span>
        </div>
      </div>

      <div className="reports-list">
        {analyticsData.reports.map((report) => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <div className="report-info">
                <span
                  className="severity-badge"
                  style={{
                    backgroundColor: getReportSeverityColor(report.severity),
                  }}
                >
                  {report.severity === "high"
                    ? "Nghiêm trọng"
                    : report.severity === "medium"
                    ? "Trung bình"
                    : "Nhẹ"}
                </span>
                <span className="report-course">📚 {report.course}</span>
                <span className="report-time">
                  🕒 {report.reportedAt.toLocaleString("vi-VN")}
                </span>
              </div>
              <span
                className="status-badge"
                style={{ backgroundColor: getReportStatusColor(report.status) }}
              >
                {report.status === "pending"
                  ? "Chờ xử lý"
                  : report.status === "resolved"
                  ? "Đã xử lý"
                  : "Từ chối"}
              </span>
            </div>

            <div className="report-content">
              <div className="reported-comment">
                <strong>Nội dung bị báo cáo:</strong>
                <p>"{report.content}"</p>
                <div className="comment-meta">
                  Tác giả: <strong>{report.author}</strong> | Báo cáo bởi:{" "}
                  <strong>{report.reportedBy}</strong>
                </div>
              </div>

              {report.status === "pending" && (
                <div className="moderation-actions">
                  <button
                    className="action-btn hide"
                    onClick={() => handleReportAction(report.id, "hidden")}
                  >
                    👁️ Ẩn bình luận
                  </button>
                  <button
                    className="action-btn remove"
                    onClick={() => handleReportAction(report.id, "removed")}
                  >
                    🗑️ Gỡ bình luận
                  </button>
                  <button
                    className="action-btn reject"
                    onClick={() => handleReportAction(report.id, "rejected")}
                  >
                    ❌ Từ chối báo cáo
                  </button>
                </div>
              )}

              {report.status === "resolved" && (
                <div className="resolution-info">
                  <div className="resolution-action">
                    Hành động:{" "}
                    <strong>
                      {report.action === "hidden"
                        ? "Đã ẩn bình luận"
                        : report.action === "removed"
                        ? "Đã gỡ bình luận"
                        : "Từ chối báo cáo"}
                    </strong>
                  </div>
                  <div className="resolution-by">
                    Xử lý bởi: <strong>{report.resolvedBy}</strong> | Lúc:{" "}
                    {report.resolvedAt?.toLocaleString("vi-VN")}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {analyticsData.reports.length === 0 && (
        <div className="empty-state">
          <p>✅ Không có báo cáo nào cần xử lý</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <h2>📊 Thống kê & Phân tích</h2>
        <p>Dashboard quản lý và phân tích dữ liệu hệ thống</p>
      </div>

      <div className="dashboard-controls">
        <div className="tabs">
          <button
            className={activeTab === "students" ? "active" : ""}
            onClick={() => setActiveTab("students")}
          >
            👥 Học viên
          </button>
          <button
            className={activeTab === "learning" ? "active" : ""}
            onClick={() => setActiveTab("learning")}
          >
            📚 Học tập
          </button>
          {(user?.role === "admin" || user?.role === "teacher") && (
            <button
              className={activeTab === "moderation" ? "active" : ""}
              onClick={() => setActiveTab("moderation")}
            >
              🛡️ Kiểm duyệt
            </button>
          )}
        </div>

        <div className="filters">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="90days">90 ngày qua</option>
          </select>

          {user?.role === "admin" && (
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="dashboard-content">
        {activeTab === "students" && renderStudentAnalytics()}
        {activeTab === "learning" && renderLearningAnalytics()}
        {activeTab === "moderation" && renderCommentModeration()}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
