import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./AdminManagement.css";

const AdminManagement = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("advertisements");
  const [loading, setLoading] = useState(false);

  // Advertisement Management State
  const [advertisements, setAdvertisements] = useState([]);
  const [showAdModal, setShowAdModal] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [adForm, setAdForm] = useState({
    id: null,
    title: "",
    imageFile: null,
    imageUrl: "",
    targetUrl: "",
    position: "header",
    isActive: true,
    startDate: "",
    endDate: "",
  });

  // Course Approval State
  const [pendingCourses, setPendingCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [approvalForm, setApprovalForm] = useState({
    action: "",
    reason: "",
    feedback: "",
  });

  useEffect(() => {
    loadAdvertisements();
    loadPendingCourses();
  }, []);

  const loadAdvertisements = () => {
    const mockAds = [
      {
        id: 1,
        title: "Black Friday Sale - 50% Off",
        imageUrl: "/api/placeholder/400/200",
        targetUrl: "/courses?sale=blackfriday",
        position: "header",
        isActive: true,
        startDate: "2024-11-01",
        endDate: "2024-11-30",
        views: 15420,
        clicks: 890,
        ctr: 5.8,
        createdAt: new Date("2024-10-25"),
      },
      {
        id: 2,
        title: "New React Course Launch",
        imageUrl: "/api/placeholder/400/200",
        targetUrl: "/courses/react-masterclass",
        position: "sidebar",
        isActive: true,
        startDate: "2024-10-01",
        endDate: "2024-12-31",
        views: 8930,
        clicks: 456,
        ctr: 5.1,
        createdAt: new Date("2024-09-28"),
      },
      {
        id: 3,
        title: "Weekend Programming Bootcamp",
        imageUrl: "/api/placeholder/400/200",
        targetUrl: "/bootcamp/weekend",
        position: "footer",
        isActive: false,
        startDate: "2024-09-15",
        endDate: "2024-09-30",
        views: 5670,
        clicks: 234,
        ctr: 4.1,
        createdAt: new Date("2024-09-10"),
      },
    ];
    setAdvertisements(mockAds);
  };

  const loadPendingCourses = () => {
    const mockCourses = [
      {
        id: 1,
        title: "Advanced Machine Learning with Python",
        instructor: "Dr. Nguyễn Văn A",
        instructorId: "inst001",
        description:
          "Khóa học chuyên sâu về Machine Learning với Python, bao gồm các thuật toán nâng cao và ứng dụng thực tế.",
        category: "Data Science",
        level: "Advanced",
        duration: "12 tuần",
        price: 2500000,
        thumbnail: "/api/placeholder/300/200",
        totalLessons: 48,
        totalDuration: "36 giờ",
        materials: ["Video HD", "Slides", "Code examples", "Datasets"],
        submittedAt: new Date("2024-10-01"),
        status: "pending",
        completeness: 95,
        qualityScore: 8.5,
        issues: [],
      },
      {
        id: 2,
        title: "Blockchain Development Fundamentals",
        instructor: "Trần Thị B",
        instructorId: "inst002",
        description:
          "Tìm hiểu cơ bản về Blockchain và phát triển DApp với Ethereum.",
        category: "Blockchain",
        level: "Intermediate",
        duration: "8 tuần",
        price: 1800000,
        thumbnail: "/api/placeholder/300/200",
        totalLessons: 32,
        totalDuration: "24 giờ",
        materials: ["Video HD", "Smart contracts", "Documentation"],
        submittedAt: new Date("2024-09-28"),
        status: "pending",
        completeness: 88,
        qualityScore: 7.8,
        issues: [
          "Thiếu bài tập thực hành cho chapter 3",
          "Video chất lượng thấp ở bài 15",
        ],
      },
      {
        id: 3,
        title: "Mobile App Development with Flutter",
        instructor: "Lê Văn C",
        instructorId: "inst003",
        description:
          "Xây dựng ứng dụng di động đa nền tảng với Flutter và Dart.",
        category: "Mobile Development",
        level: "Beginner",
        duration: "10 tuần",
        price: 2200000,
        thumbnail: "/api/placeholder/300/200",
        totalLessons: 40,
        totalDuration: "30 giờ",
        materials: ["Video HD", "Source code", "UI/UX templates"],
        submittedAt: new Date("2024-09-25"),
        status: "pending",
        completeness: 92,
        qualityScore: 9.1,
        issues: ["Cần bổ sung thêm phần deployment"],
      },
    ];
    setPendingCourses(mockCourses);
  };

  // Advertisement Functions
  const handleCreateAd = () => {
    setAdForm({
      id: null,
      title: "",
      imageFile: null,
      imageUrl: "",
      targetUrl: "",
      position: "header",
      isActive: true,
      startDate: "",
      endDate: "",
    });
    setEditingAd(null);
    setShowAdModal(true);
  };

  const handleEditAd = (ad) => {
    setAdForm({
      ...ad,
      imageFile: null,
      startDate: ad.startDate,
      endDate: ad.endDate,
    });
    setEditingAd(ad);
    setShowAdModal(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("Kích thước file phải nhỏ hơn 5MB");
        return;
      }

      if (!["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
        alert("Chỉ hỗ trợ file PNG, JPG, GIF");
        return;
      }

      setAdForm((prev) => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSaveAd = async () => {
    if (
      !adForm.title.trim() ||
      !adForm.targetUrl.trim() ||
      (!adForm.imageUrl && !adForm.imageFile)
    ) {
      alert("Vui lòng điền đầy đủ thông tin và chọn hình ảnh");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const adData = {
        ...adForm,
        id: adForm.id || Date.now(),
        imageUrl: adForm.imageUrl || "/api/placeholder/400/200",
        views: adForm.id ? editingAd.views : 0,
        clicks: adForm.id ? editingAd.clicks : 0,
        ctr: adForm.id ? editingAd.ctr : 0,
        createdAt: adForm.id ? editingAd.createdAt : new Date(),
      };

      if (adForm.id) {
        setAdvertisements((prev) =>
          prev.map((ad) => (ad.id === adForm.id ? adData : ad))
        );
      } else {
        setAdvertisements((prev) => [...prev, adData]);
      }

      setShowAdModal(false);
      alert("Lưu quảng cáo thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi lưu quảng cáo");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAd = async (adId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa quảng cáo này?")) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAdvertisements((prev) => prev.filter((ad) => ad.id !== adId));
      alert("Xóa quảng cáo thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa quảng cáo");
    } finally {
      setLoading(false);
    }
  };

  const toggleAdStatus = async (adId) => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAdvertisements((prev) =>
        prev.map((ad) =>
          ad.id === adId ? { ...ad, isActive: !ad.isActive } : ad
        )
      );
      alert("Cập nhật trạng thái thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật trạng thái");
    } finally {
      setLoading(false);
    }
  };

  // Course Approval Functions
  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setApprovalForm({
      action: "",
      reason: "",
      feedback: "",
    });
    setShowCourseModal(true);
  };

  const handleApproveCourse = async () => {
    if (approvalForm.action === "reject" && !approvalForm.reason.trim()) {
      alert("Vui lòng nhập lý do từ chối");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const updatedCourse = {
        ...selectedCourse,
        status: approvalForm.action === "approve" ? "approved" : "rejected",
        approvedAt: new Date(),
        approvedBy: user?.name,
        rejectionReason:
          approvalForm.action === "reject" ? approvalForm.reason : null,
        feedback: approvalForm.feedback,
      };

      setPendingCourses((prev) =>
        prev.filter((c) => c.id !== selectedCourse.id)
      );

      // Send notification email to instructor (simulated)
      console.log("Sending notification email to instructor:", {
        instructorId: selectedCourse.instructorId,
        courseTitle: selectedCourse.title,
        status: approvalForm.action,
        reason: approvalForm.reason,
        feedback: approvalForm.feedback,
      });

      setShowCourseModal(false);
      alert(
        `${
          approvalForm.action === "approve" ? "Duyệt" : "Từ chối"
        } khóa học thành công! Đã gửi thông báo cho giảng viên.`
      );
    } catch (error) {
      alert("Có lỗi xảy ra khi xử lý khóa học");
    } finally {
      setLoading(false);
    }
  };

  const renderAdvertisements = () => (
    <div className="ad-management">
      <div className="section-header">
        <h3>🎯 Quản lý Quảng cáo</h3>
        <button className="create-btn" onClick={handleCreateAd}>
          ➕ Thêm quảng cáo
        </button>
      </div>

      <div className="ads-grid">
        {advertisements.map((ad) => (
          <div key={ad.id} className="ad-card">
            <div className="ad-image">
              <img src={ad.imageUrl} alt={ad.title} />
              <div className="ad-overlay">
                <span
                  className={`status-badge ${
                    ad.isActive ? "active" : "inactive"
                  }`}
                >
                  {ad.isActive ? "🟢 Hoạt động" : "🔴 Tạm dừng"}
                </span>
              </div>
            </div>

            <div className="ad-content">
              <h4>{ad.title}</h4>
              <div className="ad-details">
                <span className="ad-position">📍 {ad.position}</span>
                <span className="ad-period">
                  📅 {new Date(ad.startDate).toLocaleDateString("vi-VN")} -{" "}
                  {new Date(ad.endDate).toLocaleDateString("vi-VN")}
                </span>
              </div>

              <div className="ad-stats">
                <div className="stat-item">
                  <span className="stat-value">
                    {ad.views.toLocaleString()}
                  </span>
                  <span className="stat-label">Lượt xem</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">
                    {ad.clicks.toLocaleString()}
                  </span>
                  <span className="stat-label">Lượt click</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{ad.ctr}%</span>
                  <span className="stat-label">CTR</span>
                </div>
              </div>

              <div className="ad-actions">
                <button
                  className="action-btn edit"
                  onClick={() => handleEditAd(ad)}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="action-btn toggle"
                  onClick={() => toggleAdStatus(ad.id)}
                >
                  {ad.isActive ? "⏸️ Tạm dừng" : "▶️ Kích hoạt"}
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteAd(ad.id)}
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourseApproval = () => (
    <div className="course-approval">
      <div className="section-header">
        <h3>✅ Duyệt Khóa học</h3>
        <div className="approval-stats">
          <span className="stat">Chờ duyệt: {pendingCourses.length}</span>
        </div>
      </div>

      <div className="courses-list">
        {pendingCourses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-thumbnail">
              <img src={course.thumbnail} alt={course.title} />
              <div className="course-level">{course.level}</div>
            </div>

            <div className="course-info">
              <h4>{course.title}</h4>
              <div className="course-meta">
                <span className="instructor">👨‍🏫 {course.instructor}</span>
                <span className="category">📂 {course.category}</span>
                <span className="duration">⏱️ {course.duration}</span>
                <span className="price">
                  💰 {course.price.toLocaleString()} VND
                </span>
              </div>

              <div className="course-description">{course.description}</div>

              <div className="course-details">
                <div className="detail-item">
                  <span className="detail-label">Bài học:</span>
                  <span className="detail-value">
                    {course.totalLessons} bài ({course.totalDuration})
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tài liệu:</span>
                  <span className="detail-value">
                    {course.materials.join(", ")}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Hoàn thiện:</span>
                  <span className="detail-value">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${course.completeness}%` }}
                      />
                    </div>
                    {course.completeness}%
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Chất lượng:</span>
                  <span className="detail-value">
                    ⭐ {course.qualityScore}/10
                  </span>
                </div>
              </div>

              {course.issues.length > 0 && (
                <div className="course-issues">
                  <h5>⚠️ Vấn đề cần xem xét:</h5>
                  <ul>
                    {course.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="course-timeline">
                <span>
                  📅 Gửi duyệt: {course.submittedAt.toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>

            <div className="course-actions">
              <button
                className="action-btn view"
                onClick={() => handleViewCourse(course)}
              >
                👁️ Xem chi tiết
              </button>
            </div>
          </div>
        ))}

        {pendingCourses.length === 0 && (
          <div className="empty-state">
            <p>✅ Không có khóa học nào cần duyệt</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="admin-management">
      <div className="management-header">
        <h2>⚙️ Quản lý Admin</h2>
        <p>Quản lý quảng cáo và duyệt khóa học</p>
      </div>

      <div className="management-tabs">
        <button
          className={activeTab === "advertisements" ? "active" : ""}
          onClick={() => setActiveTab("advertisements")}
        >
          🎯 Quảng cáo
        </button>
        <button
          className={activeTab === "courseApproval" ? "active" : ""}
          onClick={() => setActiveTab("courseApproval")}
        >
          ✅ Duyệt khóa học
        </button>
      </div>

      <div className="management-content">
        {activeTab === "advertisements" && renderAdvertisements()}
        {activeTab === "courseApproval" && renderCourseApproval()}
      </div>

      {/* Advertisement Modal */}
      {showAdModal && (
        <div className="modal-overlay">
          <div className="modal-content ad-modal">
            <div className="modal-header">
              <h3>
                {editingAd ? "✏️ Chỉnh sửa Quảng cáo" : "➕ Thêm Quảng cáo"}
              </h3>
              <button
                className="close-btn"
                onClick={() => setShowAdModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="ad-form">
                <div className="form-group">
                  <label>Tiêu đề quảng cáo:</label>
                  <input
                    type="text"
                    value={adForm.title}
                    onChange={(e) =>
                      setAdForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Nhập tiêu đề quảng cáo..."
                  />
                </div>

                <div className="form-group">
                  <label>Hình ảnh banner (PNG/JPG/GIF, tối đa 5MB):</label>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/gif"
                    onChange={handleImageUpload}
                  />
                  {adForm.imageUrl && (
                    <div className="image-preview">
                      <img src={adForm.imageUrl} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Đường dẫn đích:</label>
                  <input
                    type="url"
                    value={adForm.targetUrl}
                    onChange={(e) =>
                      setAdForm((prev) => ({
                        ...prev,
                        targetUrl: e.target.value,
                      }))
                    }
                    placeholder="https://example.com/destination"
                  />
                </div>

                <div className="form-group">
                  <label>Vị trí hiển thị:</label>
                  <select
                    value={adForm.position}
                    onChange={(e) =>
                      setAdForm((prev) => ({
                        ...prev,
                        position: e.target.value,
                      }))
                    }
                  >
                    <option value="header">Header</option>
                    <option value="sidebar">Sidebar</option>
                    <option value="footer">Footer</option>
                    <option value="content">Trong nội dung</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Ngày bắt đầu:</label>
                    <input
                      type="date"
                      value={adForm.startDate}
                      onChange={(e) =>
                        setAdForm((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Ngày kết thúc:</label>
                    <input
                      type="date"
                      value={adForm.endDate}
                      onChange={(e) =>
                        setAdForm((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={adForm.isActive}
                      onChange={(e) =>
                        setAdForm((prev) => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                    />
                    Kích hoạt quảng cáo
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowAdModal(false)}
              >
                Hủy
              </button>
              <button
                className="save-btn"
                onClick={handleSaveAd}
                disabled={loading}
              >
                {loading ? "⏳ Đang lưu..." : "💾 Lưu quảng cáo"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Approval Modal */}
      {showCourseModal && selectedCourse && (
        <div className="modal-overlay">
          <div className="modal-content course-modal">
            <div className="modal-header">
              <h3>✅ Duyệt Khóa học: {selectedCourse.title}</h3>
              <button
                className="close-btn"
                onClick={() => setShowCourseModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="course-review">
                <div className="review-section">
                  <h4>📋 Thông tin khóa học</h4>
                  <div className="course-overview">
                    <img
                      src={selectedCourse.thumbnail}
                      alt={selectedCourse.title}
                      className="course-image"
                    />
                    <div className="course-basic-info">
                      <p>
                        <strong>Giảng viên:</strong> {selectedCourse.instructor}
                      </p>
                      <p>
                        <strong>Danh mục:</strong> {selectedCourse.category}
                      </p>
                      <p>
                        <strong>Cấp độ:</strong> {selectedCourse.level}
                      </p>
                      <p>
                        <strong>Thời lượng:</strong> {selectedCourse.duration}
                      </p>
                      <p>
                        <strong>Giá:</strong>{" "}
                        {selectedCourse.price.toLocaleString()} VND
                      </p>
                    </div>
                  </div>

                  <div className="course-description">
                    <h5>Mô tả:</h5>
                    <p>{selectedCourse.description}</p>
                  </div>
                </div>

                <div className="review-section">
                  <h4>🔍 Kiểm tra chất lượng</h4>
                  <div className="quality-checklist">
                    <div className="check-item">
                      <span className="check-label">
                        Nội dung rõ ràng và đầy đủ:
                      </span>
                      <span className="check-status">✅ Đạt</span>
                    </div>
                    <div className="check-item">
                      <span className="check-label">
                        Chất lượng hình ảnh/video:
                      </span>
                      <span className="check-status">✅ HD (≥720p)</span>
                    </div>
                    <div className="check-item">
                      <span className="check-label">Tài liệu kèm theo:</span>
                      <span className="check-status">✅ Đầy đủ</span>
                    </div>
                    <div className="check-item">
                      <span className="check-label">Bản quyền:</span>
                      <span className="check-status">✅ Hợp lệ</span>
                    </div>
                    <div className="check-item">
                      <span className="check-label">Thời lượng tối thiểu:</span>
                      <span className="check-status">
                        ✅ {selectedCourse.totalDuration} (≥60 phút)
                      </span>
                    </div>
                  </div>

                  {selectedCourse.issues.length > 0 && (
                    <div className="issues-section">
                      <h5>⚠️ Vấn đề cần xem xét:</h5>
                      <ul>
                        {selectedCourse.issues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="approval-form">
                  <h4>📝 Quyết định duyệt</h4>

                  <div className="form-group">
                    <label>Hành động:</label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="action"
                          value="approve"
                          checked={approvalForm.action === "approve"}
                          onChange={(e) =>
                            setApprovalForm((prev) => ({
                              ...prev,
                              action: e.target.value,
                            }))
                          }
                        />
                        ✅ Duyệt khóa học
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="action"
                          value="reject"
                          checked={approvalForm.action === "reject"}
                          onChange={(e) =>
                            setApprovalForm((prev) => ({
                              ...prev,
                              action: e.target.value,
                            }))
                          }
                        />
                        ❌ Từ chối
                      </label>
                    </div>
                  </div>

                  {approvalForm.action === "reject" && (
                    <div className="form-group">
                      <label>Lý do từ chối (bắt buộc):</label>
                      <textarea
                        value={approvalForm.reason}
                        onChange={(e) =>
                          setApprovalForm((prev) => ({
                            ...prev,
                            reason: e.target.value,
                          }))
                        }
                        placeholder="Nhập lý do từ chối khóa học..."
                        rows={4}
                        required
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label>Ghi chú/Phản hồi cho giảng viên:</label>
                    <textarea
                      value={approvalForm.feedback}
                      onChange={(e) =>
                        setApprovalForm((prev) => ({
                          ...prev,
                          feedback: e.target.value,
                        }))
                      }
                      placeholder="Nhập ghi chú hoặc phản hồi cho giảng viên..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowCourseModal(false)}
              >
                Đóng
              </button>
              <button
                className="approve-btn"
                onClick={handleApproveCourse}
                disabled={loading || !approvalForm.action}
              >
                {loading
                  ? "⏳ Đang xử lý..."
                  : approvalForm.action === "approve"
                  ? "✅ Duyệt khóa học"
                  : "❌ Từ chối khóa học"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
