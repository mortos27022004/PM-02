import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./StudentProgress.css";

const StudentProgress = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [student, setStudent] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentId) {
      loadStudentProgress();
    }
  }, [studentId]);

  const loadStudentProgress = async () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockStudent = {
        id: parseInt(studentId),
        name: "Nguyễn Văn A",
        email: "nguyenvana@email.com",
        avatar: null,
        enrollDate: "2024-01-15",
        lastActive: new Date(Date.now() - 1000 * 60 * 30),
        totalStudyTime: 45,
        totalCourses: 3,
        completedCourses: 1,
        certificates: 2,
      };

      const mockProgressData = {
        courses: [
          {
            id: 1,
            name: "JavaScript Cơ Bản",
            progress: 75,
            status: "in_progress",
            enrollDate: "2024-01-15",
            lastAccessed: new Date(Date.now() - 1000 * 60 * 30),
            totalLessons: 20,
            completedLessons: 15,
            averageScore: 8.5,
            studyTime: 25,
            lessons: [
              {
                id: 1,
                title: "Giới thiệu JavaScript",
                status: "completed",
                completedAt: "2024-01-16",
                studyTime: 2.5,
                quiz: {
                  score: 9,
                  maxScore: 10,
                  attempts: 1,
                  completedAt: "2024-01-16",
                  answers: [
                    {
                      question: "JavaScript là gì?",
                      answer: "Ngôn ngữ lập trình",
                      correct: true,
                    },
                    {
                      question: "Biến trong JS",
                      answer: "var, let, const",
                      correct: true,
                    },
                  ],
                },
              },
              {
                id: 2,
                title: "Biến và Kiểu dữ liệu",
                status: "completed",
                completedAt: "2024-01-17",
                studyTime: 3,
                quiz: {
                  score: 8,
                  maxScore: 10,
                  attempts: 2,
                  completedAt: "2024-01-17",
                  answers: [
                    {
                      question: "Kiểu dữ liệu number?",
                      answer: "Số",
                      correct: true,
                    },
                    {
                      question: "Null vs undefined",
                      answer: "Khác nhau",
                      correct: false,
                    },
                  ],
                },
                assignment: {
                  title: "Bài tập biến",
                  status: "completed",
                  submittedAt: "2024-01-17",
                  score: 85,
                  feedback: "Code tốt, cần chú ý naming convention",
                },
              },
              {
                id: 3,
                title: "Hàm trong JavaScript",
                status: "completed",
                completedAt: "2024-01-18",
                studyTime: 4,
                codeSubmission: {
                  problem: "Viết hàm tính giai thừa",
                  submittedAt: "2024-01-18",
                  code: `function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
                  testResults: [
                    {
                      input: "5",
                      expected: "120",
                      actual: "120",
                      passed: true,
                    },
                    { input: "0", expected: "1", actual: "1", passed: true },
                    { input: "3", expected: "6", actual: "6", passed: true },
                  ],
                  score: 100,
                  feedback:
                    "Giải pháp tuyệt vời! Sử dụng đệ quy một cách hiệu quả.",
                },
              },
              {
                id: 4,
                title: "Array và Object",
                status: "in_progress",
                startedAt: "2024-01-19",
                studyTime: 1.5,
                quiz: null,
                assignment: {
                  title: "Thao tác với Array",
                  status: "pending",
                  dueDate: "2024-01-25",
                },
              },
              {
                id: 5,
                title: "DOM Manipulation",
                status: "not_started",
                quiz: null,
                assignment: null,
              },
            ],
          },
          {
            id: 2,
            name: "React Advanced",
            progress: 30,
            status: "in_progress",
            enrollDate: "2024-02-01",
            lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            totalLessons: 15,
            completedLessons: 4,
            averageScore: 7.8,
            studyTime: 12,
            lessons: [
              // Similar structure...
            ],
          },
        ],
      };

      setStudent(mockStudent);
      setProgressData(mockProgressData);
      if (mockProgressData.courses.length > 0) {
        setSelectedCourse(mockProgressData.courses[0].id.toString());
      }
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: "#27ae60",
      in_progress: "#f39c12",
      not_started: "#95a5a6",
      pending: "#e74c3c",
    };
    return colors[status] || "#666";
  };

  const getStatusText = (status) => {
    const texts = {
      completed: "Hoàn thành",
      in_progress: "Đang học",
      not_started: "Chưa bắt đầu",
      pending: "Chờ nộp",
    };
    return texts[status] || status;
  };

  const handleViewSubmission = (lesson, type) => {
    setSubmissionDetails({
      lesson,
      type,
      content:
        type === "quiz"
          ? lesson.quiz
          : type === "assignment"
          ? lesson.assignment
          : lesson.codeSubmission,
    });
    setShowSubmissionModal(true);
  };

  const exportProgress = () => {
    const course = progressData.courses.find(
      (c) => c.id.toString() === selectedCourse
    );
    if (!course) return;

    const headers = [
      "Bài học",
      "Trạng thái",
      "Ngày hoàn thành",
      "Thời gian học (giờ)",
      "Điểm Quiz",
      "Điểm Bài tập",
      "Điểm Code",
    ];

    const csvContent = [
      `Báo cáo tiến độ: ${student.name} - ${course.name}`,
      `Ngày xuất: ${new Date().toLocaleDateString("vi-VN")}`,
      "",
      headers.join(","),
      ...course.lessons.map((lesson) =>
        [
          lesson.title,
          getStatusText(lesson.status),
          lesson.completedAt || "",
          lesson.studyTime || 0,
          lesson.quiz?.score || "",
          lesson.assignment?.score || "",
          lesson.codeSubmission?.score || "",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `progress_${student.name}_${course.name}_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="student-progress loading">
        <p>⏳ Đang tải dữ liệu tiến độ...</p>
      </div>
    );
  }

  if (!student || !progressData) {
    return (
      <div className="student-progress error">
        <p>❌ Không tìm thấy dữ liệu học viên</p>
        <button onClick={() => navigate("/student-list")}>
          ← Quay lại danh sách
        </button>
      </div>
    );
  }

  const selectedCourseData = progressData.courses.find(
    (c) => c.id.toString() === selectedCourse
  );

  return (
    <div className="student-progress">
      <div className="progress-header">
        <button className="back-btn" onClick={() => navigate("/student-list")}>
          ← Quay lại danh sách
        </button>
        <div className="student-info">
          <div className="student-avatar">
            {student.avatar ? (
              <img src={student.avatar} alt={student.name} />
            ) : (
              <div className="avatar-placeholder">
                {student.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="student-details">
            <h2>{student.name}</h2>
            <p>{student.email}</p>
            <div className="student-stats">
              <span>
                📅 Tham gia:{" "}
                {new Date(student.enrollDate).toLocaleDateString("vi-VN")}
              </span>
              <span>⏱️ {student.totalStudyTime}h học tập</span>
              <span>
                📚 {student.completedCourses}/{student.totalCourses} khóa hoàn
                thành
              </span>
              <span>🏆 {student.certificates} chứng chỉ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="course-selector">
        <label>Chọn khóa học:</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          {progressData.courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name} ({course.progress}% hoàn thành)
            </option>
          ))}
        </select>
        <button className="export-btn" onClick={exportProgress}>
          📊 Xuất báo cáo
        </button>
      </div>

      {selectedCourseData && (
        <div className="course-progress">
          <div className="course-overview">
            <div className="overview-card">
              <h3>{selectedCourseData.name}</h3>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${selectedCourseData.progress}%` }}
                />
              </div>
              <p>{selectedCourseData.progress}% hoàn thành</p>
            </div>

            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-number">
                  {selectedCourseData.completedLessons}/
                  {selectedCourseData.totalLessons}
                </div>
                <div className="stat-label">Bài học</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {selectedCourseData.averageScore}/10
                </div>
                <div className="stat-label">Điểm TB</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {selectedCourseData.studyTime}h
                </div>
                <div className="stat-label">Thời gian</div>
              </div>
            </div>
          </div>

          <div className="lessons-progress">
            <h3>📋 Chi tiết tiến độ bài học</h3>
            <div className="lessons-list">
              {selectedCourseData.lessons.map((lesson) => (
                <div key={lesson.id} className="lesson-item">
                  <div className="lesson-header">
                    <div className="lesson-info">
                      <h4>{lesson.title}</h4>
                      <span
                        className="lesson-status"
                        style={{
                          backgroundColor: getStatusColor(lesson.status),
                        }}
                      >
                        {getStatusText(lesson.status)}
                      </span>
                    </div>
                    <div className="lesson-meta">
                      {lesson.completedAt && (
                        <span>
                          ✅{" "}
                          {new Date(lesson.completedAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      )}
                      {lesson.studyTime && <span>⏱️ {lesson.studyTime}h</span>}
                    </div>
                  </div>

                  <div className="lesson-details">
                    {lesson.quiz && (
                      <div className="assessment-item quiz">
                        <div className="assessment-info">
                          <span className="type">📝 Quiz</span>
                          <span className="score">
                            {lesson.quiz.score}/{lesson.quiz.maxScore}
                          </span>
                          <span className="attempts">
                            Lần {lesson.quiz.attempts}
                          </span>
                        </div>
                        <button
                          className="view-btn"
                          onClick={() => handleViewSubmission(lesson, "quiz")}
                        >
                          👁️ Xem đáp án
                        </button>
                      </div>
                    )}

                    {lesson.assignment && (
                      <div className="assessment-item assignment">
                        <div className="assessment-info">
                          <span className="type">
                            📋 {lesson.assignment.title}
                          </span>
                          {lesson.assignment.score && (
                            <span className="score">
                              {lesson.assignment.score}/100
                            </span>
                          )}
                          <span
                            className="status"
                            style={{
                              color: getStatusColor(lesson.assignment.status),
                            }}
                          >
                            {getStatusText(lesson.assignment.status)}
                          </span>
                        </div>
                        {lesson.assignment.status === "completed" && (
                          <button
                            className="view-btn"
                            onClick={() =>
                              handleViewSubmission(lesson, "assignment")
                            }
                          >
                            👁️ Xem bài nộp
                          </button>
                        )}
                      </div>
                    )}

                    {lesson.codeSubmission && (
                      <div className="assessment-item code">
                        <div className="assessment-info">
                          <span className="type">
                            💻 {lesson.codeSubmission.problem}
                          </span>
                          <span className="score">
                            {lesson.codeSubmission.score}/100
                          </span>
                          <span className="tests">
                            ✅{" "}
                            {
                              lesson.codeSubmission.testResults.filter(
                                (t) => t.passed
                              ).length
                            }
                            /{lesson.codeSubmission.testResults.length} tests
                          </span>
                        </div>
                        <button
                          className="view-btn"
                          onClick={() => handleViewSubmission(lesson, "code")}
                        >
                          👁️ Xem code
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Submission Detail Modal */}
      {showSubmissionModal && submissionDetails && (
        <div className="modal-overlay">
          <div className="submission-modal">
            <div className="modal-header">
              <h3>
                {submissionDetails.type === "quiz" && "📝 Chi tiết Quiz"}
                {submissionDetails.type === "assignment" &&
                  "📋 Chi tiết Bài tập"}
                {submissionDetails.type === "code" && "💻 Chi tiết Code"}
              </h3>
              <button onClick={() => setShowSubmissionModal(false)}>✕</button>
            </div>

            <div className="modal-content">
              {submissionDetails.type === "quiz" && (
                <div className="quiz-details">
                  <div className="quiz-summary">
                    <p>
                      <strong>Điểm:</strong> {submissionDetails.content.score}/
                      {submissionDetails.content.maxScore}
                    </p>
                    <p>
                      <strong>Lần thử:</strong>{" "}
                      {submissionDetails.content.attempts}
                    </p>
                    <p>
                      <strong>Hoàn thành:</strong>{" "}
                      {new Date(
                        submissionDetails.content.completedAt
                      ).toLocaleString("vi-VN")}
                    </p>
                  </div>

                  <div className="quiz-answers">
                    <h4>Đáp án chi tiết:</h4>
                    {submissionDetails.content.answers.map((answer, index) => (
                      <div
                        key={index}
                        className={`answer-item ${
                          answer.correct ? "correct" : "incorrect"
                        }`}
                      >
                        <div className="question">{answer.question}</div>
                        <div className="answer">{answer.answer}</div>
                        <div className="result">
                          {answer.correct ? "✅ Đúng" : "❌ Sai"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {submissionDetails.type === "assignment" && (
                <div className="assignment-details">
                  <div className="assignment-summary">
                    <p>
                      <strong>Điểm:</strong> {submissionDetails.content.score}
                      /100
                    </p>
                    <p>
                      <strong>Nộp lúc:</strong>{" "}
                      {new Date(
                        submissionDetails.content.submittedAt
                      ).toLocaleString("vi-VN")}
                    </p>
                  </div>

                  {submissionDetails.content.feedback && (
                    <div className="feedback">
                      <h4>Nhận xét của giảng viên:</h4>
                      <p>{submissionDetails.content.feedback}</p>
                    </div>
                  )}
                </div>
              )}

              {submissionDetails.type === "code" && (
                <div className="code-details">
                  <div className="code-summary">
                    <p>
                      <strong>Bài toán:</strong>{" "}
                      {submissionDetails.content.problem}
                    </p>
                    <p>
                      <strong>Điểm:</strong> {submissionDetails.content.score}
                      /100
                    </p>
                    <p>
                      <strong>Nộp lúc:</strong>{" "}
                      {new Date(
                        submissionDetails.content.submittedAt
                      ).toLocaleString("vi-VN")}
                    </p>
                  </div>

                  <div className="code-submission">
                    <h4>Code đã nộp:</h4>
                    <pre className="code-block">
                      {submissionDetails.content.code}
                    </pre>
                  </div>

                  <div className="test-results">
                    <h4>Kết quả test cases:</h4>
                    {submissionDetails.content.testResults.map(
                      (test, index) => (
                        <div
                          key={index}
                          className={`test-case ${
                            test.passed ? "passed" : "failed"
                          }`}
                        >
                          <div className="test-info">
                            <span>
                              Test {index + 1}:{" "}
                              {test.passed ? "✅ PASS" : "❌ FAIL"}
                            </span>
                          </div>
                          <div className="test-details">
                            <div>
                              <strong>Input:</strong> {test.input}
                            </div>
                            <div>
                              <strong>Expected:</strong> {test.expected}
                            </div>
                            <div>
                              <strong>Actual:</strong> {test.actual}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {submissionDetails.content.feedback && (
                    <div className="feedback">
                      <h4>Nhận xét:</h4>
                      <p>{submissionDetails.content.feedback}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProgress;
