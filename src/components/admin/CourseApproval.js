import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  approveCourse,
  rejectCourse,
  deleteCourse,
  updateCourse,
} from "../../redux/courseSlice";

const CourseApproval = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  const pendingCourses = courses.filter(
    (course) => course.status === "pending_review"
  );
  const publishedCourses = courses.filter(
    (course) => course.status === "published"
  );
  const rejectedCourses = courses.filter(
    (course) => course.status === "rejected"
  );

  const handleApproveCourse = (courseId) => {
    if (window.confirm("Bạn có chắc chắn muốn duyệt khóa học này?")) {
      dispatch(approveCourse(courseId));
      console.log(`Approved course ${courseId} by ${userInfo?.fullName}`);
    }
  };

  const handleRejectCourse = () => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối");
      return;
    }

    dispatch(
      rejectCourse({
        courseId: selectedCourse.id,
        reason: rejectReason,
      })
    );

    console.log(
      `Rejected course ${selectedCourse.id} by ${userInfo?.fullName}: ${rejectReason}`
    );

    setShowRejectModal(false);
    setRejectReason("");
    setSelectedCourse(null);
  };

  const handleDeleteCourse = (courseId, courseTitle) => {
    if (
      window.confirm(`Bạn có chắc chắn muốn xóa khóa học "${courseTitle}"?`)
    ) {
      dispatch(deleteCourse(courseId));
      console.log(`Deleted course ${courseId} by ${userInfo?.fullName}`);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending_review: "#f59e0b",
      published: "#10b981",
      rejected: "#ef4444",
      draft: "#6b7280",
    };
    return colors[status] || "#6b7280";
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending_review: "Chờ duyệt",
      published: "Đã phê duyệt",
      rejected: "Từ chối",
      draft: "Bản nháp",
    };
    return labels[status] || status;
  };

  const CourseCard = ({ course, showActions = true }) => (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <h4 style={{ margin: 0 }}>{course.title}</h4>
            <span
              style={{
                background: getStatusColor(course.status),
                color: "white",
                padding: "0.3rem 0.8rem",
                borderRadius: "15px",
                fontSize: "0.8rem",
              }}
            >
              {getStatusLabel(course.status)}
            </span>
          </div>

          <p style={{ color: "#666", marginBottom: "0.5rem" }}>
            {course.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "0.9rem",
              color: "#666",
            }}
          >
            <span>👨‍🏫 {course.instructor}</span>
            <span>📚 {course.lessons} bài</span>
            <span>
              💰{" "}
              {course.price === 0
                ? "Miễn phí"
                : `${course.price.toLocaleString()}đ`}
            </span>
            <span>📊 {course.level}</span>
          </div>

          {course.rejectionReason && (
            <div
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                padding: "0.8rem",
                borderRadius: "5px",
                marginTop: "0.8rem",
                fontSize: "0.9rem",
              }}
            >
              <strong>Lý do từ chối:</strong> {course.rejectionReason}
            </div>
          )}
        </div>

        {showActions && userInfo?.role === "admin" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {course.status === "pending_review" && (
              <>
                <button
                  className="btn btn-primary"
                  style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                  onClick={() => handleApproveCourse(course.id)}
                >
                  ✅ Phê duyệt
                </button>
                <button
                  className="btn btn-danger"
                  style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowRejectModal(true);
                  }}
                >
                  ❌ Từ chối
                </button>
              </>
            )}

            {course.status === "published" && (
              <button
                className="btn btn-secondary"
                style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                onClick={() => {
                  dispatch(
                    updateCourse({
                      id: course.id,
                      updatedCourse: { status: "pending_review" },
                    })
                  );
                }}
              >
                📝 Gỡ xuống
              </button>
            )}

            <button
              className="btn btn-danger"
              style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
              onClick={() => handleDeleteCourse(course.id, course.title)}
            >
              🗑️ Xóa
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (userInfo?.role !== "admin") {
    return (
      <div className="main-container">
        <div className="card">
          <h3>❌ Không có quyền truy cập</h3>
          <p>Chỉ quản trị viên mới có thể duyệt khóa học.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h2>📋 Quản lý & Duyệt Khóa học</h2>

      {/* Statistics */}
      <div className="stats-grid" style={{ marginBottom: "2rem" }}>
        <div className="stat-card">
          <div className="stat-number">{pendingCourses.length}</div>
          <div className="stat-label">Chờ duyệt</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{publishedCourses.length}</div>
          <div className="stat-label">Đã phê duyệt</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{rejectedCourses.length}</div>
          <div className="stat-label">Đã từ chối</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{courses.length}</div>
          <div className="stat-label">Tổng khóa học</div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          borderBottom: "2px solid #e5e7eb",
        }}
      >
        {[
          {
            key: "pending",
            label: `Chờ duyệt (${pendingCourses.length})`,
            color: "#f59e0b",
          },
          {
            key: "published",
            label: `Đã duyệt (${publishedCourses.length})`,
            color: "#10b981",
          },
          {
            key: "rejected",
            label: `Từ chối (${rejectedCourses.length})`,
            color: "#ef4444",
          },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`btn ${
              activeTab === tab.key ? "btn-primary" : "btn-secondary"
            }`}
            style={{
              borderBottom:
                activeTab === tab.key ? `3px solid ${tab.color}` : "none",
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "pending" && (
          <div>
            <h3>⏳ Khóa học chờ duyệt</h3>
            {pendingCourses.length === 0 ? (
              <div className="card">
                <p>Không có khóa học nào chờ duyệt.</p>
              </div>
            ) : (
              pendingCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </div>
        )}

        {activeTab === "published" && (
          <div>
            <h3>✅ Khóa học đã được duyệt</h3>
            {publishedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {activeTab === "rejected" && (
          <div>
            <h3>❌ Khóa học bị từ chối</h3>
            {rejectedCourses.length === 0 ? (
              <div className="card">
                <p>Không có khóa học nào bị từ chối.</p>
              </div>
            ) : (
              rejectedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <h3>❌ Từ chối khóa học</h3>
            <p>
              Khóa học: <strong>{selectedCourse?.title}</strong>
            </p>

            <div className="form-group">
              <label>Lý do từ chối:</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do từ chối khóa học..."
                rows={4}
                style={{ width: "100%", resize: "vertical" }}
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                  setSelectedCourse(null);
                }}
              >
                Hủy
              </button>
              <button className="btn btn-danger" onClick={handleRejectCourse}>
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseApproval;
