import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CourseEnrollment = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentStep, setEnrollmentStep] = useState(1); // 1: course info, 2: payment, 3: confirmation
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Mock course data
  const [course] = useState({
    id: 1,
    title: "Lập trình JavaScript từ Cơ bản đến Nâng cao",
    instructor: {
      name: "Nguyễn Văn A",
      avatar: "👨‍🏫",
      rating: 4.8,
      students: 2547,
      courses: 12,
    },
    thumbnail: "https://via.placeholder.com/400x250?text=JavaScript+Course",
    price: 1200000,
    originalPrice: 1800000,
    discount: 33,
    duration: "8 tuần",
    lessons: 45,
    students: 1234,
    rating: 4.7,
    reviews: 342,
    level: "Từ cơ bản đến nâng cao",
    language: "Tiếng Việt",
    certificate: true,
    description:
      "Khóa học JavaScript toàn diện từ cơ bản đến nâng cao, bao gồm ES6+, DOM manipulation, AJAX, và các framework hiện đại.",
    highlights: [
      "Học từ cơ bản đến nâng cao",
      "Thực hành với dự án thực tế",
      "Hỗ trợ 24/7 từ giảng viên",
      "Cấp chứng chỉ hoàn thành",
      "Cập nhật nội dung mới nhất",
      "Truy cập trọn đời",
    ],
    curriculum: [
      {
        section: "Phần 1: Căn bản JavaScript",
        lessons: [
          "Giới thiệu về JavaScript",
          "Biến và kiểu dữ liệu",
          "Toán tử và biểu thức",
          "Cấu trúc điều khiển",
          "Hàm và scope",
        ],
      },
      {
        section: "Phần 2: DOM và Events",
        lessons: [
          "Hiểu về DOM",
          "Truy cập và thao tác DOM",
          "Event handling",
          "Form validation",
          "AJAX và Fetch API",
        ],
      },
      {
        section: "Phần 3: ES6+ Features",
        lessons: [
          "Let, const và block scope",
          "Arrow functions",
          "Template literals",
          "Destructuring",
          "Modules",
        ],
      },
      {
        section: "Phần 4: Dự án thực tế",
        lessons: [
          "Todo App",
          "Weather App",
          "Shopping Cart",
          "Chat Application",
          "Portfolio Website",
        ],
      },
    ],
    requirements: [
      "Máy tính có kết nối internet",
      "Không cần kinh nghiệm lập trình trước đó",
      "Tư duy logic cơ bản",
      "Thời gian học 2-3 giờ/tuần",
    ],
    outcomes: [
      "Thành thạo JavaScript từ cơ bản đến nâng cao",
      "Xây dựng được ứng dụng web tương tác",
      "Hiểu và sử dụng ES6+ features",
      "Làm việc với APIs và AJAX",
      "Chuẩn bị tốt cho việc học frameworks",
    ],
  });

  const [availableCoupons] = useState([
    {
      code: "NEWBIE20",
      discount: 20,
      description: "Giảm 20% cho học viên mới",
      type: "percent",
    },
    {
      code: "SAVE100K",
      discount: 100000,
      description: "Giảm 100,000 VNĐ",
      type: "amount",
    },
    {
      code: "EARLYBIRD",
      discount: 30,
      description: "Giảm 30% đăng ký sớm",
      type: "percent",
    },
  ]);

  const paymentMethods = [
    { value: "credit", label: "Thẻ tín dụng/ghi nợ", icon: "💳", fee: 0 },
    { value: "momo", label: "Ví MoMo", icon: "📱", fee: 0 },
    { value: "zalopay", label: "ZaloPay", icon: "💰", fee: 0 },
    { value: "bank", label: "Chuyển khoản ngân hàng", icon: "🏦", fee: 0 },
    { value: "vnpay", label: "VNPay", icon: "🔷", fee: 0 },
  ];

  const calculateTotal = () => {
    let total = course.price;

    if (appliedCoupon) {
      if (appliedCoupon.type === "percent") {
        total = total * (1 - appliedCoupon.discount / 100);
      } else {
        total = total - appliedCoupon.discount;
      }
    }

    const selectedMethod = paymentMethods.find(
      (m) => m.value === paymentMethod
    );
    total += selectedMethod?.fee || 0;

    return Math.max(0, total);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const applyCoupon = () => {
    const coupon = availableCoupons.find(
      (c) => c.code === couponCode.toUpperCase()
    );
    if (coupon) {
      setAppliedCoupon(coupon);
      alert(`Áp dụng mã giảm giá thành công! ${coupon.description}`);
    } else {
      alert("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const handleEnrollment = () => {
    if (enrollmentStep === 3) {
      alert("Đăng ký khóa học thành công! Chào mừng bạn đến với khóa học.");
      setEnrollmentStep(1);
    } else {
      setEnrollmentStep(enrollmentStep + 1);
    }
  };

  const renderCourseInfo = () => (
    <div
      style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}
    >
      {/* Course Details */}
      <div>
        <img
          src={course.thumbnail}
          alt={course.title}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "1.5rem",
          }}
        />

        <h2 style={{ marginBottom: "1rem" }}>{course.title}</h2>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
            color: "#666",
          }}
        >
          <span>
            ⭐ {course.rating} ({course.reviews} đánh giá)
          </span>
          <span>👥 {course.students} học viên</span>
          <span>🕒 {course.duration}</span>
          <span>📚 {course.lessons} bài học</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
            padding: "1rem",
            background: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontSize: "3rem" }}>{course.instructor.avatar}</div>
          <div>
            <h4 style={{ margin: "0 0 0.5rem 0" }}>{course.instructor.name}</h4>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
              ⭐ {course.instructor.rating} • {course.instructor.students} học
              viên • {course.instructor.courses} khóa học
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>Mô tả khóa học</h3>
          <p style={{ lineHeight: "1.6", color: "#666" }}>
            {course.description}
          </p>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>Điểm nổi bật</h3>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "0.5rem",
            }}
          >
            {course.highlights.map((highlight, index) => (
              <li
                key={index}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span style={{ color: "#4CAF50", fontWeight: "bold" }}>✓</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>Chương trình học</h3>
          {course.curriculum.map((section, index) => (
            <div key={index} style={{ marginBottom: "1.5rem" }}>
              <h4
                style={{
                  background: "#667eea",
                  color: "white",
                  padding: "0.8rem",
                  margin: "0 0 0.5rem 0",
                  borderRadius: "6px",
                }}
              >
                {section.section}
              </h4>
              <ul style={{ marginLeft: "1rem" }}>
                {section.lessons.map((lesson, lessonIndex) => (
                  <li
                    key={lessonIndex}
                    style={{ marginBottom: "0.3rem", color: "#666" }}
                  >
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          <div>
            <h3>Yêu cầu</h3>
            <ul>
              {course.requirements.map((req, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "0.5rem", color: "#666" }}
                >
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Kết quả đạt được</h3>
            <ul>
              {course.outcomes.map((outcome, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "0.5rem", color: "#666" }}
                >
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Enrollment Card */}
      <div style={{ position: "sticky", top: "2rem" }}>
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "15px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            border: "1px solid #eee",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#667eea",
                }}
              >
                {formatPrice(course.price)}
              </span>
              {course.originalPrice > course.price && (
                <span
                  style={{
                    fontSize: "1.2rem",
                    textDecoration: "line-through",
                    color: "#999",
                  }}
                >
                  {formatPrice(course.originalPrice)}
                </span>
              )}
            </div>

            {course.discount > 0 && (
              <div
                style={{
                  background: "#FF4444",
                  color: "white",
                  padding: "0.3rem 1rem",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  display: "inline-block",
                }}
              >
                Giảm {course.discount}%
              </div>
            )}
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>📅 Thời lượng:</span>
              <span style={{ fontWeight: "bold" }}>{course.duration}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>📚 Bài học:</span>
              <span style={{ fontWeight: "bold" }}>{course.lessons}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>🌐 Ngôn ngữ:</span>
              <span style={{ fontWeight: "bold" }}>{course.language}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>📜 Chứng chỉ:</span>
              <span style={{ fontWeight: "bold", color: "#4CAF50" }}>
                {course.certificate ? "Có" : "Không"}
              </span>
            </div>
          </div>

          <button
            onClick={handleEnrollment}
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "1rem",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
          >
            🚀 Đăng ký ngay
          </button>

          <div
            style={{ textAlign: "center", fontSize: "0.9rem", color: "#666" }}
          >
            <p>💰 Hoàn tiền 100% trong 30 ngày</p>
            <p>🔒 Truy cập trọn đời</p>
            <p>📱 Học trên mọi thiết bị</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "15px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ marginBottom: "1.5rem" }}>📋 Thông tin đơn hàng</h3>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            padding: "1rem",
            background: "#f8f9fa",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          <img
            src={course.thumbnail}
            alt={course.title}
            style={{
              width: "100px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: "0 0 0.5rem 0" }}>{course.title}</h4>
            <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
              Giảng viên: {course.instructor.name}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "#667eea",
              }}
            >
              {formatPrice(course.price)}
            </div>
            {course.originalPrice > course.price && (
              <div
                style={{
                  fontSize: "0.9rem",
                  textDecoration: "line-through",
                  color: "#999",
                }}
              >
                {formatPrice(course.originalPrice)}
              </div>
            )}
          </div>
        </div>

        {/* Coupon Section */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h4>🎟️ Mã giảm giá</h4>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Nhập mã giảm giá"
              style={{
                flex: 1,
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
            />
            <button
              onClick={applyCoupon}
              style={{
                padding: "0.8rem 1.5rem",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Áp dụng
            </button>
          </div>

          {appliedCoupon && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.8rem",
                background: "#e8f5e8",
                borderRadius: "6px",
                border: "1px solid #4CAF50",
              }}
            >
              <span style={{ color: "#4CAF50", fontWeight: "bold" }}>
                ✓ {appliedCoupon.code}: {appliedCoupon.description}
              </span>
              <button
                onClick={removeCoupon}
                style={{
                  background: "none",
                  border: "none",
                  color: "#666",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                ✕
              </button>
            </div>
          )}

          <div
            style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}
          >
            Mã có sẵn: {availableCoupons.map((c) => c.code).join(", ")}
          </div>
        </div>

        {/* Payment Summary */}
        <div
          style={{
            padding: "1rem",
            background: "#f8f9fa",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            <span>Giá khóa học:</span>
            <span>{formatPrice(course.price)}</span>
          </div>

          {appliedCoupon && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
                color: "#4CAF50",
              }}
            >
              <span>Giảm giá ({appliedCoupon.code}):</span>
              <span>
                -
                {appliedCoupon.type === "percent"
                  ? `${appliedCoupon.discount}%`
                  : formatPrice(appliedCoupon.discount)}
              </span>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            <span>Phí thanh toán:</span>
            <span>
              {formatPrice(
                paymentMethods.find((m) => m.value === paymentMethod)?.fee || 0
              )}
            </span>
          </div>

          <hr
            style={{
              margin: "1rem 0",
              border: "none",
              borderTop: "1px solid #ddd",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#667eea",
            }}
          >
            <span>Tổng cộng:</span>
            <span>{formatPrice(calculateTotal())}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h4>💳 Phương thức thanh toán</h4>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {paymentMethods.map((method) => (
              <label
                key={method.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  border:
                    paymentMethod === method.value
                      ? "2px solid #667eea"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background:
                    paymentMethod === method.value ? "#f8f9ff" : "white",
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={paymentMethod === method.value}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ margin: 0 }}
                />
                <span style={{ fontSize: "1.5rem" }}>{method.icon}</span>
                <span style={{ flex: 1 }}>{method.label}</span>
                {method.fee > 0 && (
                  <span style={{ fontSize: "0.9rem", color: "#666" }}>
                    +{formatPrice(method.fee)}
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => setEnrollmentStep(1)}
          style={{
            flex: 1,
            padding: "1rem",
            background: "#f0f0f0",
            color: "#666",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Quay lại
        </button>
        <button
          onClick={handleEnrollment}
          style={{
            flex: 2,
            padding: "1rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          💳 Thanh toán {formatPrice(calculateTotal())}
        </button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <div
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🎉</div>

        <h2 style={{ marginBottom: "1rem", color: "#4CAF50" }}>
          Thanh toán thành công!
        </h2>

        <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "2rem" }}>
          Chúc mừng bạn đã đăng ký thành công khóa học
          <br />
          <strong>"{course.title}"</strong>
        </p>

        <div
          style={{
            background: "#f8f9fa",
            padding: "1.5rem",
            borderRadius: "10px",
            marginBottom: "2rem",
            textAlign: "left",
          }}
        >
          <h4 style={{ marginBottom: "1rem" }}>📋 Thông tin đăng ký</h4>
          <div style={{ display: "grid", gap: "0.5rem", fontSize: "0.9rem" }}>
            <div>
              <strong>Học viên:</strong> {userInfo?.fullName || "Người dùng"}
            </div>
            <div>
              <strong>Email:</strong> {userInfo?.email || "user@example.com"}
            </div>
            <div>
              <strong>Khóa học:</strong> {course.title}
            </div>
            <div>
              <strong>Giảng viên:</strong> {course.instructor.name}
            </div>
            <div>
              <strong>Số tiền:</strong> {formatPrice(calculateTotal())}
            </div>
            <div>
              <strong>Ngày đăng ký:</strong>{" "}
              {new Date().toLocaleDateString("vi-VN")}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h4>🎯 Bước tiếp theo</h4>
          <ul style={{ textAlign: "left", lineHeight: "2" }}>
            <li>Kiểm tra email để nhận hướng dẫn chi tiết</li>
            <li>Truy cập khóa học trong mục "Khóa học của tôi"</li>
            <li>Tham gia group Facebook của khóa học</li>
            <li>Bắt đầu học bài đầu tiên ngay hôm nay</li>
          </ul>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => alert("Chuyển đến khóa học...")}
            style={{
              flex: 1,
              padding: "1rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🚀 Bắt đầu học ngay
          </button>
          <button
            onClick={() => setEnrollmentStep(1)}
            style={{
              flex: 1,
              padding: "1rem",
              background: "#f0f0f0",
              color: "#666",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            📚 Xem khóa học khác
          </button>
        </div>
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        marginBottom: "2rem",
      }}
    >
      {[
        { step: 1, label: "Thông tin khóa học", icon: "📚" },
        { step: 2, label: "Thanh toán", icon: "💳" },
        { step: 3, label: "Hoàn thành", icon: "✅" },
      ].map((item, index) => (
        <div
          key={item.step}
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: enrollmentStep >= item.step ? "#667eea" : "#f0f0f0",
              color: enrollmentStep >= item.step ? "white" : "#666",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {enrollmentStep > item.step ? "✓" : item.step}
          </div>
          <span
            style={{
              fontWeight: enrollmentStep === item.step ? "bold" : "normal",
              color: enrollmentStep >= item.step ? "#667eea" : "#666",
            }}
          >
            {item.icon} {item.label}
          </span>
          {index < 2 && (
            <div
              style={{
                width: "50px",
                height: "2px",
                background: enrollmentStep > item.step ? "#667eea" : "#f0f0f0",
              }}
            />
          )}
        </div>
      ))}
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
        <h1 style={{ margin: "0 0 0.5rem 0" }}>🎓 Đăng ký khóa học</h1>
        <p style={{ margin: 0, color: "#666" }}>
          Đầu tư cho tương lai của bạn với khóa học chất lượng cao
        </p>
      </div>

      {renderStepIndicator()}

      {enrollmentStep === 1 && renderCourseInfo()}
      {enrollmentStep === 2 && renderPayment()}
      {enrollmentStep === 3 && renderConfirmation()}
    </div>
  );
};

export default CourseEnrollment;
