import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchCourses = () => {
  const { courses } = useSelector((state) => state.courses);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    price: "all", // all, free, paid
    language: "all", // all, vietnamese, english
    level: "all", // all, beginner, intermediate, advanced
    rating: "all", // all, 4+, 4.5+
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock expanded course data
  const [allCourses] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description:
        "Học JavaScript từ cơ bản đến nâng cao với các project thực tế",
      instructor: "Nguyễn Văn A",
      price: 299000,
      originalPrice: 499000,
      rating: 4.8,
      reviewCount: 245,
      students: 1250,
      duration: "8 tuần",
      level: "beginner",
      language: "vietnamese",
      tags: ["JavaScript", "Frontend", "Web Development"],
      image: "🚀",
      lastUpdated: "2025-09-15",
      certificate: true,
      bestseller: true,
    },
    {
      id: 2,
      title: "React Development Pro",
      description: "Nắm vững React hooks, context, và các pattern nâng cao",
      instructor: "Trần Thị B",
      price: 0,
      originalPrice: 0,
      rating: 4.9,
      reviewCount: 189,
      students: 890,
      duration: "10 tuần",
      level: "intermediate",
      language: "vietnamese",
      tags: ["React", "JavaScript", "Frontend"],
      image: "⚛️",
      lastUpdated: "2025-09-20",
      certificate: true,
      bestseller: false,
    },
    {
      id: 3,
      title: "Python Machine Learning",
      description: "Khóa học Python và Machine Learning từ cơ bản đến nâng cao",
      instructor: "Lê Văn C",
      price: 399000,
      originalPrice: 599000,
      rating: 4.7,
      reviewCount: 324,
      students: 1150,
      duration: "12 tuần",
      level: "advanced",
      language: "english",
      tags: ["Python", "Machine Learning", "AI"],
      image: "🐍",
      lastUpdated: "2025-10-01",
      certificate: true,
      bestseller: true,
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      description: "Xây dựng API và backend scalable với Node.js",
      instructor: "Phạm Văn D",
      price: 450000,
      originalPrice: 650000,
      rating: 4.6,
      reviewCount: 156,
      students: 678,
      duration: "9 tuần",
      level: "intermediate",
      language: "vietnamese",
      tags: ["Node.js", "Backend", "API"],
      image: "🟢",
      lastUpdated: "2025-09-25",
      certificate: true,
      bestseller: false,
    },
  ]);

  // Autocomplete suggestions
  useEffect(() => {
    if (searchQuery.length > 0) {
      const query = searchQuery.toLowerCase();
      const courseSuggestions = allCourses
        .filter(
          (course) =>
            course.title.toLowerCase().includes(query) ||
            course.instructor.toLowerCase().includes(query) ||
            course.tags.some((tag) => tag.toLowerCase().includes(query))
        )
        .slice(0, 5)
        .map((course) => ({
          type: "course",
          text: course.title,
          instructor: course.instructor,
          id: course.id,
        }));

      const instructorSuggestions = [
        ...new Set(
          allCourses
            .filter((course) => course.instructor.toLowerCase().includes(query))
            .map((course) => course.instructor)
        ),
      ]
        .slice(0, 3)
        .map((instructor) => ({
          type: "instructor",
          text: instructor,
        }));

      const tagSuggestions = [
        ...new Set(
          allCourses
            .flatMap((course) => course.tags)
            .filter((tag) => tag.toLowerCase().includes(query))
        ),
      ]
        .slice(0, 3)
        .map((tag) => ({
          type: "tag",
          text: tag,
        }));

      setSuggestions([
        ...courseSuggestions,
        ...instructorSuggestions,
        ...tagSuggestions,
      ]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, allCourses]);

  // Search and filter
  useEffect(() => {
    if (
      searchQuery.length > 0 ||
      Object.values(filters).some((f) => f !== "all")
    ) {
      setIsSearching(true);

      let results = [...allCourses];

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        results = results.filter(
          (course) =>
            course.title.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query) ||
            course.instructor.toLowerCase().includes(query) ||
            course.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      // Price filter
      if (filters.price === "free") {
        results = results.filter((course) => course.price === 0);
      } else if (filters.price === "paid") {
        results = results.filter((course) => course.price > 0);
      }

      // Language filter
      if (filters.language !== "all") {
        results = results.filter(
          (course) => course.language === filters.language
        );
      }

      // Level filter
      if (filters.level !== "all") {
        results = results.filter((course) => course.level === filters.level);
      }

      // Rating filter
      if (filters.rating === "4+") {
        results = results.filter((course) => course.rating >= 4);
      } else if (filters.rating === "4.5+") {
        results = results.filter((course) => course.rating >= 4.5);
      }

      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, filters, allCourses]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({
      price: "all",
      language: "all",
      level: "all",
      rating: "all",
    });
    setSearchQuery("");
  };

  const formatPrice = (price) => {
    if (price === 0) return "Miễn phí";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getLevelText = (level) => {
    const levelMap = {
      beginner: "Cơ bản",
      intermediate: "Trung bình",
      advanced: "Nâng cao",
    };
    return levelMap[level] || level;
  };

  const getLanguageText = (language) => {
    const languageMap = {
      vietnamese: "Tiếng Việt",
      english: "Tiếng Anh",
    };
    return languageMap[language] || language;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
        {"★".repeat(fullStars)}
        {hasHalfStar && "☆"}
        {"☆".repeat(emptyStars)}
        <span
          style={{ marginLeft: "0.3rem", fontSize: "0.9rem", color: "#666" }}
        >
          ({rating})
        </span>
      </div>
    );
  };

  return (
    <div className="main-container">
      {/* Header */}
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: "0 0 1rem 0" }}>🔍 Tìm kiếm khóa học</h1>
        <p style={{ margin: "0 0 1.5rem 0", color: "#666" }}>
          Khám phá và tìm kiếm các khóa học lập trình phù hợp với trình độ của
          bạn
        </p>

        {/* Search Bar with Autocomplete */}
        <div style={{ position: "relative", marginBottom: "2rem" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Tìm kiếm khóa học, giảng viên, chủ đề..."
            style={{
              width: "100%",
              padding: "1rem 3rem 1rem 1rem",
              border: "2px solid #e1e5e9",
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.2rem",
              color: "#666",
              cursor: "pointer",
            }}
            onClick={() => setShowSuggestions(false)}
          >
            🔍
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "white",
                border: "1px solid #e1e5e9",
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                maxHeight: "300px",
                overflowY: "auto",
                zIndex: 10,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    padding: "0.8rem 1rem",
                    cursor: "pointer",
                    borderBottom:
                      index < suggestions.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                    hover: { background: "#f8f9fa" },
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#f8f9fa")}
                  onMouseLeave={(e) => (e.target.style.background = "white")}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "0.9rem" }}>
                      {suggestion.type === "course" && "📚"}
                      {suggestion.type === "instructor" && "👨‍🏫"}
                      {suggestion.type === "tag" && "🏷️"}
                    </span>
                    <div>
                      <div style={{ fontWeight: "500" }}>{suggestion.text}</div>
                      {suggestion.instructor && (
                        <div style={{ fontSize: "0.8rem", color: "#666" }}>
                          bởi {suggestion.instructor}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Giá
            </label>
            <select
              value={filters.price}
              onChange={(e) => handleFilterChange("price", e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #e1e5e9",
                borderRadius: "5px",
              }}
            >
              <option value="all">Tất cả</option>
              <option value="free">Miễn phí</option>
              <option value="paid">Có phí</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Ngôn ngữ
            </label>
            <select
              value={filters.language}
              onChange={(e) => handleFilterChange("language", e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #e1e5e9",
                borderRadius: "5px",
              }}
            >
              <option value="all">Tất cả</option>
              <option value="vietnamese">Tiếng Việt</option>
              <option value="english">Tiếng Anh</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Độ khó
            </label>
            <select
              value={filters.level}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #e1e5e9",
                borderRadius: "5px",
              }}
            >
              <option value="all">Tất cả</option>
              <option value="beginner">Cơ bản</option>
              <option value="intermediate">Trung bình</option>
              <option value="advanced">Nâng cao</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Đánh giá
            </label>
            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #e1e5e9",
                borderRadius: "5px",
              }}
            >
              <option value="all">Tất cả</option>
              <option value="4+">4+ sao</option>
              <option value="4.5+">4.5+ sao</option>
            </select>
          </div>
        </div>

        <button
          onClick={clearFilters}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "#f8f9fa",
            border: "1px solid #e1e5e9",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Xóa bộ lọc
        </button>
      </div>

      {/* Search Results */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>
          {isSearching
            ? "Đang tìm kiếm..."
            : searchResults.length > 0
            ? `Tìm thấy ${searchResults.length} khóa học`
            : searchQuery || Object.values(filters).some((f) => f !== "all")
            ? "Không tìm thấy khóa học nào"
            : "Nhập từ khóa để tìm kiếm"}
        </h2>

        {isSearching ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div>🔄 Đang tìm kiếm...</div>
          </div>
        ) : searchResults.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {searchResults.map((course) => (
              <div
                key={course.id}
                style={{
                  background: "white",
                  borderRadius: "10px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {/* Course Header */}
                <div
                  style={{
                    height: "120px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                    color: "white",
                    position: "relative",
                  }}
                >
                  {course.image}
                  {course.bestseller && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "#FF6B6B",
                        color: "white",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      Bestseller
                    </div>
                  )}
                  {course.price === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "#4CAF50",
                        color: "white",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      Miễn phí
                    </div>
                  )}
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
                    {course.title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 1rem 0",
                      color: "#666",
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {course.description}
                  </p>

                  <div style={{ marginBottom: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#667eea", fontWeight: "bold" }}>
                        👨‍🏫 {course.instructor}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {renderStars(course.rating)}
                      <span style={{ color: "#666", fontSize: "0.9rem" }}>
                        ({course.reviewCount} đánh giá)
                      </span>
                      <span style={{ color: "#666", fontSize: "0.9rem" }}>
                        👥 {course.students} học viên
                      </span>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <span>📅 {course.duration}</span>
                      <span>🌐 {getLanguageText(course.language)}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>📊 {getLevelText(course.level)}</span>
                      {course.certificate && <span>🏆 Có chứng chỉ</span>}
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ marginBottom: "1rem" }}>
                    {course.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          display: "inline-block",
                          background: "#f0f4f8",
                          color: "#4a5568",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                          marginRight: "0.5rem",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price and Action */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        {formatPrice(course.price)}
                      </div>
                      {course.originalPrice > course.price &&
                        course.price > 0 && (
                          <div
                            style={{
                              fontSize: "0.9rem",
                              color: "#999",
                              textDecoration: "line-through",
                            }}
                          >
                            {formatPrice(course.originalPrice)}
                          </div>
                        )}
                    </div>
                    <Link
                      to={`/course/${course.id}`}
                      style={{
                        background: "#667eea",
                        color: "white",
                        padding: "0.8rem 1.5rem",
                        borderRadius: "5px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.background = "#5a67d8")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.background = "#667eea")
                      }
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery || Object.values(filters).some((f) => f !== "all") ? (
          <div
            style={{
              background: "white",
              padding: "3rem",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <h3>Không tìm thấy khóa học nào</h3>
            <p style={{ color: "#666", marginBottom: "2rem" }}>
              Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh bộ lọc
            </p>
            <button
              onClick={clearFilters}
              style={{
                padding: "1rem 2rem",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchCourses;
