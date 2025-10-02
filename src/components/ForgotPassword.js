import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: nhập email, 2: nhập OTP, 3: đặt lại mật khẩu
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setErrors({ email: "Email không được để trống" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors({ email: "Email không hợp lệ" });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setCountdown(60);

      // Start countdown
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!formData.otp.trim()) {
      setErrors({ otp: "Vui lòng nhập mã xác thực" });
      return;
    }

    if (formData.otp.length !== 6) {
      setErrors({ otp: "Mã xác thực phải có 6 chữ số" });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "Mật khẩu mới không được để trống";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.");
      window.location.href = "/login";
    }, 1500);
  };

  const renderStep1 = () => (
    <div>
      <h2>Quên mật khẩu</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Nhập email hoặc số điện thoại để nhận mã xác thực
      </p>

      <form onSubmit={handleSendOTP}>
        <div className="form-group">
          <label>Email hoặc số điện thoại</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com hoặc 0123456789"
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Đang gửi..." : "Gửi mã xác thực"}
        </button>
      </form>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2>Xác thực tài khoản</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Mã xác thực đã được gửi đến <strong>{formData.email}</strong>
      </p>

      <form onSubmit={handleVerifyOTP}>
        <div className="form-group">
          <label>Mã xác thực (6 chữ số)</label>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="123456"
            maxLength="6"
            className={errors.otp ? "error" : ""}
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              letterSpacing: "0.5rem",
            }}
          />
          {errors.otp && <span className="error-message">{errors.otp}</span>}
        </div>

        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          {countdown > 0 ? (
            <p style={{ color: "#666" }}>Gửi lại mã sau {countdown}s</p>
          ) : (
            <button
              type="button"
              onClick={() => handleSendOTP({ preventDefault: () => {} })}
              style={{
                background: "none",
                border: "none",
                color: "#667eea",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Gửi lại mã xác thực
            </button>
          )}
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Đang xác thực..." : "Xác thực"}
        </button>
      </form>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2>Đặt lại mật khẩu</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Tạo mật khẩu mới cho tài khoản của bạn
      </p>

      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Ít nhất 6 ký tự"
            className={errors.newPassword ? "error" : ""}
          />
          {errors.newPassword && (
            <span className="error-message">{errors.newPassword}</span>
          )}
        </div>

        <div className="form-group">
          <label>Xác nhận mật khẩu mới</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu mới"
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Đang cập nhật..." : "Đặt lại mật khẩu"}
        </button>
      </form>
    </div>
  );

  return (
    <div className="login-container">
      <div className="login-form">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid #eee",
          }}
        >
          <p>
            <Link to="/login" style={{ color: "#667eea", fontWeight: "bold" }}>
              ← Quay lại trang đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
