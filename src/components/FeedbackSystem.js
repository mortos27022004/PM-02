import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const FeedbackSystem = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("submit");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("course");
  const [feedbackText, setFeedbackText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [tags, setTags] = useState([]);

  // Mock data
  const [courses] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      instructor: "Nguyễn Văn A",
      completed: true,
    },
    {
      id: 2,
      title: "React Development",
      instructor: "Trần Thị B",
      completed: false,
    },
    {
      id: 3,
      title: "Node.js Backend",
      instructor: "Lê Văn C",
      completed: true,
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Phạm Thị D",
      completed: false,
    },
  ]);

  const [instructors] = useState([
    { id: 1, name: "Nguyễn Văn A", avatar: "👨‍🏫", rating: 4.8, courses: 5 },
    { id: 2, name: "Trần Thị B", avatar: "👩‍🏫", rating: 4.6, courses: 3 },
    { id: 3, name: "Lê Văn C", avatar: "👨‍💻", rating: 4.9, courses: 8 },
    { id: 4, name: "Phạm Thị D", avatar: "👩‍💻", rating: 4.7, courses: 4 },
  ]);

  const [availableTags] = useState([
    "Nội dung chất lượng",
    "Giảng viên tận tâm",
    "Bài tập thực tế",
    "Hỗ trợ tốt",
    "Khó hiểu",
    "Thiếu thực hành",
    "Cần cải thiện",
    "Tốc độ phù hợp",
    "Video chất lượng cao",
    "Tài liệu đầy đủ",
    "Tương tác tốt",
    "Giá trị thực tế",
  ]);

  const [myFeedbacks] = useState([
    {
      id: 1,
      type: "course",
      target: "JavaScript Fundamentals",
      rating: 5,
      text: "Khóa học rất hay, nội dung được trình bày rõ ràng và dễ hiểu. Giảng viên tận tâm.",
      tags: ["Nội dung chất lượng", "Giảng viên tận tâm"],
      date: "2024-01-20",
      status: "published",
      helpful: 12,
      instructor: "Nguyễn Văn A",
    },
    {
      id: 2,
      type: "instructor",
      target: "Trần Thị B",
      rating: 4,
      text: "Cô giảng dạy nhiệt tình, nhưng tốc độ hơi nhanh với người mới bắt đầu.",
      tags: ["Giảng viên tận tâm", "Tốc độ phù hợp"],
      date: "2024-01-18",
      status: "published",
      helpful: 8,
      course: "React Development",
    },
    {
      id: 3,
      type: "platform",
      target: "Hệ thống học tập",
      rating: 4,
      text: "Giao diện thân thiện, dễ sử dụng. Tuy nhiên cần thêm tính năng note taking.",
      tags: ["Tương tác tốt", "Cần cải thiện"],
      date: "2024-01-15",
      status: "pending",
      helpful: 0,
    },
  ]);

  const [recentFeedbacks] = useState([
    {
      id: 1,
      user: "Minh Anh",
      userAvatar: "👩‍💼",
      course: "JavaScript Fundamentals",
      instructor: "Nguyễn Văn A",
      rating: 5,
      text: "Khóa học xuất sắc! Từ người không biết gì về JS, giờ tôi đã có thể làm được những project nhỏ.",
      date: "2024-01-21",
      helpful: 15,
      tags: ["Nội dung chất lượng", "Bài tập thực tế"],
    },
    {
      id: 2,
      user: "Đức Thành",
      userAvatar: "👨‍💻",
      course: "React Development",
      instructor: "Trần Thị B",
      rating: 4,
      text: "Nội dung hay nhưng cần thêm nhiều bài tập thực hành hơn.",
      date: "2024-01-20",
      helpful: 8,
      tags: ["Thiếu thực hành", "Nội dung chất lượng"],
    },
    {
      id: 3,
      user: "Thu Hà",
      userAvatar: "👩‍🎓",
      course: "Python for Data Science",
      instructor: "Phạm Thị D",
      rating: 5,
      text: "Cô giảng rất chi tiết, code demo rất dễ hiểu. Recommend!",
      date: "2024-01-19",
      helpful: 22,
      tags: ["Giảng viên tận tâm", "Video chất lượng cao"],
    },
  ]);

  const feedbackTypes = [
    { value: "course", label: "🎓 Khóa học", icon: "🎓" },
    { value: "instructor", label: "👨‍🏫 Giảng viên", icon: "👨‍🏫" },
    { value: "platform", label: "💻 Nền tảng", icon: "💻" },
  ];

  const resetForm = () => {
    setSelectedCourse("");
    setSelectedInstructor("");
    setRating(0);
    setFeedbackText("");
    setTags([]);
    setIsAnonymous(false);
  };

  const handleTagToggle = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const submitFeedback = () => {
    if (!rating || !feedbackText.trim()) {
      alert("Vui lòng điền đầy đủ đánh giá và nhận xét!");
      return;
    }

    if (feedbackType !== "platform" && !selectedCourse && !selectedInstructor) {
      alert("Vui lòng chọn khóa học hoặc giảng viên!");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      type: feedbackType,
      target:
        feedbackType === "course"
          ? courses.find((c) => c.id.toString() === selectedCourse)?.title
          : feedbackType === "instructor"
          ? instructors.find((i) => i.id.toString() === selectedInstructor)
              ?.name
          : "Hệ thống học tập",
      rating: rating,
      text: feedbackText,
      tags: tags,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      helpful: 0,
      anonymous: isAnonymous,
    };

    alert(
      "Cảm ơn bạn đã đóng góp ý kiến! Phản hồi của bạn sẽ được xem xét và đăng tải sớm."
    );
    resetForm();
  };

  const renderStarRating = (
    currentRating,
    onRatingChange = null,
    size = "1.5rem"
  ) => {
    return (
      <div style={{ display: "flex", gap: "0.2rem" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => onRatingChange && onRatingChange(star)}
            onMouseEnter={() => onRatingChange && setHoverRating(star)}
            onMouseLeave={() => onRatingChange && setHoverRating(0)}
            style={{
              fontSize: size,
              color:
                star <= (hoverRating || currentRating) ? "#FFD700" : "#ddd",
              cursor: onRatingChange ? "pointer" : "default",
              transition: "color 0.2s",
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderSubmitFeedback = () => (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="card" style={{ padding: "2rem" }}>
        <h3 style={{ marginBottom: "2rem" }}>✍️ Chia sẻ phản hồi của bạn</h3>

        {/* Feedback Type Selection */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Loại phản hồi:
          </label>
          <div style={{ display: "flex", gap: "1rem" }}>
            {feedbackTypes.map((type) => (
              <label
                key={type.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem",
                  border:
                    feedbackType === type.value
                      ? "2px solid #667eea"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: feedbackType === type.value ? "#f8f9ff" : "white",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                <input
                  type="radio"
                  name="feedbackType"
                  value={type.value}
                  checked={feedbackType === type.value}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  style={{ display: "none" }}
                />
                <span style={{ fontSize: "1.5rem" }}>{type.icon}</span>
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Course/Instructor Selection */}
        {feedbackType !== "platform" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: feedbackType === "course" ? "1fr" : "1fr",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {feedbackType === "course" && (
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Chọn khóa học:
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "1rem",
                  }}
                >
                  <option value="">-- Chọn khóa học --</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} - {course.instructor}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {feedbackType === "instructor" && (
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Chọn giảng viên:
                </label>
                <select
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "1rem",
                  }}
                >
                  <option value="">-- Chọn giảng viên --</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.name} (⭐ {instructor.rating})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Rating */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Đánh giá tổng thể: *
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {renderStarRating(rating, setRating, "2rem")}
            <span style={{ fontSize: "1rem", color: "#666" }}>
              {rating > 0 &&
                (rating === 5
                  ? "Xuất sắc"
                  : rating === 4
                  ? "Tốt"
                  : rating === 3
                  ? "Trung bình"
                  : rating === 2
                  ? "Kém"
                  : "Rất kém")}
            </span>
          </div>
        </div>

        {/* Feedback Text */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Nhận xét chi tiết: *
          </label>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Chia sẻ trải nghiệm của bạn về khóa học, giảng viên hoặc nền tảng..."
            rows="6"
            style={{
              width: "100%",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "1rem",
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            {feedbackText.length}/500 ký tự
          </div>
        </div>

        {/* Tags */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Chọn thẻ mô tả (tùy chọn):
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                style={{
                  padding: "0.5rem 1rem",
                  border: tags.includes(tag)
                    ? "2px solid #667eea"
                    : "1px solid #ddd",
                  borderRadius: "20px",
                  background: tags.includes(tag) ? "#f8f9ff" : "white",
                  color: tags.includes(tag) ? "#667eea" : "#666",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  transition: "all 0.2s",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Anonymous Option */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <span>Đăng phản hồi ẩn danh</span>
          </label>
        </div>

        {/* Submit Button */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={resetForm}
            style={{
              padding: "1rem 2rem",
              background: "#f0f0f0",
              color: "#666",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🔄 Xóa form
          </button>
          <button
            onClick={submitFeedback}
            style={{
              flex: 1,
              padding: "1rem 2rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            📝 Gửi phản hồi
          </button>
        </div>
      </div>
    </div>
  );

  const renderMyFeedbacks = () => (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h3>📋 Phản hồi của bạn</h3>
        <div style={{ fontSize: "0.9rem", color: "#666" }}>
          Tổng cộng: {myFeedbacks.length} phản hồi
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {myFeedbacks.map((feedback) => (
          <div key={feedback.id} className="card" style={{ padding: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "1rem",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h4 style={{ margin: 0 }}>{feedback.target}</h4>
                  <span
                    style={{
                      background:
                        feedback.status === "published" ? "#4CAF50" : "#FF9800",
                      color: "white",
                      padding: "0.2rem 0.8rem",
                      borderRadius: "12px",
                      fontSize: "0.7rem",
                    }}
                  >
                    {feedback.status === "published"
                      ? "✅ Đã đăng"
                      : "⏳ Đang xét duyệt"}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#666",
                    marginBottom: "0.5rem",
                  }}
                >
                  {feedback.type === "course" &&
                    `Giảng viên: ${feedback.instructor}`}
                  {feedback.type === "instructor" &&
                    `Khóa học: ${feedback.course}`}
                  {feedback.type === "platform" && "Phản hồi về nền tảng"}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                {renderStarRating(feedback.rating)}
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#666",
                    marginTop: "0.3rem",
                  }}
                >
                  {new Date(feedback.date).toLocaleDateString("vi-VN")}
                </div>
              </div>
            </div>

            <p
              style={{
                lineHeight: "1.6",
                marginBottom: "1rem",
                padding: "1rem",
                background: "#f8f9fa",
                borderRadius: "6px",
                fontStyle: "italic",
              }}
            >
              "{feedback.text}"
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              {feedback.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    background: "#667eea",
                    color: "white",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "15px",
                    fontSize: "0.7rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: "0.8rem", color: "#666" }}>
                {feedback.helpful > 0 &&
                  `${feedback.helpful} người thấy hữu ích`}
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#f0f0f0",
                    color: "#666",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  ✏️ Chỉnh sửa
                </button>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#ffebee",
                    color: "#f44336",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAllFeedbacks = () => (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h3>💬 Phản hồi từ cộng đồng</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <select
            style={{
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <option>Tất cả khóa học</option>
            {courses.map((course) => (
              <option key={course.id}>{course.title}</option>
            ))}
          </select>
          <select
            style={{
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <option>Sắp xếp theo</option>
            <option>Mới nhất</option>
            <option>Hữu ích nhất</option>
            <option>Đánh giá cao nhất</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {recentFeedbacks.map((feedback) => (
          <div key={feedback.id} className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ fontSize: "2.5rem" }}>{feedback.userAvatar}</div>

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
                    <h4 style={{ margin: "0 0 0.3rem 0" }}>{feedback.user}</h4>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>
                      {feedback.course} • {feedback.instructor}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    {renderStarRating(feedback.rating)}
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#666",
                        marginTop: "0.3rem",
                      }}
                    >
                      {new Date(feedback.date).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p
              style={{
                lineHeight: "1.6",
                marginBottom: "1rem",
                padding: "1rem",
                background: "#f8f9fa",
                borderRadius: "6px",
                fontStyle: "italic",
                borderLeft: "4px solid #667eea",
              }}
            >
              "{feedback.text}"
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              {feedback.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    background: "#e3f2fd",
                    color: "#1976d2",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "15px",
                    fontSize: "0.7rem",
                    border: "1px solid #bbdefb",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#666",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.8rem",
                  }}
                >
                  👍 Hữu ích ({feedback.helpful})
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#666",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.8rem",
                  }}
                >
                  💬 Trả lời
                </button>
              </div>

              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#999",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                📢 Báo cáo
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          style={{
            padding: "1rem 2rem",
            background: "#f0f0f0",
            color: "#666",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          📄 Xem thêm phản hồi
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
        <h1 style={{ margin: "0 0 0.5rem 0" }}>💭 Hệ thống phản hồi</h1>
        <p style={{ margin: 0, color: "#666" }}>
          Chia sẻ trải nghiệm và đóng góp ý kiến để cải thiện chất lượng học tập
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
            { key: "submit", label: "✍️ Gửi phản hồi" },
            { key: "my-feedbacks", label: "📋 Phản hồi của tôi" },
            { key: "all-feedbacks", label: "💬 Phản hồi cộng đồng" },
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
      {activeTab === "submit" && renderSubmitFeedback()}
      {activeTab === "my-feedbacks" && renderMyFeedbacks()}
      {activeTab === "all-feedbacks" && renderAllFeedbacks()}
    </div>
  );
};

export default FeedbackSystem;
