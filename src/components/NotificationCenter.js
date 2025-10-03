import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./NotificationCenter.css";

const NotificationCenter = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    inApp: true,
    email: true,
    courseUpdates: true,
    deadlines: true,
    quizResults: true,
    payments: true,
    marketing: false,
  });
  const [filter, setFilter] = useState("all");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulate notification data
    const mockNotifications = [
      {
        id: 1,
        type: "course_enrollment",
        title: "Đăng ký khóa học thành công",
        message: 'Bạn đã đăng ký thành công khóa "JavaScript cơ bản"',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        read: false,
        icon: "📚",
        priority: "normal",
        actionUrl: "/my-courses",
      },
      {
        id: 2,
        type: "deadline",
        title: "Nhắc nhở deadline",
        message: 'Bài tập "React Components" sẽ hết hạn trong 2 ngày',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        icon: "⏰",
        priority: "high",
        actionUrl: "/courses/react/assignments",
      },
      {
        id: 3,
        type: "quiz_result",
        title: "Kết quả Quiz",
        message: 'Bạn đã hoàn thành Quiz "HTML Basics" với điểm 8.5/10',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        icon: "✅",
        priority: "normal",
        actionUrl: "/progress",
      },
      {
        id: 4,
        type: "payment",
        title: "Thanh toán thành công",
        message: 'Đã thanh toán 299.000đ cho khóa "Node.js Backend"',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        read: true,
        icon: "💳",
        priority: "normal",
        actionUrl: "/payment-history",
      },
      {
        id: 5,
        type: "system",
        title: "Cập nhật hệ thống",
        message: "Hệ thống sẽ bảo trì từ 2h-4h sáng ngày mai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
        read: true,
        icon: "🔧",
        priority: "low",
        actionUrl: null,
      },
    ];

    if (user?.role === "teacher") {
      mockNotifications.push(
        {
          id: 6,
          type: "student_submission",
          title: "Bài nộp mới",
          message: 'Học viên Nguyễn Văn A đã nộp bài tập "React Hooks"',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false,
          icon: "📝",
          priority: "normal",
          actionUrl: "/teacher/submissions",
        },
        {
          id: 7,
          type: "course_approval",
          title: "Khóa học được duyệt",
          message: 'Khóa "Advanced React" đã được phê duyệt và hiển thị',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
          read: false,
          icon: "✅",
          priority: "high",
          actionUrl: "/teacher/courses",
        }
      );
    }

    if (user?.role === "admin") {
      mockNotifications.push(
        {
          id: 8,
          type: "course_review",
          title: "Khóa học cần duyệt",
          message: "Có 3 khóa học mới cần được duyệt",
          timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
          read: false,
          icon: "📋",
          priority: "high",
          actionUrl: "/admin/course-approval",
        },
        {
          id: 9,
          type: "user_report",
          title: "Báo cáo người dùng",
          message: "Có báo cáo về bình luận không phù hợp",
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          read: false,
          icon: "⚠️",
          priority: "high",
          actionUrl: "/admin/reports",
        }
      );
    }

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);
  }, [user]);

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "#f44336",
      normal: "#2196f3",
      low: "#9e9e9e",
    };
    return colors[priority] || colors.normal;
  };

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    const notification = notifications.find((n) => n.id === notificationId);
    if (notification && !notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const updateSettings = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    // In real app, send to backend
    console.log("Updated notification settings:", { [key]: value });
  };

  return (
    <div className="notification-center">
      <div className="notification-header">
        <div className="header-left">
          <h2>🔔 Trung tâm thông báo</h2>
          {unreadCount > 0 && (
            <span className="unread-count">{unreadCount}</span>
          )}
        </div>
        <div className="header-actions">
          <button onClick={markAllAsRead} className="mark-all-read">
            Đánh dấu tất cả đã đọc
          </button>
        </div>
      </div>

      <div className="notification-tabs">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Tất cả ({notifications.length})
        </button>
        <button
          className={filter === "unread" ? "active" : ""}
          onClick={() => setFilter("unread")}
        >
          Chưa đọc ({unreadCount})
        </button>
        <button
          className={filter === "read" ? "active" : ""}
          onClick={() => setFilter("read")}
        >
          Đã đọc ({notifications.length - unreadCount})
        </button>
      </div>

      <div className="notifications-content">
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <p>📭 Không có thông báo nào</p>
            </div>
          ) : (
            <div className="notifications">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    !notification.read ? "unread" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-icon">{notification.icon}</div>
                  <div className="notification-content">
                    <div className="notification-title">
                      {notification.title}
                      <div
                        className="priority-indicator"
                        style={{
                          backgroundColor: getPriorityColor(
                            notification.priority
                          ),
                        }}
                      />
                    </div>
                    <div className="notification-message">
                      {notification.message}
                    </div>
                    <div className="notification-time">
                      {formatTime(notification.timestamp)}
                    </div>
                  </div>
                  <div className="notification-actions">
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="notification-settings">
          <h3>⚙️ Cài đặt thông báo</h3>
          <div className="settings-group">
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.inApp}
                  onChange={(e) => updateSettings("inApp", e.target.checked)}
                />
                Thông báo trong ứng dụng
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.email}
                  onChange={(e) => updateSettings("email", e.target.checked)}
                />
                Thông báo qua email
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.courseUpdates}
                  onChange={(e) =>
                    updateSettings("courseUpdates", e.target.checked)
                  }
                />
                Cập nhật khóa học
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.deadlines}
                  onChange={(e) =>
                    updateSettings("deadlines", e.target.checked)
                  }
                />
                Nhắc nhở deadline
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.quizResults}
                  onChange={(e) =>
                    updateSettings("quizResults", e.target.checked)
                  }
                />
                Kết quả quiz
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.payments}
                  onChange={(e) => updateSettings("payments", e.target.checked)}
                />
                Thông báo thanh toán
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.marketing}
                  onChange={(e) =>
                    updateSettings("marketing", e.target.checked)
                  }
                />
                Thông báo khuyến mãi
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
