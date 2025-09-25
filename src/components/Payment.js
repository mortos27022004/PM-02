import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePaymentStatus } from "../redux/courseSlice";

const Payment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courses, registeredCourses } = useSelector((state) => state.courses);
  const { userInfo } = useSelector((state) => state.auth);

  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [countdown, setCountdown] = useState(15);

  const course = courses.find((c) => c.id === parseInt(courseId));
  const registration = registeredCourses.find(
    (reg) =>
      reg.courseId === parseInt(courseId) && reg.userId === userInfo?.username
  );

  useEffect(() => {
    let timer;
    if (showQR && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      // Simulate successful payment
      handlePaymentSuccess();
    }
    return () => clearTimeout(timer);
  }, [showQR, countdown]);

  const handlePaymentSuccess = () => {
    setIsProcessing(true);

    setTimeout(() => {
      dispatch(
        updatePaymentStatus({
          courseId: parseInt(courseId),
          userId: userInfo?.username,
          paymentStatus: "completed",
        })
      );

      setIsProcessing(false);
      alert("🎉 Thanh toán thành công! Bạn đã có thể vào học ngay.");
      navigate(`/course/${courseId}`);
    }, 2000);
  };

  const handleStartPayment = () => {
    if (paymentMethod === "qr") {
      setShowQR(true);
      setCountdown(15); // 15 seconds demo
    } else if (paymentMethod === "card") {
      // Simulate card payment
      setIsProcessing(true);
      setTimeout(handlePaymentSuccess, 3000);
    }
  };

  if (!course) {
    return (
      <div className="main-container">
        <div className="card">
          <h3>❌ Không tìm thấy khóa học</h3>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/courses")}
          >
            ← Quay lại danh sách khóa học
          </button>
        </div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="main-container">
        <div className="card">
          <h3>❌ Bạn chưa đăng ký khóa học này</h3>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/course/${courseId}`)}
          >
            ← Quay lại khóa học
          </button>
        </div>
      </div>
    );
  }

  if (registration.paymentStatus === "completed") {
    return (
      <div className="main-container">
        <div className="card">
          <h3>✅ Bạn đã thanh toán khóa học này</h3>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/course/${courseId}`)}
          >
            📚 Vào học ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      {/* Course Info Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "2rem",
          borderRadius: "12px",
          marginBottom: "2rem",
        }}
      >
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          style={{
            background: "rgba(255,255,255,0.2)",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          ← Quay lại khóa học
        </button>

        <h1 style={{ margin: "0 0 0.5rem 0" }}>Thanh toán khóa học</h1>
        <h2 style={{ margin: "0 0 1rem 0", opacity: 0.9 }}>{course.title}</h2>

        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {course.price.toLocaleString()}đ
            </div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Giá khóa học</div>
          </div>
          <div>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {course.instructor}
            </div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Giảng viên</div>
          </div>
          <div>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {course.level}
            </div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Cấp độ</div>
          </div>
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}
      >
        {/* Payment Form */}
        <div className="card">
          <h3 style={{ margin: "0 0 1.5rem 0" }}>💳 Phương thức thanh toán</h3>

          {/* Payment Methods */}
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem",
                  border:
                    paymentMethod === "qr"
                      ? "2px solid #667eea"
                      : "2px solid #e5e7eb",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="qr"
                  checked={paymentMethod === "qr"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ marginRight: "1rem" }}
                />
                <div>
                  <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
                    📱 Quét mã QR
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    Thanh toán qua ví điện tử (MoMo, ZaloPay, VietQR)
                  </div>
                </div>
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem",
                  border:
                    paymentMethod === "card"
                      ? "2px solid #667eea"
                      : "2px solid #e5e7eb",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ marginRight: "1rem" }}
                />
                <div>
                  <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
                    💳 Thẻ tín dụng/ghi nợ
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    Visa, Mastercard, JCB
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* QR Code Display */}
          {showQR && (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                background: "#f8fafc",
                borderRadius: "8px",
                marginBottom: "2rem",
              }}
            >
              <h4 style={{ margin: "0 0 1rem 0" }}>
                📱 Quét mã QR để thanh toán
              </h4>

              {/* Mock QR Code */}
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  background: "white",
                  border: "2px solid #ddd",
                  margin: "0 auto 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                  borderRadius: "8px",
                }}
              >
                📱
              </div>

              <p style={{ margin: "0 0 1rem 0", color: "#666" }}>
                Mở ứng dụng MoMo/ZaloPay và quét mã QR
              </p>

              <div
                style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "1rem",
                  borderRadius: "6px",
                  margin: "1rem 0",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  Tự động xác nhận sau: {countdown}s
                </div>
                <div style={{ fontSize: "0.9rem" }}>
                  (Demo - sẽ tự động thanh toán thành công)
                </div>
              </div>
            </div>
          )}

          {/* Card Form */}
          {paymentMethod === "card" && !showQR && (
            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ margin: "0 0 1rem 0" }}>💳 Thông tin thẻ</h4>
              <div style={{ display: "grid", gap: "1rem" }}>
                <input
                  type="text"
                  placeholder="Số thẻ (1234 5678 9012 3456)"
                  style={{
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "1rem",
                  }}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="MM/YY"
                    style={{
                      padding: "0.8rem",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    style={{
                      padding: "0.8rem",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Tên chủ thẻ"
                  style={{
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handleStartPayment}
            disabled={isProcessing || showQR}
            style={{
              width: "100%",
              background: isProcessing ? "#9ca3af" : "#16a34a",
              color: "white",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: isProcessing || showQR ? "not-allowed" : "pointer",
              opacity: isProcessing || showQR ? 0.7 : 1,
            }}
          >
            {isProcessing
              ? "⏳ Đang xử lý..."
              : showQR
              ? "📱 Đang chờ thanh toán..."
              : `💰 Thanh toán ${course.price.toLocaleString()}đ`}
          </button>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card">
            <h3 style={{ margin: "0 0 1rem 0" }}>📋 Tóm tắt đơn hàng</h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Khóa học:</span>
                <span style={{ fontWeight: "bold" }}>
                  {course.price.toLocaleString()}đ
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                <span>Phí xử lý:</span>
                <span>0đ</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                <span>Giảm giá:</span>
                <span>0đ</span>
              </div>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #ddd",
                  margin: "0.5rem 0",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                <span>Tổng cộng:</span>
                <span style={{ color: "#16a34a" }}>
                  {course.price.toLocaleString()}đ
                </span>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: "1rem" }}>
            <h4 style={{ margin: "0 0 1rem 0" }}>🔒 Bảo mật</h4>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
              <p style={{ margin: "0 0 0.5rem 0" }}>
                ✅ Thanh toán được mã hóa SSL
              </p>
              <p style={{ margin: "0 0 0.5rem 0" }}>
                ✅ Thông tin thẻ được bảo vệ
              </p>
              <p style={{ margin: "0" }}>
                ✅ Chính sách hoàn tiền trong 30 ngày
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
