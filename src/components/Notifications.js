import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Notifications = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);

  // Mock notifications data
  const [allNotifications] = useState([
    {
      id: 1,
      type: "course",
      title: "Khóa học mới: Advanced React Patterns",
      message:
        "Khóa học Advanced React Patterns vừa được phát hành. Đăng ký ngay để học các pattern nâng cao!",
      timestamp: "2025-10-02T10:30:00",
      read: false,
      icon: "📚",
      action: {
        text: "Xem khóa học",
        link: "/course/6",
      },
    },
    {
      id: 2,
      type: "assignment",
      title: "Bài tập React Hooks đã được chấm",
      message:
        "Bài tập 'React Hooks' của bạn đã được chấm điểm. Điểm số: 85/100",
      timestamp: "2025-10-02T09:15:00",
      read: false,
      icon: "📝",
      action: {
        text: "Xem kết quả",
        link: "/assignments/1",
      },
    },
    {
      id: 3,
      type: "system",
      title: "Cập nhật hệ thống",
      message:
        "Hệ thống sẽ được bảo trì từ 23:00 - 02:00 ngày mai. Vui lòng hoàn thành bài học trước thời gian này.",
      timestamp: "2025-10-01T16:45:00",
      read: true,
      icon: "⚙️",
    },
    {
      id: 4,
      type: "community",
      title: "Bạn có mention mới trong cộng đồng",
      message:
        "Nguyễn Văn A đã tag bạn trong cuộc thảo luận 'Best practices for React hooks'",
      timestamp: "2025-10-01T14:20:00",
      read: true,
      icon: "💬",
      action: {
        text: "Xem thảo luận",
        link: "/community/post/123",
      },
    },
    {
      id: 5,
      type: "achievement",
      title: "Chúc mừng! Bạn đã đạt huy hiệu mới",
      message:
        "Bạn vừa mở khóa huy hiệu 'Người học kiên trì' sau 30 ngày học liên tục!",
      timestamp: "2025-09-30T20:10:00",
      read: true,
      icon: "🏆",
      action: {
        text: "Xem huy hiệu",
        link: "/achievements",
      },
    },
    {
      id: 6,
      type: "payment",
      title: "Thanh toán thành công",
      message:
        "Bạn đã thanh toán thành công cho khóa học 'JavaScript Advanced'. Chúc bạn học tập vui vẻ!",
      timestamp: "2025-09-29T11:30:00",
      read: true,
      icon: "💳",
    },
    {
      id: 7,
      type: "reminder",
      title: "Nhắc nhở: Bài học hôm nay",
      message:
        "Bạn có 2 bài học được lên lịch cho hôm nay. Đừng quên hoàn thành nhé!",
      timestamp: "2025-09-28T08:00:00",
      read: true,
      icon: "⏰",
      action: {
        text: "Xem lịch học",
        link: "/today",
      },
    },
  ]);

  useEffect(() => {
    filterNotifications();
  }, [activeTab]);

  const filterNotifications = () => {
    let filtered = [...allNotifications];

    switch (activeTab) {
      case "unread":
        filtered = filtered.filter((n) => !n.read);
        break;
      case "course":
        filtered = filtered.filter((n) => n.type === "course");
        break;
      case "assignment":
        filtered = filtered.filter((n) => n.type === "assignment");
        break;
      case "system":
        filtered = filtered.filter((n) => n.type === "system");
        break;
      default:
        // "all" case - show all notifications
        break;
    }

    setNotifications(filtered);
  };

  const markAsRead = (notificationId) => {
    const updatedNotifications = allNotifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    // In real app, this would update the global state
    filterNotifications();
  };

  const markAllAsRead = () => {
    // In real app, this would update all notifications to read
    alert("Đã đánh dấu tất cả thông báo là đã đọc");
  };

  const deleteNotification = (notificationId) => {
    if (window.confirm("Bạn có chắc muốn xóa thông báo này?")) {
      // In real app, this would remove from global state
      const filtered = notifications.filter((n) => n.id !== notificationId);
      setNotifications(filtered);
    }
  };

  const getTypeText = (type) => {
    const typeMap = {
      course: "Khóa học",
      assignment: "Bài tập",
      system: "Hệ thống",
      community: "Cộng đồng",
      achievement: "Thành tích",
      payment: "Thanh toán",
      reminder: "Nhắc nhở",
    };
    return typeMap[type] || type;
  };

  const getTypeColor = (type) => {
    const colorMap = {
      course: "#667eea",
      assignment: "#FF9800",
      system: "#F44336",
      community: "#4CAF50",
      achievement: "#9C27B0",
      payment: "#2196F3",
      reminder: "#FF5722",
    };
    return colorMap[type] || "#666";
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - time) / (1000 * 60));
      return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ngày trước`;
    }
  };

  const unreadCount = allNotifications.filter((n) => !n.read).length;

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ margin: "0 0 0.5rem 0" }}>🔔 Thông báo</h1>
            <p style={{ margin: 0, color: "#666" }}>
              Bạn có {unreadCount} thông báo chưa đọc
            </p>
          </div>

          <button
            onClick={markAllAsRead}
            style={{
              padding: "0.8rem 1.5rem",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Đánh dấu tất cả đã đọc
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            borderBottom: "2px solid #f0f0f0",
            flexWrap: "wrap",
          }}
        >
          {[
            { key: "all", label: "Tất cả", count: allNotifications.length },
            { key: "unread", label: "Chưa đọc", count: unreadCount },
            {
              key: "course",
              label: "Khóa học",
              count: allNotifications.filter((n) => n.type === "course").length,
            },
            {
              key: "assignment",
              label: "Bài tập",
              count: allNotifications.filter((n) => n.type === "assignment")
                .length,
            },
            {
              key: "system",
              label: "Hệ thống",
              count: allNotifications.filter((n) => n.type === "system").length,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "1rem 1.5rem",
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
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  style={{
                    background: activeTab === tab.key ? "#667eea" : "#ccc",
                    color: "white",
                    borderRadius: "10px",
                    padding: "0.2rem 0.5rem",
                    fontSize: "0.7rem",
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div>
        {notifications.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
            <h3>Không có thông báo nào</h3>
            <p style={{ color: "#666" }}>
              {activeTab === "unread"
                ? "Bạn đã đọc hết tất cả thông báo!"
                : "Chưa có thông báo nào trong danh mục này."}
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "10px",
                marginBottom: "1rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                border: notification.read ? "none" : "2px solid #667eea",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ fontSize: "2rem", flexShrink: 0 }}>
                  {notification.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: "0 0 0.3rem 0" }}>
                        {notification.title}
                        {!notification.read && (
                          <span
                            style={{
                              background: "#FF4444",
                              color: "white",
                              borderRadius: "50%",
                              width: "8px",
                              height: "8px",
                              display: "inline-block",
                              marginLeft: "0.5rem",
                            }}
                          />
                        )}
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            background: getTypeColor(notification.type),
                            color: "white",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "12px",
                            fontSize: "0.7rem",
                          }}
                        >
                          {getTypeText(notification.type)}
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "#666" }}>
                          {formatTime(notification.timestamp)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteNotification(notification.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#999",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        padding: "0.2rem",
                      }}
                      title="Xóa thông báo"
                    >
                      ✕
                    </button>
                  </div>

                  <p
                    style={{
                      margin: "0 0 1rem 0",
                      lineHeight: "1.5",
                      color: "#333",
                    }}
                  >
                    {notification.message}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    {notification.action && (
                      <button
                        onClick={() =>
                          (window.location.href = notification.action.link)
                        }
                        style={{
                          padding: "0.5rem 1rem",
                          background: "#667eea",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                        }}
                      >
                        {notification.action.text}
                      </button>
                    )}

                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "#f0f0f0",
                          color: "#666",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                        }}
                      >
                        Đánh dấu đã đọc
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
