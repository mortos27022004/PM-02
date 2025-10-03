import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./SupportCenter.css";

const SupportCenter = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("faq");
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isAgentOnline, setIsAgentOnline] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: "",
    category: "",
    content: "",
    attachments: [],
  });
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  const [faqData] = useState([
    {
      id: 1,
      question: "Làm thế nào để đăng ký khóa học?",
      answer:
        'Để đăng ký khóa học, bạn cần đăng nhập vào tài khoản, tìm khóa học mong muốn và nhấn "Đăng ký ngay". Sau đó hoàn thành thanh toán để truy cập khóa học.',
      category: "Đăng ký",
      views: 1250,
    },
    {
      id: 2,
      question: "Tôi quên mật khẩu, làm sao để lấy lại?",
      answer:
        'Nhấn vào "Quên mật khẩu" ở trang đăng nhập, nhập email đã đăng ký. Hệ thống sẽ gửi link đặt lại mật khẩu đến email của bạn.',
      category: "Tài khoản",
      views: 980,
    },
    {
      id: 3,
      question: "Thanh toán khóa học như thế nào?",
      answer:
        "Chúng tôi hỗ trợ thanh toán qua thẻ ATM, thẻ tín dụng, ví điện tử (MoMo, ZaloPay) và chuyển khoản ngân hàng.",
      category: "Thanh toán",
      views: 750,
    },
    {
      id: 4,
      question: "Tôi có thể hoàn tiền không?",
      answer:
        "Bạn có thể yêu cầu hoàn tiền trong vòng 7 ngày kể từ ngày đăng ký nếu chưa hoàn thành quá 20% khóa học. Vui lòng tạo ticket hỗ trợ để được xử lý.",
      category: "Hoàn tiền",
      views: 640,
    },
    {
      id: 5,
      question: "Khóa học có thời hạn không?",
      answer:
        "Hầu hết khóa học không giới hạn thời gian truy cập. Bạn có thể học theo tốc độ của mình và xem lại bất cứ lúc nào.",
      category: "Khóa học",
      views: 890,
    },
  ]);

  useEffect(() => {
    // Mock user tickets
    const mockTickets = [
      {
        id: 1,
        title: "Không thể truy cập khóa học đã thanh toán",
        category: "Kỹ thuật",
        status: "open",
        priority: "high",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        lastUpdate: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        responses: 2,
        agent: "Nguyễn Văn Support",
      },
      {
        id: 2,
        title: "Yêu cầu hoàn tiền khóa React",
        category: "Hoàn tiền",
        status: "in_progress",
        priority: "normal",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        responses: 1,
        agent: "Trần Thị Hỗ trợ",
      },
      {
        id: 3,
        title: "Chứng chỉ không được tạo sau khi hoàn thành",
        category: "Chứng chỉ",
        status: "resolved",
        priority: "low",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
        responses: 3,
        agent: "Lê Văn Admin",
      },
    ];
    setTickets(mockTickets);

    // Mock agent online status
    setIsAgentOnline(Math.random() > 0.3); // 70% chance agent is online
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const filteredFAQ = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusText = (status) => {
    const statusMap = {
      open: "Mở",
      in_progress: "Đang xử lý",
      resolved: "Đã giải quyết",
      closed: "Đã đóng",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      open: "#e74c3c",
      in_progress: "#f39c12",
      resolved: "#27ae60",
      closed: "#95a5a6",
    };
    return colorMap[status] || "#666";
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      high: "#e74c3c",
      normal: "#3498db",
      low: "#27ae60",
    };
    return colorMap[priority] || "#666";
  };

  const handleCreateTicket = () => {
    if (!newTicket.title || !newTicket.category || !newTicket.content) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const ticket = {
      id: tickets.length + 1,
      ...newTicket,
      status: "open",
      priority: "normal",
      createdAt: new Date(),
      lastUpdate: new Date(),
      responses: 0,
      agent: null,
    };

    setTickets((prev) => [ticket, ...prev]);
    setNewTicket({ title: "", category: "", content: "", attachments: [] });
    alert("Ticket đã được tạo thành công! ID: #" + ticket.id);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB

    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        alert(`File ${file.name} quá lớn (>10MB)`);
        return false;
      }
      return true;
    });

    setNewTicket((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles],
    }));
  };

  const removeAttachment = (index) => {
    setNewTicket((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const startChat = () => {
    if (!isAgentOnline) {
      alert(
        "Hiện tại không có agent online. Vui lòng tạo ticket hoặc thử lại sau."
      );
      return;
    }

    setChatMessages([
      {
        id: 1,
        sender: "agent",
        message:
          "Xin chào! Tôi là " +
          (Math.random() > 0.5 ? "Nguyễn Văn Support" : "Trần Thị Hỗ trợ") +
          ". Tôi có thể giúp gì cho bạn?",
        timestamp: new Date(),
        avatar: null,
      },
    ]);
    setActiveTab("chat");
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      message: chatInput,
      timestamp: new Date(),
      avatar: user?.avatar,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate agent response
    setTimeout(() => {
      const agentMessage = {
        id: chatMessages.length + 2,
        sender: "agent",
        message: "Cảm ơn bạn đã liên hệ. Tôi sẽ kiểm tra và hỗ trợ bạn ngay.",
        timestamp: new Date(),
        avatar: null,
      };
      setChatMessages((prev) => [...prev, agentMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleString("vi-VN");
  };

  const renderFAQ = () => (
    <div className="faq-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm câu hỏi thường gặp..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="faq-list">
        {filteredFAQ.map((item) => (
          <div key={item.id} className="faq-item">
            <div className="faq-question">
              <h4>{item.question}</h4>
              <div className="faq-meta">
                <span className="category">{item.category}</span>
                <span className="views">👁️ {item.views}</span>
              </div>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredFAQ.length === 0 && (
        <div className="no-results">
          <p>📭 Không tìm thấy kết quả phù hợp</p>
        </div>
      )}
    </div>
  );

  const renderTickets = () => (
    <div className="tickets-section">
      <div className="tickets-header">
        <h3>🎫 Ticket của bạn</h3>
        <button
          className="create-ticket-btn"
          onClick={() => setActiveTab("create-ticket")}
        >
          ➕ Tạo ticket mới
        </button>
      </div>

      <div className="tickets-list">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="ticket-item"
            onClick={() => setSelectedTicket(ticket)}
          >
            <div className="ticket-header">
              <div className="ticket-id">#{ticket.id}</div>
              <div
                className="ticket-status"
                style={{ backgroundColor: getStatusColor(ticket.status) }}
              >
                {getStatusText(ticket.status)}
              </div>
            </div>
            <div className="ticket-title">{ticket.title}</div>
            <div className="ticket-meta">
              <span className="category">📋 {ticket.category}</span>
              <span
                className="priority"
                style={{ color: getPriorityColor(ticket.priority) }}
              >
                🔥 {ticket.priority}
              </span>
              <span className="responses">💬 {ticket.responses} phản hồi</span>
            </div>
            <div className="ticket-dates">
              <span>Tạo: {formatTime(ticket.createdAt)}</span>
              <span>Cập nhật: {formatTime(ticket.lastUpdate)}</span>
            </div>
            {ticket.agent && (
              <div className="ticket-agent">👤 Agent: {ticket.agent}</div>
            )}
          </div>
        ))}
      </div>

      {tickets.length === 0 && (
        <div className="no-tickets">
          <p>📭 Bạn chưa có ticket nào</p>
        </div>
      )}
    </div>
  );

  const renderCreateTicket = () => (
    <div className="create-ticket-section">
      <div className="form-header">
        <h3>➕ Tạo ticket hỗ trợ</h3>
        <button className="back-btn" onClick={() => setActiveTab("tickets")}>
          ← Quay lại
        </button>
      </div>

      <div className="ticket-form">
        <div className="form-group">
          <label>Tiêu đề *</label>
          <input
            type="text"
            value={newTicket.title}
            onChange={(e) =>
              setNewTicket((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Mô tả ngắn gọn vấn đề của bạn"
          />
        </div>

        <div className="form-group">
          <label>Danh mục *</label>
          <select
            value={newTicket.category}
            onChange={(e) =>
              setNewTicket((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">Chọn danh mục</option>
            <option value="Kỹ thuật">Kỹ thuật</option>
            <option value="Tài khoản">Tài khoản</option>
            <option value="Thanh toán">Thanh toán</option>
            <option value="Hoàn tiền">Hoàn tiền</option>
            <option value="Khóa học">Khóa học</option>
            <option value="Chứng chỉ">Chứng chỉ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nội dung *</label>
          <textarea
            rows={6}
            value={newTicket.content}
            onChange={(e) =>
              setNewTicket((prev) => ({ ...prev, content: e.target.value }))
            }
            placeholder="Mô tả chi tiết vấn đề, các bước đã thử, ảnh chụp màn hình nếu có..."
          />
        </div>

        <div className="form-group">
          <label>Đính kèm file (tối đa 10MB)</label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <button
            type="button"
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            📎 Chọn file
          </button>

          {newTicket.attachments.length > 0 && (
            <div className="attachments">
              {newTicket.attachments.map((file, index) => (
                <div key={index} className="attachment">
                  <span>{file.name}</span>
                  <button onClick={() => removeAttachment(index)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button className="submit-btn" onClick={handleCreateTicket}>
            🚀 Gửi ticket
          </button>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="chat-section">
      <div className="chat-header">
        <div className="chat-status">
          <div
            className={`status-indicator ${
              isAgentOnline ? "online" : "offline"
            }`}
          ></div>
          <span>
            {isAgentOnline ? "✅ Agent đang online" : "❌ Agent offline"}
          </span>
        </div>
        {isAgentOnline && chatMessages.length === 0 && (
          <button className="start-chat-btn" onClick={startChat}>
            💬 Bắt đầu chat
          </button>
        )}
      </div>

      {chatMessages.length > 0 && (
        <>
          <div className="chat-messages" ref={chatRef}>
            {chatMessages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  <div className="message-text">{message.message}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString("vi-VN")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={sendChatMessage}>➤</button>
          </div>
        </>
      )}

      {!isAgentOnline && (
        <div className="offline-message">
          <p>🕒 Agent hiện không online</p>
          <p>Vui lòng tạo ticket hoặc thử lại sau</p>
          <p>Thời gian hỗ trợ: 8:00 - 22:00 hàng ngày</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="support-center">
      <div className="support-header">
        <h2>🆘 Trung tâm hỗ trợ</h2>
        <p>Chúng tôi luôn sẵn sàng giúp đỡ bạn</p>
      </div>

      <div className="support-tabs">
        <button
          className={activeTab === "faq" ? "active" : ""}
          onClick={() => setActiveTab("faq")}
        >
          ❓ FAQ
        </button>
        <button
          className={activeTab === "tickets" ? "active" : ""}
          onClick={() => setActiveTab("tickets")}
        >
          🎫 Ticket ({tickets.length})
        </button>
        <button
          className={activeTab === "chat" ? "active" : ""}
          onClick={() => setActiveTab("chat")}
        >
          💬 Chat trực tiếp
        </button>
      </div>

      <div className="support-content">
        {activeTab === "faq" && renderFAQ()}
        {activeTab === "tickets" && renderTickets()}
        {activeTab === "create-ticket" && renderCreateTicket()}
        {activeTab === "chat" && renderChat()}
      </div>
    </div>
  );
};

export default SupportCenter;
