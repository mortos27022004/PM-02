import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./EmailTemplateManager.css";

const EmailTemplateManager = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("templates");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [templateForm, setTemplateForm] = useState({
    id: null,
    name: "",
    type: "welcome",
    subject: "",
    content: "",
    variables: [],
    isActive: true,
  });

  const [sendForm, setSendForm] = useState({
    templateId: null,
    recipients: "all",
    courseId: "",
    customRecipients: "",
    scheduleType: "now",
    scheduledAt: "",
  });

  const [statistics, setStatistics] = useState({
    totalSent: 15420,
    openRate: 68.5,
    clickRate: 12.3,
    bounceRate: 2.1,
  });

  const templateTypes = [
    {
      value: "welcome",
      label: "🎉 Chào mừng học viên mới",
      variables: ["studentName", "courseName", "enrollmentDate"],
    },
    {
      value: "course_update",
      label: "📚 Cập nhật khóa học",
      variables: [
        "studentName",
        "courseName",
        "updateDetails",
        "instructorName",
      ],
    },
    {
      value: "promotion",
      label: "🎁 Khuyến mãi/Ưu đãi",
      variables: [
        "studentName",
        "promotionTitle",
        "discountAmount",
        "validUntil",
      ],
    },
    {
      value: "schedule_reminder",
      label: "⏰ Nhắc lịch học",
      variables: ["studentName", "courseName", "lessonTitle", "scheduleTime"],
    },
    {
      value: "certificate",
      label: "🏆 Phát hành chứng chỉ",
      variables: [
        "studentName",
        "courseName",
        "completionDate",
        "certificateUrl",
      ],
    },
    {
      value: "approval_result",
      label: "✅ Kết quả kiểm duyệt",
      variables: ["instructorName", "courseName", "approvalStatus", "feedback"],
    },
  ];

  useEffect(() => {
    loadTemplates();
    loadStatistics();
  }, []);

  const loadTemplates = () => {
    const mockTemplates = [
      {
        id: 1,
        name: "Chào mừng học viên JavaScript",
        type: "welcome",
        subject: "Chào mừng bạn đến với khóa học {{courseName}}!",
        content: `Xin chào {{studentName}},

Chúc mừng bạn đã đăng ký thành công khóa học "{{courseName}}" vào ngày {{enrollmentDate}}.

Khóa học này sẽ giúp bạn:
- Nắm vững kiến thức cơ bản về JavaScript
- Thực hành với các dự án thực tế
- Phát triển kỹ năng lập trình web

Hãy bắt đầu hành trình học tập của bạn ngay hôm nay!

Trân trọng,
Đội ngũ giảng viên`,
        variables: ["studentName", "courseName", "enrollmentDate"],
        isActive: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        usageCount: 156,
      },
      {
        id: 2,
        name: "Cập nhật bài học mới",
        type: "course_update",
        subject: "Bài học mới đã được thêm vào {{courseName}}",
        content: `Xin chào {{studentName}},

Chúng tôi vừa cập nhật khóa học "{{courseName}}" với nội dung mới:

{{updateDetails}}

Bài học mới này được thiết kế bởi giảng viên {{instructorName}} để giúp bạn hiểu sâu hơn về chủ đề này.

Hãy truy cập ngay để không bỏ lỡ nội dung mới!

Chúc bạn học tập hiệu quả!`,
        variables: [
          "studentName",
          "courseName",
          "updateDetails",
          "instructorName",
        ],
        isActive: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
        lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
        usageCount: 89,
      },
      {
        id: 3,
        name: "Khuyến mãi cuối tháng",
        type: "promotion",
        subject: "🎁 {{promotionTitle}} - Giảm giá {{discountAmount}}%",
        content: `Xin chào {{studentName}},

Chúng tôi có tin tuyệt vời dành cho bạn!

🎉 {{promotionTitle}}
💰 Giảm giá {{discountAmount}}% cho tất cả khóa học
⏰ Có hiệu lực đến {{validUntil}}

Đây là cơ hội tuyệt vời để bạn mở rộng kiến thức với chi phí ưu đãi nhất.

Sử dụng mã: SAVE{{discountAmount}}

Nhanh tay đăng ký ngay hôm nay!`,
        variables: [
          "studentName",
          "promotionTitle",
          "discountAmount",
          "validUntil",
        ],
        isActive: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 6),
        usageCount: 234,
      },
    ];

    setTemplates(mockTemplates);
  };

  const loadStatistics = () => {
    // Statistics would be loaded from API
    setStatistics({
      totalSent: 15420,
      openRate: 68.5,
      clickRate: 12.3,
      bounceRate: 2.1,
    });
  };

  const handleCreateNew = () => {
    setTemplateForm({
      id: null,
      name: "",
      type: "welcome",
      subject: "",
      content: "",
      variables: templateTypes[0].variables,
      isActive: true,
    });
    setIsEditing(true);
    setSelectedTemplate(null);
  };

  const handleEditTemplate = (template) => {
    setTemplateForm({
      ...template,
      variables:
        templateTypes.find((t) => t.value === template.type)?.variables || [],
    });
    setSelectedTemplate(template);
    setIsEditing(true);
  };

  const handleSaveTemplate = async () => {
    if (
      !templateForm.name.trim() ||
      !templateForm.subject.trim() ||
      !templateForm.content.trim()
    ) {
      alert("Vui lòng điền đầy đủ thông tin template");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const templateData = {
        ...templateForm,
        id: templateForm.id || Date.now(),
        createdAt: templateForm.createdAt || new Date(),
        lastUsed: templateForm.lastUsed || null,
        usageCount: templateForm.usageCount || 0,
      };

      if (templateForm.id) {
        // Update existing
        setTemplates((prev) =>
          prev.map((t) => (t.id === templateForm.id ? templateData : t))
        );
      } else {
        // Create new
        setTemplates((prev) => [...prev, templateData]);
      }

      setIsEditing(false);
      setSelectedTemplate(null);
      alert("Lưu template thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi lưu template");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa template này?")) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTemplates((prev) => prev.filter((t) => t.id !== templateId));

      if (selectedTemplate?.id === templateId) {
        setSelectedTemplate(null);
        setIsEditing(false);
      }

      alert("Xóa template thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa template");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    if (!templateForm.content.trim()) {
      alert("Vui lòng nhập nội dung template");
      return;
    }
    setShowPreview(true);
  };

  const handleSendEmail = (template) => {
    setSendForm({
      templateId: template.id,
      recipients: "all",
      courseId: "",
      customRecipients: "",
      scheduleType: "now",
      scheduledAt: "",
    });
    setShowSendModal(true);
  };

  const handleSendSubmit = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update template usage
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === sendForm.templateId
            ? { ...t, lastUsed: new Date(), usageCount: t.usageCount + 1 }
            : t
        )
      );

      setShowSendModal(false);
      alert("Gửi email thành công! Hệ thống sẽ xử lý và gửi đến người nhận.");
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi email");
    } finally {
      setLoading(false);
    }
  };

  const renderPreviewContent = () => {
    let content = templateForm.content;
    const sampleData = {
      studentName: "Nguyễn Văn A",
      courseName: "JavaScript Cơ Bản",
      enrollmentDate: "15/10/2024",
      updateDetails: "Bài học về Async/Await và Promises",
      instructorName: "Trần Thị B",
      promotionTitle: "Sale Cuối Tháng",
      discountAmount: "30",
      validUntil: "31/10/2024",
      lessonTitle: "Làm quen với DOM",
      scheduleTime: "19:00 ngày 20/10/2024",
      completionDate: "18/10/2024",
      certificateUrl: "https://example.com/certificate/123",
      approvalStatus: "Đã duyệt",
      feedback: "Nội dung khóa học rất chất lượng và phù hợp với yêu cầu.",
    };

    templateForm.variables.forEach((variable) => {
      const regex = new RegExp(`{{${variable}}}`, "g");
      content = content.replace(
        regex,
        sampleData[variable] || `{{${variable}}}`
      );
    });

    return content;
  };

  const renderTemplateList = () => (
    <div className="template-list">
      <div className="list-header">
        <h3>📧 Danh sách Template</h3>
        <button className="create-btn" onClick={handleCreateNew}>
          ➕ Tạo mới
        </button>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <div key={template.id} className="template-card">
            <div className="template-header">
              <div className="template-info">
                <h4>{template.name}</h4>
                <span className="template-type">
                  {templateTypes.find((t) => t.value === template.type)?.label}
                </span>
              </div>
              <div className="template-status">
                <span
                  className={`status-badge ${
                    template.isActive ? "active" : "inactive"
                  }`}
                >
                  {template.isActive ? "✅ Hoạt động" : "⏸️ Tạm dừng"}
                </span>
              </div>
            </div>

            <div className="template-content">
              <div className="template-subject">
                <strong>Tiêu đề:</strong> {template.subject}
              </div>
              <div className="template-preview">
                {template.content.substring(0, 100)}...
              </div>
            </div>

            <div className="template-stats">
              <div className="stat">
                <span className="stat-label">Đã dùng:</span>
                <span className="stat-value">{template.usageCount}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Lần cuối:</span>
                <span className="stat-value">
                  {template.lastUsed
                    ? template.lastUsed.toLocaleDateString("vi-VN")
                    : "Chưa dùng"}
                </span>
              </div>
            </div>

            <div className="template-actions">
              <button
                className="action-btn edit"
                onClick={() => handleEditTemplate(template)}
              >
                ✏️ Sửa
              </button>
              <button
                className="action-btn send"
                onClick={() => handleSendEmail(template)}
              >
                📧 Gửi
              </button>
              <button
                className="action-btn delete"
                onClick={() => handleDeleteTemplate(template.id)}
              >
                🗑️ Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplateEditor = () => (
    <div className="template-editor">
      <div className="editor-header">
        <h3>
          {templateForm.id ? "✏️ Chỉnh sửa Template" : "➕ Tạo Template Mới"}
        </h3>
        <button
          className="back-btn"
          onClick={() => {
            setIsEditing(false);
            setSelectedTemplate(null);
          }}
        >
          ← Quay lại
        </button>
      </div>

      <div className="editor-form">
        <div className="form-row">
          <div className="form-group">
            <label>Tên Template:</label>
            <input
              type="text"
              value={templateForm.name}
              onChange={(e) =>
                setTemplateForm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nhập tên template..."
            />
          </div>

          <div className="form-group">
            <label>Loại Template:</label>
            <select
              value={templateForm.type}
              onChange={(e) => {
                const selectedType = templateTypes.find(
                  (t) => t.value === e.target.value
                );
                setTemplateForm((prev) => ({
                  ...prev,
                  type: e.target.value,
                  variables: selectedType?.variables || [],
                }));
              }}
            >
              {templateTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Tiêu đề Email:</label>
          <input
            type="text"
            value={templateForm.subject}
            onChange={(e) =>
              setTemplateForm((prev) => ({ ...prev, subject: e.target.value }))
            }
            placeholder="Nhập tiêu đề email..."
          />
        </div>

        <div className="form-group">
          <label>Nội dung Template:</label>
          <div className="content-editor">
            <textarea
              value={templateForm.content}
              onChange={(e) =>
                setTemplateForm((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              placeholder="Nhập nội dung template..."
              rows={12}
            />

            <div className="variables-panel">
              <h4>🏷️ Biến có thể sử dụng:</h4>
              <div className="variables-list">
                {templateForm.variables.map((variable) => (
                  <button
                    key={variable}
                    className="variable-btn"
                    onClick={() => {
                      const newContent =
                        templateForm.content + `{{${variable}}}`;
                      setTemplateForm((prev) => ({
                        ...prev,
                        content: newContent,
                      }));
                    }}
                  >
                    {variable}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={templateForm.isActive}
              onChange={(e) =>
                setTemplateForm((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
            />
            Kích hoạt template
          </label>
        </div>

        <div className="editor-actions">
          <button
            className="preview-btn"
            onClick={handlePreview}
            disabled={!templateForm.content.trim()}
          >
            👁️ Xem trước
          </button>
          <button
            className="save-btn"
            onClick={handleSaveTemplate}
            disabled={loading}
          >
            {loading ? "⏳ Đang lưu..." : "💾 Lưu Template"}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStatistics = () => (
    <div className="email-statistics">
      <h3>📊 Thống kê Email</h3>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-info">
            <div className="stat-number">
              {statistics.totalSent.toLocaleString()}
            </div>
            <div className="stat-label">Tổng email đã gửi</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👀</div>
          <div className="stat-info">
            <div className="stat-number">{statistics.openRate}%</div>
            <div className="stat-label">Tỷ lệ mở email</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🖱️</div>
          <div className="stat-info">
            <div className="stat-number">{statistics.clickRate}%</div>
            <div className="stat-label">Tỷ lệ click</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <div className="stat-number">{statistics.bounceRate}%</div>
            <div className="stat-label">Tỷ lệ bounce</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="email-template-manager">
      <div className="manager-header">
        <h2>📧 Quản lý Template Email</h2>
        <p>Tạo và quản lý các mẫu email/thông báo gửi đến học viên</p>
      </div>

      <div className="manager-tabs">
        <button
          className={activeTab === "templates" ? "active" : ""}
          onClick={() => setActiveTab("templates")}
        >
          📧 Templates
        </button>
        <button
          className={activeTab === "statistics" ? "active" : ""}
          onClick={() => setActiveTab("statistics")}
        >
          📊 Thống kê
        </button>
      </div>

      <div className="manager-content">
        {activeTab === "templates" &&
          (isEditing ? renderTemplateEditor() : renderTemplateList())}
        {activeTab === "statistics" && renderStatistics()}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="modal-overlay">
          <div className="modal-content preview-modal">
            <div className="modal-header">
              <h3>👁️ Xem trước Template</h3>
              <button
                className="close-btn"
                onClick={() => setShowPreview(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="preview-email">
                <div className="email-header">
                  <strong>Tiêu đề:</strong> {templateForm.subject}
                </div>
                <div className="email-content">
                  <pre>{renderPreviewContent()}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Modal */}
      {showSendModal && (
        <div className="modal-overlay">
          <div className="modal-content send-modal">
            <div className="modal-header">
              <h3>📧 Gửi Email</h3>
              <button
                className="close-btn"
                onClick={() => setShowSendModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="send-form">
                <div className="form-group">
                  <label>Người nhận:</label>
                  <select
                    value={sendForm.recipients}
                    onChange={(e) =>
                      setSendForm((prev) => ({
                        ...prev,
                        recipients: e.target.value,
                      }))
                    }
                  >
                    <option value="all">Tất cả học viên</option>
                    <option value="course">Học viên của khóa học cụ thể</option>
                    <option value="custom">Danh sách tùy chọn</option>
                  </select>
                </div>

                {sendForm.recipients === "course" && (
                  <div className="form-group">
                    <label>Chọn khóa học:</label>
                    <select
                      value={sendForm.courseId}
                      onChange={(e) =>
                        setSendForm((prev) => ({
                          ...prev,
                          courseId: e.target.value,
                        }))
                      }
                    >
                      <option value="">-- Chọn khóa học --</option>
                      <option value="1">JavaScript Cơ Bản</option>
                      <option value="2">React Advanced</option>
                      <option value="3">Python for Beginners</option>
                    </select>
                  </div>
                )}

                {sendForm.recipients === "custom" && (
                  <div className="form-group">
                    <label>Email người nhận (cách nhau bởi dấu phẩy):</label>
                    <textarea
                      value={sendForm.customRecipients}
                      onChange={(e) =>
                        setSendForm((prev) => ({
                          ...prev,
                          customRecipients: e.target.value,
                        }))
                      }
                      placeholder="email1@example.com, email2@example.com"
                      rows={3}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Thời gian gửi:</label>
                  <select
                    value={sendForm.scheduleType}
                    onChange={(e) =>
                      setSendForm((prev) => ({
                        ...prev,
                        scheduleType: e.target.value,
                      }))
                    }
                  >
                    <option value="now">Gửi ngay</option>
                    <option value="schedule">Lên lịch</option>
                  </select>
                </div>

                {sendForm.scheduleType === "schedule" && (
                  <div className="form-group">
                    <label>Thời gian gửi:</label>
                    <input
                      type="datetime-local"
                      value={sendForm.scheduledAt}
                      onChange={(e) =>
                        setSendForm((prev) => ({
                          ...prev,
                          scheduledAt: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowSendModal(false)}
              >
                Hủy
              </button>
              <button
                className="send-btn"
                onClick={handleSendSubmit}
                disabled={loading}
              >
                {loading ? "⏳ Đang gửi..." : "📧 Gửi email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateManager;
