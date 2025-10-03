import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseFeedback.css";

const CourseFeedback = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [courseData, setCourseData] = useState(null);
  const [feedback, setFeedback] = useState({
    rating: 0,
    content: "",
    difficulty: 0,
    instructorRating: 0,
    recommendation: true,
    categories: {
      content: 0,
      presentation: 0,
      support: 0,
      practical: 0,
    },
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [existingFeedback, setExistingFeedback] = useState(null);

  useEffect(() => {
    loadCourseData();
    checkExistingFeedback();
  }, [courseId]);

  const loadCourseData = () => {
    // Simulate course data loading
    const courses = {
      1: {
        id: 1,
        title: "JavaScript Cơ Bản",
        instructor: "Nguyễn Văn A",
        duration: "8 tuần",
        level: "Cơ bản",
        thumbnail: "/api/placeholder/300/200",
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        progress: 100,
        totalLessons: 24,
        completedLessons: 24,
      },
      2: {
        id: 2,
        title: "React Advanced",
        instructor: "Trần Thị B",
        duration: "12 tuần",
        level: "Nâng cao",
        thumbnail: "/api/placeholder/300/200",
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        progress: 100,
        totalLessons: 36,
        completedLessons: 36,
      },
    };

    setCourseData(courses[courseId] || courses[1]);
  };

  const checkExistingFeedback = () => {
    // Simulate checking for existing feedback
    const existing = localStorage.getItem(`feedback_${courseId}_${user?.id}`);
    if (existing) {
      const feedbackData = JSON.parse(existing);
      setExistingFeedback(feedbackData);
      setFeedback(feedbackData);
      setHasSubmitted(true);
    }
  };

  const handleRatingChange = (category, value) => {
    if (category === "categories") {
      setFeedback((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          ...value,
        },
      }));
    } else {
      setFeedback((prev) => ({
        ...prev,
        [category]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feedback.rating === 0) {
      alert("Vui lòng đánh giá tổng thể khóa học");
      return;
    }

    if (feedback.content.trim().length < 10) {
      alert("Vui lòng viết ít nhất 10 ký tự cho phần nhận xét");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const feedbackData = {
        ...feedback,
        courseId,
        userId: user?.id,
        submittedAt: new Date().toISOString(),
        userName: user?.name,
      };

      // Save to localStorage (simulate database save)
      localStorage.setItem(
        `feedback_${courseId}_${user?.id}`,
        JSON.stringify(feedbackData)
      );

      setHasSubmitted(true);
      setExistingFeedback(feedbackData);

      alert(
        "Cảm ơn bạn đã đánh giá khóa học! Phản hồi của bạn rất có giá trị."
      );
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setHasSubmitted(false);
  };

  const renderStarRating = (
    category,
    value,
    onHover = null,
    onClick = null
  ) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${
            i <= (onHover ? hoveredRating : value) ? "filled" : ""
          }`}
          onMouseEnter={() => onHover && setHoveredRating(i)}
          onMouseLeave={() => onHover && setHoveredRating(0)}
          onClick={() => onClick && onClick(category, i)}
        >
          ⭐
        </span>
      );
    }
    return <div className="star-rating">{stars}</div>;
  };

  const renderCategoryRating = (categoryKey, label, value) => (
    <div className="category-rating">
      <label>{label}</label>
      {renderStarRating(
        categoryKey,
        value,
        !hasSubmitted,
        !hasSubmitted
          ? (cat, val) => handleRatingChange("categories", { [cat]: val })
          : null
      )}
      <span className="rating-text">
        {value === 0
          ? "Chưa đánh giá"
          : value === 1
          ? "Rất kém"
          : value === 2
          ? "Kém"
          : value === 3
          ? "Trung bình"
          : value === 4
          ? "Tốt"
          : "Xuất sắc"}
      </span>
    </div>
  );

  if (!courseData) {
    return (
      <div className="course-feedback">
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tải thông tin khóa học...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="course-feedback">
      <div className="feedback-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
        <div className="header-content">
          <h2>📝 Đánh giá khóa học</h2>
          <p>
            Chia sẻ trải nghiệm của bạn để giúp cải thiện chất lượng khóa học
          </p>
        </div>
      </div>

      <div className="feedback-container">
        <div className="course-summary">
          <img
            src={courseData.thumbnail}
            alt={courseData.title}
            className="course-thumbnail"
          />
          <div className="course-info">
            <h3>{courseData.title}</h3>
            <div className="course-details">
              <span>👨‍🏫 {courseData.instructor}</span>
              <span>⏱️ {courseData.duration}</span>
              <span>📊 {courseData.level}</span>
            </div>
            <div className="completion-info">
              <div className="completion-badge">
                ✅ Hoàn thành:{" "}
                {courseData.completedAt.toLocaleDateString("vi-VN")}
              </div>
              <div className="progress-info">
                📚 {courseData.completedLessons}/{courseData.totalLessons} bài
                học
              </div>
            </div>
          </div>
        </div>

        {hasSubmitted && existingFeedback ? (
          <div className="feedback-submitted">
            <div className="submitted-header">
              <h3>✅ Đánh giá đã gửi</h3>
              <button className="edit-btn" onClick={handleEdit}>
                ✏️ Chỉnh sửa
              </button>
            </div>

            <div className="submitted-content">
              <div className="rating-summary">
                <div className="overall-rating">
                  <span className="rating-label">Đánh giá tổng thể:</span>
                  {renderStarRating("overall", existingFeedback.rating)}
                  <span className="rating-value">
                    ({existingFeedback.rating}/5)
                  </span>
                </div>

                <div className="category-ratings">
                  {renderCategoryRating(
                    "content",
                    "📖 Nội dung",
                    existingFeedback.categories.content
                  )}
                  {renderCategoryRating(
                    "presentation",
                    "🎯 Trình bày",
                    existingFeedback.categories.presentation
                  )}
                  {renderCategoryRating(
                    "support",
                    "🔧 Hỗ trợ",
                    existingFeedback.categories.support
                  )}
                  {renderCategoryRating(
                    "practical",
                    "💻 Thực hành",
                    existingFeedback.categories.practical
                  )}
                </div>
              </div>

              <div className="feedback-text">
                <h4>💭 Nhận xét chi tiết:</h4>
                <p>{existingFeedback.content}</p>
              </div>

              <div className="additional-ratings">
                <div className="difficulty-rating">
                  <span>🎚️ Độ khó: </span>
                  <div className="difficulty-level">
                    {existingFeedback.difficulty === 1
                      ? "Rất dễ"
                      : existingFeedback.difficulty === 2
                      ? "Dễ"
                      : existingFeedback.difficulty === 3
                      ? "Vừa phải"
                      : existingFeedback.difficulty === 4
                      ? "Khó"
                      : "Rất khó"}
                  </div>
                </div>

                <div className="instructor-rating">
                  <span>👨‍🏫 Giảng viên: </span>
                  {renderStarRating(
                    "instructor",
                    existingFeedback.instructorRating
                  )}
                </div>

                <div className="recommendation">
                  <span>🎯 Giới thiệu: </span>
                  <span
                    className={`recommendation-badge ${
                      existingFeedback.recommendation ? "positive" : "negative"
                    }`}
                  >
                    {existingFeedback.recommendation ? "👍 Có" : "👎 Không"}
                  </span>
                </div>
              </div>

              <div className="submitted-info">
                <small>
                  Đã gửi lúc:{" "}
                  {new Date(existingFeedback.submittedAt).toLocaleString(
                    "vi-VN"
                  )}
                </small>
              </div>
            </div>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>⭐ Đánh giá tổng thể</h3>
              <div className="overall-rating-input">
                {renderStarRating("rating", feedback.rating, true, (cat, val) =>
                  handleRatingChange("rating", val)
                )}
                <span className="rating-description">
                  {feedback.rating === 0
                    ? "Chọn số sao để đánh giá"
                    : feedback.rating === 1
                    ? "Rất không hài lòng"
                    : feedback.rating === 2
                    ? "Không hài lòng"
                    : feedback.rating === 3
                    ? "Bình thường"
                    : feedback.rating === 4
                    ? "Hài lòng"
                    : "Rất hài lòng"}
                </span>
              </div>
            </div>

            <div className="form-section">
              <h3>📊 Đánh giá chi tiết</h3>
              <div className="detailed-ratings">
                {renderCategoryRating(
                  "content",
                  "📖 Nội dung khóa học",
                  feedback.categories.content
                )}
                {renderCategoryRating(
                  "presentation",
                  "🎯 Cách trình bày",
                  feedback.categories.presentation
                )}
                {renderCategoryRating(
                  "support",
                  "🔧 Hỗ trợ học viên",
                  feedback.categories.support
                )}
                {renderCategoryRating(
                  "practical",
                  "💻 Tính ứng dụng",
                  feedback.categories.practical
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>🎚️ Độ khó của khóa học</h3>
              <div className="difficulty-selector">
                {[1, 2, 3, 4, 5].map((level) => (
                  <label key={level} className="difficulty-option">
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      checked={feedback.difficulty === level}
                      onChange={(e) =>
                        handleRatingChange(
                          "difficulty",
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <span className="difficulty-label">
                      {level === 1
                        ? "Rất dễ"
                        : level === 2
                        ? "Dễ"
                        : level === 3
                        ? "Vừa phải"
                        : level === 4
                        ? "Khó"
                        : "Rất khó"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>👨‍🏫 Đánh giá giảng viên</h3>
              <div className="instructor-rating-input">
                {renderStarRating(
                  "instructorRating",
                  feedback.instructorRating,
                  true,
                  (cat, val) => handleRatingChange("instructorRating", val)
                )}
                <span className="instructor-name">{courseData.instructor}</span>
              </div>
            </div>

            <div className="form-section">
              <h3>💭 Nhận xét chi tiết</h3>
              <textarea
                value={feedback.content}
                onChange={(e) => handleRatingChange("content", e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn về khóa học này. Điều gì bạn thích nhất? Có điều gì cần cải thiện không?"
                rows={6}
                className="feedback-textarea"
              />
              <div className="character-count">
                {feedback.content.length}/500 ký tự
              </div>
            </div>

            <div className="form-section">
              <h3>🎯 Giới thiệu cho bạn bè</h3>
              <div className="recommendation-selector">
                <label className="recommendation-option">
                  <input
                    type="radio"
                    name="recommendation"
                    value="true"
                    checked={feedback.recommendation === true}
                    onChange={() => handleRatingChange("recommendation", true)}
                  />
                  <span className="recommendation-label positive">
                    👍 Có, tôi sẽ giới thiệu khóa học này
                  </span>
                </label>
                <label className="recommendation-option">
                  <input
                    type="radio"
                    name="recommendation"
                    value="false"
                    checked={feedback.recommendation === false}
                    onChange={() => handleRatingChange("recommendation", false)}
                  />
                  <span className="recommendation-label negative">
                    👎 Không, tôi sẽ không giới thiệu
                  </span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(-1)}
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting || feedback.rating === 0}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner small"></div>
                    Đang gửi...
                  </>
                ) : (
                  <>📤 Gửi đánh giá</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CourseFeedback;
