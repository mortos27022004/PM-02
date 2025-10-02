import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/authSlice";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: userInfo?.fullName || "",
    email: userInfo?.email || "",
    phone: userInfo?.phone || "",
    bio: userInfo?.bio || "",
    avatar: userInfo?.avatar || "👤",
    birthday: userInfo?.birthday || "",
    gender: userInfo?.gender || "",
    location: userInfo?.location || "",
    website: userInfo?.website || "",
    linkedin: userInfo?.linkedin || "",
    github: userInfo?.github || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    language: "vi",
    timezone: "Asia/Ho_Chi_Minh",
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    courseReminders: true,
    communityUpdates: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showProgress: true,
    showAchievements: true,
    allowMessages: true,
    allowComments: true,
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
    setIsEditing(false);
    alert("Cập nhật thông tin thành công!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    // Mock password change
    alert("Đổi mật khẩu thành công!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handlePreferencesUpdate = () => {
    // Mock preferences update
    alert("Cập nhật cài đặt thành công!");
  };

  const handlePrivacyUpdate = () => {
    // Mock privacy update
    alert("Cập nhật cài đặt bảo mật thành công!");
  };

  const renderProfile = () => (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h3>Thông tin cá nhân</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{
            padding: "0.8rem 1.5rem",
            background: isEditing ? "#f0f0f0" : "#667eea",
            color: isEditing ? "#666" : "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {isEditing ? "Hủy" : "Chỉnh sửa"}
        </button>
      </div>

      <form onSubmit={handleProfileUpdate}>
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          {/* Avatar Section */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                fontSize: "6rem",
                marginBottom: "1rem",
                cursor: isEditing ? "pointer" : "default",
              }}
            >
              {profileData.avatar}
            </div>
            {isEditing && (
              <div>
                <p style={{ color: "#666", marginBottom: "1rem" }}>
                  Chọn avatar:
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  {["👤", "👨‍💻", "👩‍💻", "🧑‍🎓", "👨‍🏫", "👩‍🏫", "🧑‍💼", "👨‍🔬", "👩‍🔬"].map(
                    (emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() =>
                          setProfileData({ ...profileData, avatar: emoji })
                        }
                        style={{
                          fontSize: "2rem",
                          padding: "0.5rem",
                          border:
                            profileData.avatar === emoji
                              ? "3px solid #667eea"
                              : "2px solid #ddd",
                          borderRadius: "50%",
                          background: "none",
                          cursor: "pointer",
                        }}
                      >
                        {emoji}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            <div>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, fullName: e.target.value })
                  }
                  disabled={!isEditing}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: isEditing ? "white" : "#f5f5f5",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: isEditing ? "white" : "#f5f5f5",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: isEditing ? "white" : "#f5f5f5",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Ngày sinh
                </label>
                <input
                  type="date"
                  value={profileData.birthday}
                  onChange={(e) =>
                    setProfileData({ ...profileData, birthday: e.target.value })
                  }
                  disabled={!isEditing}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: isEditing ? "white" : "#f5f5f5",
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Giới tính
                </label>
                <select
                  value={profileData.gender}
                  onChange={(e) =>
                    setProfileData({ ...profileData, gender: e.target.value })
                  }
                  disabled={!isEditing}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: isEditing ? "white" : "#f5f5f5",
                  }}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Địa chỉ
                </label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) =>
                    setProfileData({ ...profileData, location: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="Thành phố, Quốc gia"
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: isEditing ? "white" : "#f5f5f5",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Website
                </label>
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) =>
                    setProfileData({ ...profileData, website: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="https://yourwebsite.com"
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: isEditing ? "white" : "#f5f5f5",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={profileData.linkedin}
                  onChange={(e) =>
                    setProfileData({ ...profileData, linkedin: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder="https://linkedin.com/in/username"
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: isEditing ? "white" : "#f5f5f5",
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Giới thiệu bản thân
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
              disabled={!isEditing}
              placeholder="Viết vài dòng giới thiệu về bản thân..."
              style={{
                width: "100%",
                minHeight: "100px",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                background: isEditing ? "white" : "#f5f5f5",
                resize: "vertical",
              }}
            />
          </div>

          {isEditing && (
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  padding: "1rem 2rem",
                  background: "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Lưu thay đổi
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );

  const renderSecurity = () => (
    <div>
      <h3 style={{ marginBottom: "2rem" }}>Bảo mật tài khoản</h3>

      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
        }}
      >
        <h4 style={{ marginBottom: "1rem" }}>Đổi mật khẩu</h4>

        <form onSubmit={handlePasswordChange}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              placeholder="Ít nhất 6 ký tự"
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Nhập lại mật khẩu mới"
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "0.8rem 1.5rem",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>

      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h4 style={{ marginBottom: "1rem" }}>Bảo mật nâng cao</h4>

        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <div>
              <strong>Xác thực 2 bước</strong>
              <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                Thêm lớp bảo mật bằng mã OTP qua SMS
              </p>
            </div>
            <button
              style={{
                padding: "0.5rem 1rem",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Bật
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <div>
              <strong>Thông báo đăng nhập</strong>
              <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                Nhận email khi có đăng nhập từ thiết bị mới
              </p>
            </div>
            <label
              style={{
                position: "relative",
                display: "inline-block",
                width: "50px",
                height: "24px",
              }}
            >
              <input
                type="checkbox"
                defaultChecked
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "#4CAF50",
                  borderRadius: "24px",
                  transition: "0.4s",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    content: '""',
                    height: "18px",
                    width: "18px",
                    right: "3px",
                    bottom: "3px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    transition: "0.4s",
                  }}
                ></span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div>
      <h3 style={{ marginBottom: "2rem" }}>Tùy chọn cá nhân</h3>

      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
        }}
      >
        <h4 style={{ marginBottom: "1rem" }}>Ngôn ngữ và Khu vực</h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Ngôn ngữ
            </label>
            <select
              value={preferences.language}
              onChange={(e) =>
                setPreferences({ ...preferences, language: e.target.value })
              }
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Múi giờ
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) =>
                setPreferences({ ...preferences, timezone: e.target.value })
              }
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
            >
              <option value="Asia/Ho_Chi_Minh">GMT+7 (Việt Nam)</option>
              <option value="Asia/Bangkok">GMT+7 (Bangkok)</option>
              <option value="Asia/Singapore">GMT+8 (Singapore)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handlePreferencesUpdate}
          style={{
            marginTop: "1rem",
            padding: "0.8rem 1.5rem",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Lưu cài đặt
        </button>
      </div>

      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h4 style={{ marginBottom: "1rem" }}>Thông báo</h4>

        {[
          {
            key: "emailNotifications",
            label: "Thông báo qua Email",
            desc: "Nhận thông báo quan trọng qua email",
          },
          {
            key: "pushNotifications",
            label: "Thông báo đẩy",
            desc: "Thông báo trên trình duyệt và thiết bị di động",
          },
          {
            key: "marketingEmails",
            label: "Email tiếp thị",
            desc: "Nhận thông tin về khóa học mới và ưu đãi",
          },
          {
            key: "weeklyDigest",
            label: "Bản tin tuần",
            desc: "Tóm tắt hoạt động và tiến độ học tập hàng tuần",
          },
          {
            key: "courseReminders",
            label: "Nhắc nhở khóa học",
            desc: "Nhắc nhở về bài học và deadline",
          },
          {
            key: "communityUpdates",
            label: "Cập nhật cộng đồng",
            desc: "Thông báo về hoạt động trong cộng đồng",
          },
        ].map((setting) => (
          <div
            key={setting.key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <strong>{setting.label}</strong>
              <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                {setting.desc}
              </p>
            </div>
            <label
              style={{
                position: "relative",
                display: "inline-block",
                width: "50px",
                height: "24px",
              }}
            >
              <input
                type="checkbox"
                checked={preferences[setting.key]}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    [setting.key]: e.target.checked,
                  })
                }
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: preferences[setting.key]
                    ? "#4CAF50"
                    : "#ccc",
                  borderRadius: "24px",
                  transition: "0.4s",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    content: '""',
                    height: "18px",
                    width: "18px",
                    left: preferences[setting.key] ? "29px" : "3px",
                    bottom: "3px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    transition: "0.4s",
                  }}
                ></span>
              </span>
            </label>
          </div>
        ))}

        <button
          onClick={handlePreferencesUpdate}
          style={{
            padding: "0.8rem 1.5rem",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Lưu cài đặt thông báo
        </button>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div>
      <h3 style={{ marginBottom: "2rem" }}>Quyền riêng tư</h3>

      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h4 style={{ marginBottom: "1rem" }}>Cài đặt hiển thị hồ sơ</h4>

        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Hiển thị hồ sơ
          </label>
          <select
            value={privacySettings.profileVisibility}
            onChange={(e) =>
              setPrivacySettings({
                ...privacySettings,
                profileVisibility: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "0.8rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          >
            <option value="public">Công khai - Mọi người có thể xem</option>
            <option value="students">
              Chỉ học viên - Học viên cùng khóa học
            </option>
            <option value="private">Riêng tư - Chỉ mình tôi</option>
          </select>
        </div>

        {[
          {
            key: "showEmail",
            label: "Hiển thị email",
            desc: "Cho phép người khác xem địa chỉ email của bạn",
          },
          {
            key: "showPhone",
            label: "Hiển thị số điện thoại",
            desc: "Cho phép người khác xem số điện thoại của bạn",
          },
          {
            key: "showProgress",
            label: "Hiển thị tiến độ học tập",
            desc: "Cho phép người khác xem tiến độ học tập của bạn",
          },
          {
            key: "showAchievements",
            label: "Hiển thị thành tích",
            desc: "Cho phép người khác xem các thành tích và chứng chỉ",
          },
          {
            key: "allowMessages",
            label: "Cho phép nhắn tin",
            desc: "Cho phép người khác gửi tin nhắn cho bạn",
          },
          {
            key: "allowComments",
            label: "Cho phép bình luận",
            desc: "Cho phép người khác bình luận trên hồ sơ của bạn",
          },
        ].map((setting) => (
          <div
            key={setting.key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <strong>{setting.label}</strong>
              <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                {setting.desc}
              </p>
            </div>
            <label
              style={{
                position: "relative",
                display: "inline-block",
                width: "50px",
                height: "24px",
              }}
            >
              <input
                type="checkbox"
                checked={privacySettings[setting.key]}
                onChange={(e) =>
                  setPrivacySettings({
                    ...privacySettings,
                    [setting.key]: e.target.checked,
                  })
                }
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: privacySettings[setting.key]
                    ? "#4CAF50"
                    : "#ccc",
                  borderRadius: "24px",
                  transition: "0.4s",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    content: '""',
                    height: "18px",
                    width: "18px",
                    left: privacySettings[setting.key] ? "29px" : "3px",
                    bottom: "3px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    transition: "0.4s",
                  }}
                ></span>
              </span>
            </label>
          </div>
        ))}

        <button
          onClick={handlePrivacyUpdate}
          style={{
            padding: "0.8rem 1.5rem",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Lưu cài đặt quyền riêng tư
        </button>
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
        <h1 style={{ margin: "0 0 1rem 0" }}>👤 Thông tin tài khoản</h1>
        <p style={{ margin: 0, color: "#666" }}>
          Quản lý thông tin cá nhân và cài đặt tài khoản của bạn
        </p>
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
            { key: "profile", label: "👤 Hồ sơ" },
            { key: "security", label: "🔒 Bảo mật" },
            { key: "preferences", label: "⚙️ Tùy chọn" },
            { key: "privacy", label: "🛡️ Quyền riêng tư" },
          ].map((tab) => (
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
      {activeTab === "profile" && renderProfile()}
      {activeTab === "security" && renderSecurity()}
      {activeTab === "preferences" && renderPreferences()}
      {activeTab === "privacy" && renderPrivacy()}
    </div>
  );
};

export default Profile;
