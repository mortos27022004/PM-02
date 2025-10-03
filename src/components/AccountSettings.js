import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AccountSettings.css";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [showQR, setShowQR] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      courseUpdates: true,
      deadlines: true,
      quizResults: true,
      payments: true,
      marketing: false,
      weeklyReport: true,
    },
    inApp: {
      courseUpdates: true,
      deadlines: true,
      quizResults: true,
      payments: true,
      marketing: false,
      comments: true,
      mentions: true,
    },
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public", // public, friends, private
    showProgress: true,
    showCourses: true,
    showAchievements: true,
    allowMessages: true,
    showOnlineStatus: true,
  });

  const [securityLogs, setSecurityLogs] = useState([]);

  useEffect(() => {
    // Load user settings
    setTwoFAEnabled(user?.twoFA || false);

    // Mock security logs
    setSecurityLogs([
      {
        id: 1,
        action: "Đăng nhập",
        device: "Chrome on Windows",
        ip: "192.168.1.1",
        location: "Hà Nội, Việt Nam",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        status: "success",
      },
      {
        id: 2,
        action: "Đổi mật khẩu",
        device: "Chrome on Windows",
        ip: "192.168.1.1",
        location: "Hà Nội, Việt Nam",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        status: "success",
      },
      {
        id: 3,
        action: "Đăng nhập thất bại",
        device: "Unknown Device",
        ip: "103.1.2.3",
        location: "TP.HCM, Việt Nam",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        status: "failed",
      },
    ]);
  }, [user]);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
    };
  };

  const handlePasswordChange = () => {
    const validation = validatePassword(passwordData.newPassword);

    if (!validation.isValid) {
      alert("Mật khẩu không đáp ứng yêu cầu bảo mật");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Xác nhận mật khẩu không khớp");
      return;
    }

    if (passwordData.currentPassword === "") {
      alert("Vui lòng nhập mật khẩu hiện tại");
      return;
    }

    // In real app, verify current password with backend
    if (passwordData.currentPassword !== "oldpassword") {
      alert("Mật khẩu hiện tại không đúng");
      return;
    }

    // Change password
    console.log("Changing password...");
    alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");

    // Clear form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // In real app, invalidate all sessions except current
  };

  const handleEnable2FA = () => {
    // Generate QR code for 2FA setup
    const secret = "JBSWY3DPEHPK3PXP"; // Mock secret
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/LearnPlatform:${user?.email}?secret=${secret}&issuer=LearnPlatform`;
    setQrCode(qrCodeUrl);
    setShowQR(true);
  };

  const handleConfirm2FA = () => {
    if (twoFACode === "123456") {
      // Mock verification
      setTwoFAEnabled(true);
      setShowQR(false);
      setTwoFACode("");
      alert("2FA đã được kích hoạt thành công!");
    } else {
      alert("Mã xác thực không đúng");
    }
  };

  const handleDisable2FA = () => {
    if (window.confirm("Bạn có chắc muốn tắt xác thực 2 bước?")) {
      setTwoFAEnabled(false);
      alert("2FA đã được tắt");
    }
  };

  const updateNotificationSetting = (type, key, value) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value,
      },
    }));
    console.log("Updated notification setting:", { type, key, value });
  };

  const updatePrivacySetting = (key, value) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log("Updated privacy setting:", { key, value });
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleString("vi-VN");
  };

  const passwordValidation = validatePassword(passwordData.newPassword);

  return (
    <div className="account-settings">
      <div className="settings-header">
        <h2>⚙️ Cài đặt tài khoản</h2>
      </div>

      <div className="settings-content">
        {/* Security Section */}
        <div className="settings-section">
          <h3>🔐 Bảo mật</h3>

          {/* Change Password */}
          <div className="setting-group">
            <h4>Đổi mật khẩu</h4>
            <div className="password-form">
              <div className="form-group">
                <label>Mật khẩu hiện tại:</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>

              <div className="form-group">
                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  placeholder="Nhập mật khẩu mới"
                />
              </div>

              <div className="form-group">
                <label>Xác nhận mật khẩu mới:</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>

              {passwordData.newPassword && (
                <div className="password-requirements">
                  <p>Yêu cầu mật khẩu:</p>
                  <ul>
                    <li
                      className={
                        passwordValidation.minLength ? "valid" : "invalid"
                      }
                    >
                      ≥ 8 ký tự
                    </li>
                    <li
                      className={
                        passwordValidation.hasUpper ? "valid" : "invalid"
                      }
                    >
                      Có chữ hoa
                    </li>
                    <li
                      className={
                        passwordValidation.hasLower ? "valid" : "invalid"
                      }
                    >
                      Có chữ thường
                    </li>
                    <li
                      className={
                        passwordValidation.hasNumber ? "valid" : "invalid"
                      }
                    >
                      Có số
                    </li>
                    <li
                      className={
                        passwordValidation.hasSpecial ? "valid" : "invalid"
                      }
                    >
                      Có ký tự đặc biệt
                    </li>
                  </ul>
                </div>
              )}

              <button
                className="change-password-btn"
                onClick={handlePasswordChange}
                disabled={
                  !passwordValidation.isValid ||
                  passwordData.newPassword !== passwordData.confirmPassword
                }
              >
                🔒 Đổi mật khẩu
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="setting-group">
            <h4>Xác thực 2 bước (2FA)</h4>
            <div className="two-fa-setting">
              <div className="setting-item">
                <span>Trạng thái 2FA:</span>
                <span
                  className={`status ${twoFAEnabled ? "enabled" : "disabled"}`}
                >
                  {twoFAEnabled ? "✅ Đã bật" : "❌ Đã tắt"}
                </span>
              </div>

              {!twoFAEnabled ? (
                <button className="enable-2fa-btn" onClick={handleEnable2FA}>
                  🔐 Bật 2FA
                </button>
              ) : (
                <button className="disable-2fa-btn" onClick={handleDisable2FA}>
                  🔓 Tắt 2FA
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <h3>🔔 Cài đặt thông báo</h3>

          <div className="notification-settings">
            <div className="notification-group">
              <h4>📧 Thông báo Email</h4>
              {Object.entries(notificationSettings.email).map(
                ([key, value]) => (
                  <div key={key} className="setting-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          updateNotificationSetting(
                            "email",
                            key,
                            e.target.checked
                          )
                        }
                      />
                      {key === "courseUpdates" && "Cập nhật khóa học"}
                      {key === "deadlines" && "Nhắc nhở deadline"}
                      {key === "quizResults" && "Kết quả quiz"}
                      {key === "payments" && "Thông báo thanh toán"}
                      {key === "marketing" && "Thông báo khuyến mãi"}
                      {key === "weeklyReport" && "Báo cáo tuần"}
                    </label>
                  </div>
                )
              )}
            </div>

            <div className="notification-group">
              <h4>📱 Thông báo trong ứng dụng</h4>
              {Object.entries(notificationSettings.inApp).map(
                ([key, value]) => (
                  <div key={key} className="setting-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          updateNotificationSetting(
                            "inApp",
                            key,
                            e.target.checked
                          )
                        }
                      />
                      {key === "courseUpdates" && "Cập nhật khóa học"}
                      {key === "deadlines" && "Nhắc nhở deadline"}
                      {key === "quizResults" && "Kết quả quiz"}
                      {key === "payments" && "Thông báo thanh toán"}
                      {key === "marketing" && "Thông báo khuyến mãi"}
                      {key === "comments" && "Bình luận mới"}
                      {key === "mentions" && "Nhắc đến bạn"}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="settings-section">
          <h3>🔒 Quyền riêng tư</h3>

          <div className="privacy-settings">
            <div className="setting-item">
              <label>Hiển thị hồ sơ:</label>
              <select
                value={privacySettings.profileVisibility}
                onChange={(e) =>
                  updatePrivacySetting("profileVisibility", e.target.value)
                }
              >
                <option value="public">Công khai</option>
                <option value="friends">Chỉ bạn bè</option>
                <option value="private">Riêng tư</option>
              </select>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={privacySettings.showProgress}
                  onChange={(e) =>
                    updatePrivacySetting("showProgress", e.target.checked)
                  }
                />
                Hiển thị tiến độ học tập
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={privacySettings.showCourses}
                  onChange={(e) =>
                    updatePrivacySetting("showCourses", e.target.checked)
                  }
                />
                Hiển thị khóa học đã tham gia
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={privacySettings.showAchievements}
                  onChange={(e) =>
                    updatePrivacySetting("showAchievements", e.target.checked)
                  }
                />
                Hiển thị thành tích
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={privacySettings.allowMessages}
                  onChange={(e) =>
                    updatePrivacySetting("allowMessages", e.target.checked)
                  }
                />
                Cho phép nhận tin nhắn
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={privacySettings.showOnlineStatus}
                  onChange={(e) =>
                    updatePrivacySetting("showOnlineStatus", e.target.checked)
                  }
                />
                Hiển thị trạng thái online
              </label>
            </div>
          </div>
        </div>

        {/* Security Logs */}
        <div className="settings-section">
          <h3>📋 Nhật ký bảo mật</h3>

          <div className="security-logs">
            {securityLogs.map((log) => (
              <div key={log.id} className={`log-item ${log.status}`}>
                <div className="log-action">
                  {log.action}
                  <span className={`log-status ${log.status}`}>
                    {log.status === "success" ? "✅" : "❌"}
                  </span>
                </div>
                <div className="log-details">
                  <span>📱 {log.device}</span>
                  <span>🌐 {log.ip}</span>
                  <span>📍 {log.location}</span>
                  <span>🕒 {formatTimestamp(log.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2FA Setup Modal */}
      {showQR && (
        <div className="modal-overlay">
          <div className="qr-modal">
            <h3>🔐 Thiết lập xác thực 2 bước</h3>
            <p>
              Quét mã QR bằng ứng dụng Authenticator (Google Authenticator,
              Authy, etc.)
            </p>

            <div className="qr-code">
              <img src={qrCode} alt="QR Code for 2FA" />
            </div>

            <p>Nhập mã 6 số từ ứng dụng để xác nhận:</p>
            <input
              type="text"
              placeholder="000000"
              value={twoFACode}
              onChange={(e) => setTwoFACode(e.target.value)}
              maxLength={6}
            />

            <div className="qr-actions">
              <button onClick={handleConfirm2FA}>Xác nhận</button>
              <button onClick={() => setShowQR(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
