import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AccountInfo.css";

const AccountInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [pendingChanges, setPendingChanges] = useState({});

  const [profileData, setProfileData] = useState({
    name: user?.name || "Nguyễn Văn A",
    email: user?.email || "nguyenvana@example.com",
    phone: user?.phone || "0901234567",
    dateOfBirth: user?.dateOfBirth || "1995-05-15",
    gender: user?.gender || "male",
    idCard: user?.idCard || "123456789012",
    avatar: user?.avatar || null,
    isVerified: user?.isVerified || false,
    joinDate: user?.joinDate || "2024-01-15",
    lastLogin: user?.lastLogin || "2024-01-20 14:30",
  });

  const [accountStats, setAccountStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalComments: 0,
    totalLikes: 0,
    averageGrade: 0,
    totalStudyTime: 0,
  });

  useEffect(() => {
    // Simulate loading account statistics
    const mockStats = {
      totalCourses: 8,
      completedCourses: 3,
      totalComments: 45,
      totalLikes: 120,
      averageGrade: 8.5,
      totalStudyTime: 145,
    };

    if (user?.role === "teacher") {
      mockStats.teachingCourses = 12;
      mockStats.totalStudents = 850;
      mockStats.courseRating = 4.7;
    }

    setAccountStats(mockStats);
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    const emailChanged = profileData.email !== user?.email;
    const phoneChanged = profileData.phone !== user?.phone;

    if (emailChanged || phoneChanged) {
      // Need OTP verification
      setPendingChanges({
        email: emailChanged ? profileData.email : null,
        phone: phoneChanged ? profileData.phone : null,
      });
      setOtpStep(true);
      // Simulate sending OTP
      alert("Mã OTP đã được gửi đến email/số điện thoại mới");
    } else {
      // Save other changes directly
      saveProfile();
    }
  };

  const handleOtpVerification = () => {
    if (otpValue === "123456") {
      // Mock OTP
      saveProfile();
      setOtpStep(false);
      setOtpValue("");
      setPendingChanges({});
    } else {
      alert("Mã OTP không đúng");
    }
  };

  const saveProfile = () => {
    // In real app, send to backend
    console.log("Saving profile:", profileData);
    setIsEditing(false);
    alert("Cập nhật thông tin thành công!");
  };

  const getVerificationStatus = () => {
    if (profileData.isVerified) {
      return { text: "Đã xác thực", color: "#27ae60", icon: "✅" };
    }
    return { text: "Chưa xác thực", color: "#e74c3c", icon: "❌" };
  };

  const renderStudentStats = () => (
    <div className="stats-section">
      <h3>📊 Thống kê học tập</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">{accountStats.totalCourses}</div>
          <div className="stat-label">Khóa học đã đăng ký</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{accountStats.completedCourses}</div>
          <div className="stat-label">Khóa học hoàn thành</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">
            {Math.round(
              (accountStats.completedCourses / accountStats.totalCourses) * 100
            )}
            %
          </div>
          <div className="stat-label">Tỷ lệ hoàn thành</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{accountStats.totalStudyTime}h</div>
          <div className="stat-label">Thời gian học tập</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{accountStats.totalComments}</div>
          <div className="stat-label">Bình luận</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{accountStats.totalLikes}</div>
          <div className="stat-label">Lượt thích nhận được</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{accountStats.averageGrade}/10</div>
          <div className="stat-label">Điểm trung bình</div>
        </div>
      </div>
    </div>
  );

  const renderTeacherStats = () => (
    <div className="stats-section">
      <h3>👨‍🏫 Thống kê giảng dạy</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">{accountStats.teachingCourses}</div>
          <div className="stat-label">Khóa học đang dạy</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{accountStats.totalStudents}</div>
          <div className="stat-label">Tổng học viên</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{accountStats.courseRating}/5.0</div>
          <div className="stat-label">Đánh giá trung bình</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{accountStats.totalComments}</div>
          <div className="stat-label">Phản hồi học viên</div>
        </div>
      </div>
    </div>
  );

  const verificationStatus = getVerificationStatus();

  return (
    <div className="account-info">
      <div className="account-header">
        <h2>👤 Thông tin tài khoản</h2>
        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            ✏️ Chỉnh sửa
          </button>
        )}
      </div>

      <div className="account-content">
        <div className="profile-section">
          <div className="avatar-section">
            <div className="avatar-container">
              {profileData.avatar ? (
                <img src={profileData.avatar} alt="Avatar" className="avatar" />
              ) : (
                <div className="avatar-placeholder">
                  {profileData.name.charAt(0).toUpperCase()}
                </div>
              )}
              {isEditing && (
                <label className="avatar-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: "none" }}
                  />
                  📷
                </label>
              )}
            </div>
            <div className="user-role">
              {user?.role === "student" && "🎓 Học viên"}
              {user?.role === "teacher" && "👨‍🏫 Giảng viên"}
              {user?.role === "admin" && "👑 Quản trị viên"}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-group">
              <label>Họ và tên:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              ) : (
                <span>{profileData.name}</span>
              )}
            </div>

            <div className="info-group">
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              ) : (
                <span>
                  {profileData.email}
                  <span
                    className="verification-status"
                    style={{ color: verificationStatus.color }}
                  >
                    {verificationStatus.icon} {verificationStatus.text}
                  </span>
                </span>
              )}
            </div>

            <div className="info-group">
              <label>Số điện thoại:</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              ) : (
                <span>{profileData.phone}</span>
              )}
            </div>

            <div className="info-group">
              <label>Ngày sinh:</label>
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                />
              ) : (
                <span>
                  {new Date(profileData.dateOfBirth).toLocaleDateString(
                    "vi-VN"
                  )}
                </span>
              )}
            </div>

            <div className="info-group">
              <label>Giới tính:</label>
              {isEditing ? (
                <select
                  value={profileData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              ) : (
                <span>
                  {profileData.gender === "male" && "Nam"}
                  {profileData.gender === "female" && "Nữ"}
                  {profileData.gender === "other" && "Khác"}
                </span>
              )}
            </div>

            <div className="info-group">
              <label>CMND/CCCD:</label>
              <span>
                {profileData.idCard}
                {profileData.isVerified && (
                  <span className="verified-badge">✅ Đã xác thực</span>
                )}
              </span>
              {!profileData.isVerified && (
                <small style={{ color: "#666", display: "block" }}>
                  Không thể thay đổi sau khi xác thực
                </small>
              )}
            </div>

            <div className="info-group">
              <label>Ngày tham gia:</label>
              <span>
                {new Date(profileData.joinDate).toLocaleDateString("vi-VN")}
              </span>
            </div>

            <div className="info-group">
              <label>Lần đăng nhập cuối:</label>
              <span>{profileData.lastLogin}</span>
            </div>

            {isEditing && (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSaveChanges}>
                  💾 Lưu thay đổi
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setProfileData((prev) => ({ ...prev, ...user }));
                  }}
                >
                  ❌ Hủy
                </button>
              </div>
            )}
          </div>
        </div>

        {user?.role === "student" && renderStudentStats()}
        {user?.role === "teacher" && renderTeacherStats()}
      </div>

      {/* OTP Modal */}
      {otpStep && (
        <div className="modal-overlay">
          <div className="otp-modal">
            <h3>🔐 Xác thực OTP</h3>
            <p>
              Mã OTP đã được gửi đến{" "}
              {pendingChanges.email && `email ${pendingChanges.email}`}
              {pendingChanges.email && pendingChanges.phone && " và "}
              {pendingChanges.phone && `số điện thoại ${pendingChanges.phone}`}
            </p>
            <input
              type="text"
              placeholder="Nhập mã OTP 6 số"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              maxLength={6}
            />
            <div className="otp-actions">
              <button onClick={handleOtpVerification}>Xác thực</button>
              <button onClick={() => setOtpStep(false)}>Hủy</button>
            </div>
            <small
              style={{
                color: "#666",
                textAlign: "center",
                display: "block",
                marginTop: "1rem",
              }}
            >
              Mã demo: 123456
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
