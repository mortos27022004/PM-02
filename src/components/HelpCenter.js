import React, { useState } from "react";
import { useSelector } from "react-redux";

const HelpCenter = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ticketForm, setTicketForm] = useState({
    category: "",
    priority: "medium",
    subject: "",
    description: "",
    attachments: [],
  });

  // Mock FAQ data
  const [faqs] = useState([
    {
      id: 1,
      category: "account",
      question: "Làm thế nào để đổi mật khẩu?",
      answer:
        "Bạn có thể đổi mật khẩu bằng cách vào Cài đặt tài khoản > Bảo mật > Đổi mật khẩu. Nhập mật khẩu cũ và mật khẩu mới, sau đó click 'Cập nhật'.",
    },
    {
      id: 2,
      category: "course",
      question: "Tôi đã thanh toán nhưng không thể truy cập khóa học?",
      answer:
        "Nếu bạn đã thanh toán nhưng chưa thể truy cập khóa học, vui lòng kiểm tra email xác nhận thanh toán. Nếu vẫn có vấn đề, liên hệ bộ phận hỗ trợ với thông tin giao dịch.",
    },
    {
      id: 3,
      category: "technical",
      question: "Video bài giảng không tải được?",
      answer:
        "Thử làm mới trang web hoặc xóa cache trình duyệt. Đảm bảo kết nối internet ổn định. Nếu vẫn gặp lỗi, hãy thử trình duyệt khác hoặc liên hệ hỗ trợ kỹ thuật.",
    },
    {
      id: 4,
      category: "payment",
      question: "Các phương thức thanh toán nào được hỗ trợ?",
      answer:
        "Chúng tôi hỗ trợ thanh toán qua thẻ tín dụng/ghi nợ (Visa, Mastercard), ví điện tử (MoMo, ZaloPay), và chuyển khoản ngân hàng.",
    },
    {
      id: 5,
      category: "certificate",
      question: "Làm thế nào để nhận chứng chỉ hoàn thành?",
      answer:
        "Sau khi hoàn thành 100% khóa học và đạt điểm tối thiểu các bài kiểm tra, chứng chỉ sẽ được tự động tạo trong mục 'Chứng chỉ' của bạn.",
    },
    {
      id: 6,
      category: "refund",
      question: "Chính sách hoàn tiền như thế nào?",
      answer:
        "Bạn có thể yêu cầu hoàn tiền trong vòng 30 ngày kể từ ngày mua nếu chưa hoàn thành quá 20% khóa học. Hoàn tiền sẽ được xử lý trong 5-7 ngày làm việc.",
    },
  ]);

  const [guides] = useState([
    {
      id: 1,
      title: "Hướng dẫn sử dụng cơ bản",
      description: "Tìm hiểu cách sử dụng các tính năng cơ bản của nền tảng",
      icon: "📚",
      steps: [
        "Đăng ký và đăng nhập tài khoản",
        "Tìm kiếm và đăng ký khóa học",
        "Học bài và làm bài tập",
        "Theo dõi tiến độ học tập",
      ],
    },
    {
      id: 2,
      title: "Thanh toán và hoàn tiền",
      description: "Hướng dẫn về quy trình thanh toán và chính sách hoàn tiền",
      icon: "💳",
      steps: [
        "Chọn phương thức thanh toán",
        "Hoàn tất giao dịch",
        "Nhận xác nhận đăng ký",
        "Yêu cầu hoàn tiền (nếu cần)",
      ],
    },
    {
      id: 3,
      title: "Sử dụng tính năng cộng đồng",
      description: "Tương tác và học hỏi cùng cộng đồng học viên",
      icon: "👥",
      steps: [
        "Tham gia thảo luận",
        "Chia sẻ kinh nghiệm",
        "Đặt câu hỏi và nhận hỗ trợ",
        "Kết nối với học viên khác",
      ],
    },
  ]);

  const categories = [
    { value: "", label: "Tất cả" },
    { value: "account", label: "Tài khoản" },
    { value: "course", label: "Khóa học" },
    { value: "payment", label: "Thanh toán" },
    { value: "technical", label: "Kỹ thuật" },
    { value: "certificate", label: "Chứng chỉ" },
    { value: "refund", label: "Hoàn tiền" },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleTicketSubmit = (e) => {
    e.preventDefault();

    if (!ticketForm.subject || !ticketForm.description) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Mock submission
    alert(
      "Yêu cầu hỗ trợ đã được gửi thành công! Chúng tôi sẽ phản hồi trong vòng 24 giờ."
    );

    setTicketForm({
      category: "",
      priority: "medium",
      subject: "",
      description: "",
      attachments: [],
    });
  };

  const renderFAQ = () => (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm câu hỏi..."
            style={{
              flex: 1,
              minWidth: "300px",
              padding: "0.8rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "0.8rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        {filteredFAQs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <h3>Không tìm thấy câu hỏi nào</h3>
            <p style={{ color: "#666" }}>
              Thử thay đổi từ khóa tìm kiếm hoặc danh mục
            </p>
          </div>
        ) : (
          filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "10px",
                marginBottom: "1rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h4 style={{ margin: "0 0 1rem 0", color: "#333" }}>
                ❓ {faq.question}
              </h4>
              <p style={{ margin: 0, lineHeight: "1.6", color: "#666" }}>
                {faq.answer}
              </p>
              <div
                style={{
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #eee",
                }}
              >
                <span
                  style={{
                    background: "#f0f0f0",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    color: "#666",
                  }}
                >
                  {categories.find((c) => c.value === faq.category)?.label ||
                    faq.category}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderGuides = () => (
    <div>
      <div className="dashboard">
        {guides.map((guide) => (
          <div key={guide.id} className="card">
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                {guide.icon}
              </div>
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{guide.title}</h3>
              <p style={{ color: "#666", margin: "0 0 1.5rem 0" }}>
                {guide.description}
              </p>
            </div>

            <div>
              <h4 style={{ margin: "0 0 1rem 0", fontSize: "1rem" }}>
                Các bước thực hiện:
              </h4>
              <ol style={{ paddingLeft: "1.5rem" }}>
                {guide.steps.map((step, index) => (
                  <li
                    key={index}
                    style={{ marginBottom: "0.5rem", color: "#666" }}
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <button
              style={{
                width: "100%",
                padding: "0.8rem",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "1rem",
              }}
            >
              Xem hướng dẫn chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h3>Gửi yêu cầu hỗ trợ</h3>
        <p style={{ color: "#666" }}>
          Nếu không tìm thấy câu trả lời, hãy gửi yêu cầu hỗ trợ cho chúng tôi
        </p>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}
      >
        <form
          onSubmit={handleTicketSubmit}
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Danh mục *
              </label>
              <select
                value={ticketForm.category}
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, category: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "1rem",
                }}
                required
              >
                <option value="">Chọn danh mục</option>
                <option value="technical">Sự cố kỹ thuật</option>
                <option value="account">Vấn đề tài khoản</option>
                <option value="payment">Thanh toán</option>
                <option value="course">Nội dung khóa học</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Độ ưu tiên
              </label>
              <select
                value={ticketForm.priority}
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, priority: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "1rem",
                }}
              >
                <option value="low">Thấp</option>
                <option value="medium">Trung bình</option>
                <option value="high">Cao</option>
                <option value="urgent">Khẩn cấp</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Tiêu đề *
            </label>
            <input
              type="text"
              value={ticketForm.subject}
              onChange={(e) =>
                setTicketForm({ ...ticketForm, subject: e.target.value })
              }
              placeholder="Mô tả ngắn gọn vấn đề của bạn"
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
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
              Mô tả chi tiết *
            </label>
            <textarea
              value={ticketForm.description}
              onChange={(e) =>
                setTicketForm({ ...ticketForm, description: e.target.value })
              }
              placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
              style={{
                width: "100%",
                minHeight: "150px",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
                resize: "vertical",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Đính kèm file (tùy chọn)
            </label>
            <input
              type="file"
              multiple
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
            />
            <p
              style={{
                fontSize: "0.8rem",
                color: "#666",
                margin: "0.5rem 0 0 0",
              }}
            >
              Hỗ trợ: JPG, PNG, PDF. Tối đa 5MB mỗi file.
            </p>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "1rem",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Gửi yêu cầu hỗ trợ
          </button>
        </form>

        <div>
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              marginBottom: "1.5rem",
            }}
          >
            <h4 style={{ margin: "0 0 1rem 0" }}>📞 Liên hệ trực tiếp</h4>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Hotline:</strong>
              <br />
              <span style={{ color: "#667eea" }}>1900 123 456</span>
              <br />
              <small style={{ color: "#666" }}>24/7 - Miễn phí</small>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Email:</strong>
              <br />
              <span style={{ color: "#667eea" }}>support@codelearn.com</span>
              <br />
              <small style={{ color: "#666" }}>Phản hồi trong 24 giờ</small>
            </div>

            <div>
              <strong>Live Chat:</strong>
              <br />
              <button
                style={{
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                }}
              >
                🗨️ Bắt đầu chat
              </button>
              <br />
              <small style={{ color: "#666" }}>Thứ 2-6: 8:00-18:00</small>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h4 style={{ margin: "0 0 1rem 0" }}>⏱️ Thời gian phản hồi</h4>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>Thấp:</span>
              <span style={{ color: "#4CAF50" }}>2-3 ngày</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>Trung bình:</span>
              <span style={{ color: "#FF9800" }}>1-2 ngày</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>Cao:</span>
              <span style={{ color: "#F44336" }}>4-8 giờ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Khẩn cấp:</span>
              <span style={{ color: "#F44336", fontWeight: "bold" }}>
                {"< 2 giờ"}
              </span>
            </div>
          </div>
        </div>
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
        <h1 style={{ margin: "0 0 1rem 0" }}>🆘 Trung tâm trợ giúp</h1>
        <p style={{ margin: 0, color: "#666" }}>
          Tìm câu trả lời cho các câu hỏi thường gặp hoặc liên hệ với đội ngũ hỗ
          trợ
        </p>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            borderBottom: "2px solid #f0f0f0",
          }}
        >
          {[
            { key: "faq", label: "❓ Câu hỏi thường gặp" },
            { key: "guides", label: "📖 Hướng dẫn sử dụng" },
            { key: "contact", label: "📞 Liên hệ hỗ trợ" },
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
      {activeTab === "faq" && renderFAQ()}
      {activeTab === "guides" && renderGuides()}
      {activeTab === "contact" && renderContact()}
    </div>
  );
};

export default HelpCenter;
