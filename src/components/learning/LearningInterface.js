import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProgress } from "../../redux/analyticsSlice";

const LearningInterface = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);

  const [code, setCode] = useState(`vector<int> initializeVector(int n)
{
    vector<int> a;
    
    return a;
}`);

  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(40); // percentage

  // Mock lesson data
  const lessonData = {
    id: lessonId || "lesson_1",
    title: "initializeVector",
    description: "Giới thiệu về kiểu bài viết hàm trên Codelearn.",
    content: `Nếu trong các khóa học trước trên Codelearn bạn là đã quen với việc viết code trong hàm main() và sử dụng cin, cout để nhập xuất dữ liệu, thì từ hôm nay bạn sẽ được biết thêm về loại bài khác là loại bài chỉ cần viết hàm, dữ liệu đầu vào sẽ chính là các tham số của đầu ra chính là kết quả trả về của hàm.

Ví dụ nếu đề bài yêu cầu viết hàm trả tính tổng hai số nguyên a và b thì bạn sẽ thấy code có sẵn sẽ giống như sau:

int sum (int a, int b){

}

Việc cần làm của bạn là hoàn thiện hàm sao cho nó trả về đúng kết quả theo yêu cầu của đề bài giống như sau:

int sum (int a, int b){
    return a + b;
}

Lưu ý: nếu hết các thử viện mà bạn cần đều đã được kế thống #include sẵn. Do đó, bạn không cần phải #include thêm.

Bài Tập
Viết hàm khởi tạo và trả về vector gồm n phần tử với các phần tử có giá trị từ 1 tới n.

Giới thiệu vector.
Nếu bạn đã hoàn thành khóa học C++ For Beginners thì chắc chắn đã biết tối thiểu về mảng. Việc sử dụng mảng có nhiều hạn chế, vector có thể được xem thay thế cho mảng.`,

    problemStatement: {
      input: "Số nguyên n",
      output: "Vector có n phần tử với giá trị từ 1 đến n",
      constraints: "1 ≤ n ≤ 1000",
      examples: [
        { input: "3", output: "[1, 2, 3]" },
        { input: "5", output: "[1, 2, 3, 4, 5]" },
      ],
    },

    testCases: [
      { input: "3", expected: "[1, 2, 3]", hidden: false },
      { input: "1", expected: "[1]", hidden: false },
      { input: "5", expected: "[1, 2, 3, 4, 5]", hidden: true },
      {
        input: "10",
        expected: "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
        hidden: true,
      },
    ],
  };

  useEffect(() => {
    setCurrentLesson(lessonData);
  }, [lessonId]);

  const handleRunCode = () => {
    setIsRunning(true);
    setShowOutput(true);

    // Mock test execution
    setTimeout(() => {
      const mockResults = lessonData.testCases.map((testCase, index) => {
        // Simple mock logic - just check if code contains basic structure
        const hasLoop = code.includes("for") || code.includes("while");
        const hasPushBack =
          code.includes("push_back") || code.includes(".push_back");
        const hasReturn = code.includes("return");

        const passed = hasLoop && hasPushBack && hasReturn;

        return {
          id: index + 1,
          input: testCase.input,
          expected: testCase.expected,
          actual: passed ? testCase.expected : "[]",
          passed: passed,
          hidden: testCase.hidden,
          executionTime: Math.floor(Math.random() * 100) + 50 + "ms",
        };
      });

      setTestResults(mockResults);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    handleRunCode();

    // Update learning progress
    const passedTests = testResults.filter((t) => t.passed).length;
    const totalTests = testResults.length;
    const score = Math.round((passedTests / totalTests) * 100);

    dispatch(
      updateProgress({
        userId: userInfo?.username,
        courseId: parseInt(courseId),
        lessonId: lessonId,
        completionData: {
          codeId: lessonData.id,
          codeScore: score,
          attempts: 1,
        },
      })
    );
  };

  const languages = ["C++", "Java", "Python", "JavaScript"];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        backgroundColor: "#1e1e1e",
        color: "#fff",
      }}
    >
      {/* Left Sidebar - Problem Description */}
      <div
        style={{
          width: `${sidebarWidth}%`,
          backgroundColor: "#252526",
          overflowY: "auto",
          borderRight: "1px solid #3e3e42",
        }}
      >
        <div style={{ padding: "1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <button
              onClick={() => navigate("/courses")}
              style={{
                background: "none",
                border: "none",
                color: "#569cd6",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              ← Quay lại khóa học
            </button>
          </div>

          <h2
            style={{
              color: "#569cd6",
              marginBottom: "1rem",
              fontSize: "1.5rem",
            }}
          >
            {currentLesson?.title}
          </h2>

          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                color: "#4ec9b0",
                fontSize: "1.1rem",
                marginBottom: "0.8rem",
              }}
            >
              Giới thiệu về kiểu bài viết hàm trên Codelearn.
            </h3>
            <div
              style={{
                lineHeight: "1.6",
                fontSize: "0.9rem",
                color: "#cccccc",
              }}
            >
              {currentLesson?.content}
            </div>
          </div>

          {/* Problem Statement */}
          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                color: "#4ec9b0",
                fontSize: "1.1rem",
                marginBottom: "0.8rem",
              }}
            >
              Bài Tập
            </h3>
            <div style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "#569cd6" }}>Đầu vào:</strong>
              <span style={{ marginLeft: "0.5rem" }}>
                {currentLesson?.problemStatement.input}
              </span>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "#569cd6" }}>Đầu ra:</strong>
              <span style={{ marginLeft: "0.5rem" }}>
                {currentLesson?.problemStatement.output}
              </span>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "#569cd6" }}>Giới hạn:</strong>
              <span style={{ marginLeft: "0.5rem" }}>
                {currentLesson?.problemStatement.constraints}
              </span>
            </div>
          </div>

          {/* Examples */}
          <div>
            <h3
              style={{
                color: "#4ec9b0",
                fontSize: "1.1rem",
                marginBottom: "0.8rem",
              }}
            >
              Ví dụ
            </h3>
            {currentLesson?.problemStatement.examples.map((example, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#2d2d30",
                  padding: "1rem",
                  borderRadius: "4px",
                  marginBottom: "0.8rem",
                }}
              >
                <div>
                  <strong>Input:</strong> {example.input}
                </div>
                <div>
                  <strong>Output:</strong> {example.output}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resize Handle */}
      <div
        style={{
          width: "4px",
          backgroundColor: "#3e3e42",
          cursor: "col-resize",
        }}
        onMouseDown={(e) => {
          const startX = e.clientX;
          const startWidth = sidebarWidth;

          const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newWidth = startWidth + (deltaX / window.innerWidth) * 100;
            setSidebarWidth(Math.min(Math.max(newWidth, 20), 60));
          };

          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
      />

      {/* Right Side - Code Editor and Tests */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            backgroundColor: "#2d2d30",
            padding: "0.8rem 1.5rem",
            borderBottom: "1px solid #3e3e42",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>Ngôn ngữ:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{
                backgroundColor: "#3c3c3c",
                color: "#fff",
                border: "1px solid #464647",
                borderRadius: "4px",
                padding: "0.3rem 0.8rem",
              }}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: "0.8rem" }}>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              style={{
                backgroundColor: "#0e639c",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.5rem 1rem",
                cursor: isRunning ? "not-allowed" : "pointer",
                opacity: isRunning ? 0.7 : 1,
              }}
            >
              {isRunning ? "🔄 Đang chạy..." : "▶️ Chạy thử"}
            </button>

            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#16a34a",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              📤 Nộp bài
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1 }}>
          {/* Code Editor */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                backgroundColor: "#1e1e1e",
                padding: "0.5rem 1rem",
                borderBottom: "1px solid #3e3e42",
                fontSize: "0.9rem",
                color: "#cccccc",
              }}
            >
              <span style={{ color: "#569cd6" }}>{selectedLanguage}</span>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: "#1e1e1e",
                color: "#d4d4d4",
                border: "none",
                padding: "1rem",
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                fontSize: "14px",
                lineHeight: "1.5",
                resize: "none",
                outline: "none",
              }}
              spellCheck={false}
            />

            {/* Line numbers would go here in a real implementation */}
          </div>

          {/* Test Results Panel */}
          {showOutput && (
            <div
              style={{
                width: "400px",
                backgroundColor: "#252526",
                borderLeft: "1px solid #3e3e42",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  padding: "0.8rem 1rem",
                  borderBottom: "1px solid #3e3e42",
                  fontWeight: "bold",
                  color: "#cccccc",
                }}
              >
                KIỂM THỬ
              </div>

              <div
                style={{
                  padding: "1rem",
                  fontSize: "0.9rem",
                  color: "#888",
                  borderBottom: "1px solid #3e3e42",
                }}
              >
                Vui lòng chờ thử code của bạn trước!
              </div>

              <div style={{ flex: 1, overflowY: "auto" }}>
                {testResults.map((result, index) => (
                  <div
                    key={result.id}
                    style={{
                      padding: "1rem",
                      borderBottom: "1px solid #3e3e42",
                      backgroundColor: result.passed ? "#0f4c0f" : "#4c0f0f",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <strong
                        style={{ color: result.passed ? "#4ade80" : "#f87171" }}
                      >
                        Kiểm thử {result.id}
                      </strong>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          fontSize: "0.8rem",
                        }}
                      >
                        <span>{result.passed ? "✅" : "❌"}</span>
                        <span>{result.executionTime}</span>
                      </div>
                    </div>

                    {!result.hidden && (
                      <>
                        <div
                          style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}
                        >
                          <strong>Đầu vào:</strong> {result.input}
                        </div>
                        <div
                          style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}
                        >
                          <strong>Kết quả mong đợi:</strong> {result.expected}
                        </div>
                        <div style={{ fontSize: "0.8rem" }}>
                          <strong>Kết quả thực tế:</strong> {result.actual}
                        </div>
                      </>
                    )}

                    {result.hidden && (
                      <div style={{ fontSize: "0.8rem", color: "#888" }}>
                        Kiểm thử ẩn - Chỉ hiển thị kết quả
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningInterface;
