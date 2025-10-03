import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./CodePracticeManagement.css";

const CodePracticeManagement = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("list");
  const [practices, setPractices] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const [practiceForm, setPracticeForm] = useState({
    title: "",
    description: "",
    language: "javascript",
    timeLimit: 5000, // milliseconds
    memoryLimit: 128, // MB
    maxScore: 100,
    tags: [],
    difficulty: "easy",
    testCases: [{ input: "", output: "", isPublic: true, description: "" }],
    sampleSolution: "",
    visibility: "course", // 'standalone' or 'course'
    courseId: "",
    lessonId: "",
  });

  const [previewResult, setPreviewResult] = useState(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  useEffect(() => {
    // Load existing practices
    const mockPractices = [
      {
        id: 1,
        title: "Two Sum Problem",
        description: "Tìm hai số trong mảng có tổng bằng target",
        language: "javascript",
        difficulty: "easy",
        timeLimit: 3000,
        memoryLimit: 64,
        maxScore: 100,
        status: "published",
        submissions: 45,
        successRate: 78,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 12),
        tags: ["Array", "Hash Table"],
        visibility: "course",
        courseName: "JavaScript Algorithms",
      },
      {
        id: 2,
        title: "Binary Tree Traversal",
        description: "Thực hiện duyệt cây nhị phân theo thứ tự inorder",
        language: "python",
        difficulty: "medium",
        timeLimit: 5000,
        memoryLimit: 128,
        maxScore: 150,
        status: "draft",
        submissions: 0,
        successRate: 0,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        tags: ["Tree", "Recursion"],
        visibility: "standalone",
      },
      {
        id: 3,
        title: "REST API Design",
        description: "Thiết kế API RESTful cho hệ thống quản lý sách",
        language: "java",
        difficulty: "hard",
        timeLimit: 10000,
        memoryLimit: 256,
        maxScore: 200,
        status: "pending_review",
        submissions: 12,
        successRate: 25,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60),
        tags: ["API", "Design"],
        visibility: "course",
        courseName: "Advanced Java",
      },
    ];
    setPractices(mockPractices);
  }, []);

  const handleInputChange = (field, value) => {
    setPracticeForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagsChange = (tags) => {
    setPracticeForm((prev) => ({
      ...prev,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }));
  };

  const addTestCase = () => {
    setPracticeForm((prev) => ({
      ...prev,
      testCases: [
        ...prev.testCases,
        { input: "", output: "", isPublic: false, description: "" },
      ],
    }));
  };

  const updateTestCase = (index, field, value) => {
    setPracticeForm((prev) => ({
      ...prev,
      testCases: prev.testCases.map((tc, i) =>
        i === index ? { ...tc, [field]: value } : tc
      ),
    }));
  };

  const removeTestCase = (index) => {
    if (practiceForm.testCases.length > 1) {
      setPracticeForm((prev) => ({
        ...prev,
        testCases: prev.testCases.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    if (!practiceForm.title.trim()) {
      alert("Vui lòng nhập tiêu đề");
      return false;
    }
    if (!practiceForm.description.trim()) {
      alert("Vui lòng nhập mô tả");
      return false;
    }
    if (practiceForm.testCases.length === 0) {
      alert("Cần ít nhất 1 test case");
      return false;
    }
    if (!practiceForm.testCases.some((tc) => tc.isPublic)) {
      alert("Cần ít nhất 1 test case public");
      return false;
    }
    if (
      practiceForm.testCases.some((tc) => !tc.input.trim() || !tc.output.trim())
    ) {
      alert("Tất cả test case phải có input và output");
      return false;
    }
    return true;
  };

  const handlePreview = async () => {
    if (!validateForm()) return;

    setIsPreviewLoading(true);
    setShowPreview(true);

    // Simulate preview execution
    setTimeout(() => {
      const sampleCode =
        practiceForm.sampleSolution || getDefaultCode(practiceForm.language);
      const publicTestCases = practiceForm.testCases.filter(
        (tc) => tc.isPublic
      );

      const results = publicTestCases.map((tc) => ({
        input: tc.input,
        expected: tc.output,
        actual: tc.output, // Mock: assume sample solution is correct
        passed: true,
        executionTime: Math.random() * 1000 + 500,
        memoryUsed: Math.random() * 50 + 20,
      }));

      setPreviewResult({
        success: true,
        results,
        totalTests: practiceForm.testCases.length,
        publicTests: publicTestCases.length,
        executionTime: Math.max(...results.map((r) => r.executionTime)),
        memoryUsed: Math.max(...results.map((r) => r.memoryUsed)),
      });

      setIsPreviewLoading(false);
    }, 2000 + Math.random() * 3000);
  };

  const handleSaveDraft = () => {
    if (!validateForm()) return;

    const newPractice = {
      ...practiceForm,
      id: practices.length + 1,
      status: "draft",
      submissions: 0,
      successRate: 0,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    setPractices((prev) => [newPractice, ...prev]);
    alert("Đã lưu bản nháp");
    setActiveTab("list");
    resetForm();
  };

  const handlePublish = () => {
    if (!validateForm()) return;

    const newPractice = {
      ...practiceForm,
      id: practices.length + 1,
      status: "published",
      submissions: 0,
      successRate: 0,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    setPractices((prev) => [newPractice, ...prev]);
    alert("Đã xuất bản bài luyện tập");
    setActiveTab("list");
    resetForm();
  };

  const resetForm = () => {
    setPracticeForm({
      title: "",
      description: "",
      language: "javascript",
      timeLimit: 5000,
      memoryLimit: 128,
      maxScore: 100,
      tags: [],
      difficulty: "easy",
      testCases: [{ input: "", output: "", isPublic: true, description: "" }],
      sampleSolution: "",
      visibility: "course",
      courseId: "",
      lessonId: "",
    });
  };

  const getDefaultCode = (language) => {
    const templates = {
      javascript: `function solution(input) {
    // Your code here
    return result;
}`,
      python: `def solution(input):
    # Your code here
    return result`,
      java: `public class Solution {
    public static String solve(String input) {
        // Your code here
        return result;
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string solution(string input) {
    // Your code here
    return result;
}`,
      csharp: `using System;

public class Solution {
    public static string Solve(string input) {
        // Your code here
        return result;
    }
}`,
    };
    return templates[language] || templates.javascript;
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: "#95a5a6",
      published: "#27ae60",
      pending_review: "#f39c12",
      rejected: "#e74c3c",
    };
    return colors[status] || "#666";
  };

  const getStatusText = (status) => {
    const texts = {
      draft: "Bản nháp",
      published: "Đã xuất bản",
      pending_review: "Chờ duyệt",
      rejected: "Bị từ chối",
    };
    return texts[status] || status;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "#27ae60",
      medium: "#f39c12",
      hard: "#e74c3c",
    };
    return colors[difficulty] || "#666";
  };

  const renderPracticeList = () => (
    <div className="practice-list">
      <div className="list-header">
        <h3>📝 Danh sách bài luyện tập</h3>
        <button className="create-btn" onClick={() => setActiveTab("create")}>
          ➕ Tạo bài mới
        </button>
      </div>

      <div className="practices-grid">
        {practices.map((practice) => (
          <div key={practice.id} className="practice-card">
            <div className="practice-header">
              <div className="practice-title">{practice.title}</div>
              <div
                className="practice-status"
                style={{ backgroundColor: getStatusColor(practice.status) }}
              >
                {getStatusText(practice.status)}
              </div>
            </div>

            <div className="practice-description">{practice.description}</div>

            <div className="practice-meta">
              <div className="meta-row">
                <span className="language">🔧 {practice.language}</span>
                <span
                  className="difficulty"
                  style={{ color: getDifficultyColor(practice.difficulty) }}
                >
                  📊 {practice.difficulty}
                </span>
              </div>
              <div className="meta-row">
                <span>⏱️ {practice.timeLimit}ms</span>
                <span>💾 {practice.memoryLimit}MB</span>
                <span>🎯 {practice.maxScore} điểm</span>
              </div>
              <div className="meta-row">
                <span>📊 {practice.submissions} lượt nộp</span>
                <span>✅ {practice.successRate}% thành công</span>
              </div>
            </div>

            {practice.tags.length > 0 && (
              <div className="practice-tags">
                {practice.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="practice-actions">
              <button onClick={() => setSelectedPractice(practice)}>
                👁️ Xem
              </button>
              <button
                onClick={() => {
                  setPracticeForm(practice);
                  setActiveTab("edit");
                }}
              >
                ✏️ Sửa
              </button>
              {practice.status === "published" && (
                <button onClick={() => alert("Chức năng unpublish")}>
                  📤 Ẩn
                </button>
              )}
            </div>

            <div className="practice-dates">
              <small>
                Tạo: {practice.createdAt.toLocaleDateString("vi-VN")}
              </small>
              <small>
                Cập nhật: {practice.lastUpdated.toLocaleDateString("vi-VN")}
              </small>
            </div>
          </div>
        ))}
      </div>

      {practices.length === 0 && (
        <div className="empty-state">
          <p>📭 Chưa có bài luyện tập nào</p>
          <button onClick={() => setActiveTab("create")}>
            Tạo bài đầu tiên
          </button>
        </div>
      )}
    </div>
  );

  const renderCreateForm = () => (
    <div className="create-form">
      <div className="form-header">
        <h3>➕ Tạo bài luyện tập mới</h3>
        <button onClick={() => setActiveTab("list")}>← Quay lại</button>
      </div>

      <div className="form-content">
        <div className="form-section">
          <h4>📋 Thông tin cơ bản</h4>

          <div className="form-group">
            <label>Tiêu đề *</label>
            <input
              type="text"
              value={practiceForm.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Tên bài luyện tập"
            />
          </div>

          <div className="form-group">
            <label>Mô tả *</label>
            <textarea
              rows={4}
              value={practiceForm.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Mô tả chi tiết về bài luyện tập"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ngôn ngữ</label>
              <select
                value={practiceForm.language}
                onChange={(e) => handleInputChange("language", e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
              </select>
            </div>

            <div className="form-group">
              <label>Độ khó</label>
              <select
                value={practiceForm.difficulty}
                onChange={(e) =>
                  handleInputChange("difficulty", e.target.value)
                }
              >
                <option value="easy">Dễ</option>
                <option value="medium">Trung bình</option>
                <option value="hard">Khó</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Thời gian (ms)</label>
              <input
                type="number"
                value={practiceForm.timeLimit}
                onChange={(e) =>
                  handleInputChange("timeLimit", parseInt(e.target.value))
                }
                min="1000"
                max="30000"
              />
            </div>

            <div className="form-group">
              <label>Bộ nhớ (MB)</label>
              <input
                type="number"
                value={practiceForm.memoryLimit}
                onChange={(e) =>
                  handleInputChange("memoryLimit", parseInt(e.target.value))
                }
                min="32"
                max="512"
              />
            </div>

            <div className="form-group">
              <label>Điểm tối đa</label>
              <input
                type="number"
                value={practiceForm.maxScore}
                onChange={(e) =>
                  handleInputChange("maxScore", parseInt(e.target.value))
                }
                min="10"
                max="1000"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Tags (cách nhau bằng dấu phẩy)</label>
            <input
              type="text"
              value={practiceForm.tags.join(", ")}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="Array, String, Algorithm"
            />
          </div>
        </div>

        <div className="form-section">
          <h4>🧪 Test Cases</h4>
          <p className="note">
            Cần ít nhất 1 test case public và 1 test case private
          </p>

          {practiceForm.testCases.map((tc, index) => (
            <div key={index} className="test-case">
              <div className="test-case-header">
                <span>Test Case {index + 1}</span>
                <div className="test-case-controls">
                  <label>
                    <input
                      type="checkbox"
                      checked={tc.isPublic}
                      onChange={(e) =>
                        updateTestCase(index, "isPublic", e.target.checked)
                      }
                    />
                    Public
                  </label>
                  {practiceForm.testCases.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="remove-btn"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="test-case-content">
                <div className="form-group">
                  <label>Input</label>
                  <textarea
                    rows={3}
                    value={tc.input}
                    onChange={(e) =>
                      updateTestCase(index, "input", e.target.value)
                    }
                    placeholder="Input data"
                  />
                </div>

                <div className="form-group">
                  <label>Expected Output</label>
                  <textarea
                    rows={3}
                    value={tc.output}
                    onChange={(e) =>
                      updateTestCase(index, "output", e.target.value)
                    }
                    placeholder="Expected output"
                  />
                </div>

                <div className="form-group">
                  <label>Mô tả (tùy chọn)</label>
                  <input
                    type="text"
                    value={tc.description}
                    onChange={(e) =>
                      updateTestCase(index, "description", e.target.value)
                    }
                    placeholder="Giải thích test case này"
                  />
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={addTestCase} className="add-test-btn">
            ➕ Thêm test case
          </button>
        </div>

        <div className="form-section">
          <h4>💡 Sample Solution (tùy chọn)</h4>
          <textarea
            rows={10}
            value={practiceForm.sampleSolution}
            onChange={(e) =>
              handleInputChange("sampleSolution", e.target.value)
            }
            placeholder={getDefaultCode(practiceForm.language)}
            className="code-textarea"
          />
        </div>

        <div className="form-section">
          <h4>👁️ Hiển thị</h4>
          <div className="visibility-options">
            <label>
              <input
                type="radio"
                name="visibility"
                value="standalone"
                checked={practiceForm.visibility === "standalone"}
                onChange={(e) =>
                  handleInputChange("visibility", e.target.value)
                }
              />
              Độc lập (hiển thị trong kho bài tập)
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="course"
                checked={practiceForm.visibility === "course"}
                onChange={(e) =>
                  handleInputChange("visibility", e.target.value)
                }
              />
              Nhúng vào bài học
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handlePreview} className="preview-btn">
            👁️ Preview
          </button>
          <button type="button" onClick={handleSaveDraft} className="draft-btn">
            💾 Lưu nháp
          </button>
          <button type="button" onClick={handlePublish} className="publish-btn">
            🚀 Xuất bản
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="code-practice-management">
      <div className="management-header">
        <h2>⚡ Quản lý bài luyện tập Code</h2>
        <p>Tạo và quản lý các bài luyện tập lập trình cho học viên</p>
      </div>

      <div className="management-tabs">
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          📋 Danh sách ({practices.length})
        </button>
        <button
          className={activeTab === "create" ? "active" : ""}
          onClick={() => setActiveTab("create")}
        >
          ➕ Tạo mới
        </button>
      </div>

      <div className="management-content">
        {activeTab === "list" && renderPracticeList()}
        {(activeTab === "create" || activeTab === "edit") && renderCreateForm()}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="modal-overlay">
          <div className="preview-modal">
            <div className="modal-header">
              <h3>👁️ Preview Kết quả</h3>
              <button onClick={() => setShowPreview(false)}>✕</button>
            </div>

            <div className="modal-content">
              {isPreviewLoading ? (
                <div className="loading">
                  <p>⚡ Đang chạy preview...</p>
                  <div className="loading-bar"></div>
                </div>
              ) : previewResult ? (
                <div className="preview-result">
                  <div className="result-summary">
                    <h4>📊 Kết quả tổng quan</h4>
                    <div className="summary-stats">
                      <span>
                        ✅{" "}
                        {previewResult.results.filter((r) => r.passed).length}/
                        {previewResult.results.length} test cases passed
                      </span>
                      <span>
                        ⏱️ {Math.round(previewResult.executionTime)}ms
                      </span>
                      <span>💾 {Math.round(previewResult.memoryUsed)}MB</span>
                    </div>
                  </div>

                  <div className="test-results">
                    <h4>🧪 Chi tiết test cases</h4>
                    {previewResult.results.map((result, index) => (
                      <div
                        key={index}
                        className={`test-result ${
                          result.passed ? "passed" : "failed"
                        }`}
                      >
                        <div className="test-header">
                          <span>Test {index + 1}</span>
                          <span
                            className={`status ${
                              result.passed ? "pass" : "fail"
                            }`}
                          >
                            {result.passed ? "✅ PASS" : "❌ FAIL"}
                          </span>
                        </div>
                        <div className="test-details">
                          <div>
                            <strong>Input:</strong> {result.input}
                          </div>
                          <div>
                            <strong>Expected:</strong> {result.expected}
                          </div>
                          <div>
                            <strong>Actual:</strong> {result.actual}
                          </div>
                          <div>
                            <strong>Time:</strong>{" "}
                            {Math.round(result.executionTime)}ms
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="note">
                    ℹ️ Preview chỉ chạy với {previewResult.publicTests} test
                    case public. Tổng cộng có {previewResult.totalTests} test
                    cases.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePracticeManagement;
