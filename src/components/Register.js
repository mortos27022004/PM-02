import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    idCard: "",
    role: "student",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ tên không được để trống";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Ngày sinh không được để trống";
    }

    if (!formData.gender) {
      newErrors.gender = "Giới tính không được để trống";
    }

    if (!formData.idCard.trim()) {
      newErrors.idCard = "CCCD/CMND không được để trống";
    } else if (!/^[0-9]{9,12}$/.test(formData.idCard.replace(/\s/g, ""))) {
      newErrors.idCard = "CCCD/CMND không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Bạn phải đồng ý với điều khoản sử dụng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      const step1Errors = {};
      if (!formData.fullName.trim())
        step1Errors.fullName = "Họ tên không được để trống";
      if (!formData.email.trim())
        step1Errors.email = "Email không được để trống";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        step1Errors.email = "Email không hợp lệ";
      if (!formData.phone.trim())
        step1Errors.phone = "Số điện thoại không được để trống";

      if (Object.keys(step1Errors).length === 0) {
        setStep(2);
        setErrors({});
      } else {
        setErrors(step1Errors);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(
        register({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        })
      );
    }
  };

  const renderStep1 = () => (
    <div>
      <h2>Tạo tài khoản mới</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Bước 1/2: Thông tin cá nhân
      </p>

      <div className="form-group">
        <label>Họ và tên *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Nhập họ và tên đầy đủ"
          className={errors.fullName ? "error" : ""}
        />
        {errors.fullName && (
          <span className="error-message">{errors.fullName}</span>
        )}
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Số điện thoại *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="0123456789"
          className={errors.phone ? "error" : ""}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Ngày sinh *</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className={errors.dateOfBirth ? "error" : ""}
        />
        {errors.dateOfBirth && (
          <span className="error-message">{errors.dateOfBirth}</span>
        )}
      </div>

      <div className="form-group">
        <label>Giới tính *</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={errors.gender ? "error" : ""}
        >
          <option value="">Chọn giới tính</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
        </select>
        {errors.gender && (
          <span className="error-message">{errors.gender}</span>
        )}
      </div>

      <div className="form-group">
        <label>CCCD/CMND *</label>
        <input
          type="text"
          name="idCard"
          value={formData.idCard}
          onChange={handleChange}
          placeholder="Nhập số CCCD/CMND"
          className={errors.idCard ? "error" : ""}
        />
        {errors.idCard && (
          <span className="error-message">{errors.idCard}</span>
        )}
      </div>

      <div className="form-group">
        <label>Loại tài khoản</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Học viên</option>
          <option value="teacher">Giảng viên</option>
          <option value="moderator">Kiểm duyệt viên</option>
          <option value="support">Hỗ trợ viên</option>
        </select>
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="login-btn"
        style={{ marginBottom: "1rem" }}
      >
        Tiếp tục
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2>Tạo tài khoản mới</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Bước 2/2: Bảo mật tài khoản
      </p>

      <div className="form-group">
        <label>Mật khẩu *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Ít nhất 8 ký tự"
          className={errors.password ? "error" : ""}
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label>Xác nhận mật khẩu *</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Nhập lại mật khẩu"
          className={errors.confirmPassword ? "error" : ""}
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-group">
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <span>
            Tôi đồng ý với{" "}
            <Link to="/terms" style={{ color: "#667eea" }}>
              Điều khoản sử dụng
            </Link>{" "}
            và{" "}
            <Link to="/privacy" style={{ color: "#667eea" }}>
              Chính sách bảo mật
            </Link>
          </span>
        </label>
        {errors.agreeToTerms && (
          <span className="error-message">{errors.agreeToTerms}</span>
        )}
      </div>

      {/* OAuth Registration */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ textAlign: "center", margin: "1.5rem 0", color: "#666" }}>
          Hoặc đăng ký với
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            type="button"
            onClick={() =>
              alert("Chức năng đăng ký với Google đang phát triển")
            }
            style={{
              flex: 1,
              padding: "0.8rem",
              border: "2px solid #db4437",
              borderRadius: "5px",
              background: "white",
              color: "#db4437",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            🔴 Google
          </button>
          <button
            type="button"
            onClick={() =>
              alert("Chức năng đăng ký với Facebook đang phát triển")
            }
            style={{
              flex: 1,
              padding: "0.8rem",
              border: "2px solid #4267B2",
              borderRadius: "5px",
              background: "white",
              color: "#4267B2",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            🔵 Facebook
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="btn btn-secondary"
          style={{ flex: 1 }}
        >
          Quay lại
        </button>
        <button type="submit" className="login-btn" style={{ flex: 2 }}>
          Tạo tài khoản
        </button>
      </div>
    </div>
  );

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {step === 1 ? renderStep1() : renderStep2()}

        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid #eee",
          }}
        >
          <p>
            Đã có tài khoản?{" "}
            <Link to="/login" style={{ color: "#667eea", fontWeight: "bold" }}>
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
