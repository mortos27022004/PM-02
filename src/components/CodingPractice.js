import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";

const CodingPractice = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("challenges");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  // Mock coding challenges
  const [challenges] = useState([
    {
      id: 1,
      title: "Two Sum",
      difficulty: "easy",
      language: ["javascript", "python", "java"],
      description: "Tìm hai số trong mảng có tổng bằng target.",
      examples: [
        { input: "[2,7,11,15], target = 9", output: "[0,1]" },
        { input: "[3,2,4], target = 6", output: "[1,2]" },
      ],
      constraints: [
        "2 ≤ nums.length ≤ 10^4",
        "-10^9 ≤ nums[i] ≤ 10^9",
        "-10^9 ≤ target ≤ 10^9",
      ],
      starterCode: {
        javascript: `function twoSum(nums, target) {
    // Your code here
    
}`,
        python: `def two_sum(nums, target):
    # Your code here
    pass`,
        java: `public int[] twoSum(int[] nums, int target) {
    // Your code here
    
}`,
      },
      testCases: [
        { input: "[2,7,11,15], 9", expected: "[0,1]" },
        { input: "[3,2,4], 6", expected: "[1,2]" },
        { input: "[3,3], 6", expected: "[0,1]" },
      ],
      tags: ["Array", "Hash Table"],
      points: 10,
      solved: true,
    },
    {
      id: 2,
      title: "Reverse String",
      difficulty: "easy",
      language: ["javascript", "python", "java", "cpp"],
      description: "Đảo ngược một chuỗi ký tự.",
      examples: [
        { input: '"hello"', output: '"olleh"' },
        { input: '"world"', output: '"dlrow"' },
      ],
      constraints: [
        "1 ≤ s.length ≤ 10^5",
        "s chỉ chứa các ký tự ASCII in được",
      ],
      starterCode: {
        javascript: `function reverseString(s) {
    // Your code here
    
}`,
        python: `def reverse_string(s):
    # Your code here
    pass`,
        java: `public String reverseString(String s) {
    // Your code here
    
}`,
        cpp: `string reverseString(string s) {
    // Your code here
    
}`,
      },
      testCases: [
        { input: '"hello"', expected: '"olleh"' },
        { input: '"world"', expected: '"dlrow"' },
        { input: '"a"', expected: '"a"' },
      ],
      tags: ["String", "Two Pointers"],
      points: 5,
      solved: false,
    },
    {
      id: 3,
      title: "Binary Tree Inorder Traversal",
      difficulty: "medium",
      language: ["javascript", "python", "java"],
      description: "Duyệt cây nhị phân theo thứ tự inorder.",
      examples: [
        { input: "[1,null,2,3]", output: "[1,3,2]" },
        { input: "[]", output: "[]" },
      ],
      constraints: ["Số node trong cây từ 0 đến 100", "-100 ≤ Node.val ≤ 100"],
      starterCode: {
        javascript: `function inorderTraversal(root) {
    // Your code here
    
}`,
        python: `def inorder_traversal(root):
    # Your code here
    pass`,
        java: `public List<Integer> inorderTraversal(TreeNode root) {
    // Your code here
    
}`,
      },
      testCases: [
        { input: "[1,null,2,3]", expected: "[1,3,2]" },
        { input: "[]", expected: "[]" },
        { input: "[1]", expected: "[1]" },
      ],
      tags: ["Tree", "Stack", "Recursion"],
      points: 20,
      solved: false,
    },
    {
      id: 4,
      title: "Maximum Subarray",
      difficulty: "medium",
      language: ["javascript", "python", "java"],
      description: "Tìm subarray liên tiếp có tổng lớn nhất.",
      examples: [
        { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
        { input: "[1]", output: "1" },
      ],
      constraints: ["1 ≤ nums.length ≤ 10^5", "-10^4 ≤ nums[i] ≤ 10^4"],
      starterCode: {
        javascript: `function maxSubArray(nums) {
    // Your code here
    
}`,
        python: `def max_sub_array(nums):
    # Your code here
    pass`,
        java: `public int maxSubArray(int[] nums) {
    // Your code here
    
}`,
      },
      testCases: [
        { input: "[-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
        { input: "[1]", expected: "1" },
        { input: "[5,4,-1,7,8]", expected: "23" },
      ],
      tags: ["Array", "Dynamic Programming"],
      points: 25,
      solved: false,
    },
    {
      id: 5,
      title: "Valid Parentheses",
      difficulty: "easy",
      language: ["javascript", "python", "java"],
      description: "Kiểm tra chuỗi dấu ngoặc có hợp lệ không.",
      examples: [
        { input: '"()"', output: "true" },
        { input: '"()[]{}"', output: "true" },
        { input: '"(]"', output: "false" },
      ],
      constraints: [
        "1 ≤ s.length ≤ 10^4",
        "s chỉ chứa các ký tự '(', ')', '{', '}', '[', ']'",
      ],
      starterCode: {
        javascript: `function isValid(s) {
    // Your code here
    
}`,
        python: `def is_valid(s):
    # Your code here
    pass`,
        java: `public boolean isValid(String s) {
    // Your code here
    
}`,
      },
      testCases: [
        { input: '"()"', expected: "true" },
        { input: '"()[]{}"', expected: "true" },
        { input: '"(]"', expected: "false" },
      ],
      tags: ["String", "Stack"],
      points: 15,
      solved: false,
    },
  ]);

  const [userProgress] = useState({
    totalSolved: 1,
    totalPoints: 10,
    streakDays: 3,
    rank: 1205,
    easyCount: 1,
    mediumCount: 0,
    hardCount: 0,
  });

  const languages = [
    { value: "javascript", label: "JavaScript", icon: "🟨" },
    { value: "python", label: "Python", icon: "🐍" },
    { value: "java", label: "Java", icon: "☕" },
    { value: "cpp", label: "C++", icon: "⚡" },
  ];

  const difficulties = [
    { value: "", label: "Tất cả", color: "#666" },
    { value: "easy", label: "Dễ", color: "#4CAF50" },
    { value: "medium", label: "Trung bình", color: "#FF9800" },
    { value: "hard", label: "Khó", color: "#F44336" },
  ];

  useEffect(() => {
    if (selectedChallenge) {
      setCode(selectedChallenge.starterCode[selectedLanguage] || "");
    }
  }, [selectedChallenge, selectedLanguage]);

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesLanguage = challenge.language.includes(selectedLanguage);
    const matchesDifficulty =
      selectedDifficulty === "" || challenge.difficulty === selectedDifficulty;
    return matchesLanguage && matchesDifficulty;
  });

  const runCode = () => {
    setIsRunning(true);
    setOutput("Đang chạy code...");

    // Mock code execution
    setTimeout(() => {
      setOutput(`Test case 1: Passed ✓
Test case 2: Passed ✓
Test case 3: Failed ✗
  Expected: "[0,1]"
  Got: "[1,0]"

Runtime: 68ms
Memory: 42.3MB`);
      setIsRunning(false);
    }, 2000);
  };

  const submitCode = () => {
    if (window.confirm("Bạn có chắc muốn nộp bài?")) {
      alert("Code đã được nộp thành công! Bạn đã giải được bài này.");
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colorMap = {
      easy: "#4CAF50",
      medium: "#FF9800",
      hard: "#F44336",
    };
    return colorMap[difficulty] || "#666";
  };

  const getDifficultyText = (difficulty) => {
    const textMap = {
      easy: "Dễ",
      medium: "Trung bình",
      hard: "Khó",
    };
    return textMap[difficulty] || difficulty;
  };

  const renderChallenges = () => (
    <div>
      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: "2rem" }}>
        <div className="stat-card">
          <div className="stat-number">{userProgress.totalSolved}</div>
          <div className="stat-label">Bài đã giải</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{userProgress.totalPoints}</div>
          <div className="stat-label">Điểm tích lũy</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{userProgress.streakDays}</div>
          <div className="stat-label">Ngày liên tiếp</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">#{userProgress.rank}</div>
          <div className="stat-label">Xếp hạng</div>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label style={{ marginRight: "0.5rem", fontWeight: "bold" }}>
            Ngôn ngữ:
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ marginRight: "0.5rem", fontWeight: "bold" }}>
            Độ khó:
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            {difficulties.map((diff) => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: "auto" }}>
          <span style={{ fontSize: "0.9rem", color: "#666" }}>
            {filteredChallenges.length} bài tập
          </span>
        </div>
      </div>

      {/* Challenge List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="card"
            style={{
              cursor: "pointer",
              border: challenge.solved ? "2px solid #4CAF50" : "1px solid #ddd",
              background: challenge.solved ? "#f8fff8" : "white",
            }}
            onClick={() => setSelectedChallenge(challenge)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "1rem",
              }}
            >
              <h4 style={{ margin: 0 }}>
                {challenge.solved && "✅ "}
                {challenge.title}
              </h4>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <span
                  style={{
                    background: getDifficultyColor(challenge.difficulty),
                    color: "white",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "12px",
                    fontSize: "0.7rem",
                  }}
                >
                  {getDifficultyText(challenge.difficulty)}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#666" }}>
                  {challenge.points}pt
                </span>
              </div>
            </div>

            <p
              style={{
                color: "#666",
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              {challenge.description}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.3rem",
                marginBottom: "1rem",
              }}
            >
              {challenge.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#f0f0f0",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "12px",
                    fontSize: "0.7rem",
                    color: "#666",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justify: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", gap: "0.3rem" }}>
                {challenge.language.map((lang) => (
                  <span key={lang} style={{ fontSize: "1.2rem" }}>
                    {languages.find((l) => l.value === lang)?.icon}
                  </span>
                ))}
              </div>

              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: challenge.solved ? "#4CAF50" : "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                {challenge.solved ? "Đã giải" : "Thử thách"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div>
      <h3 style={{ marginBottom: "2rem" }}>🏆 Bảng xếp hạng</h3>

      <div
        style={{
          background: "white",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        {[
          {
            rank: 1,
            name: "Alice Johnson",
            points: 2450,
            solved: 98,
            avatar: "👩‍💻",
          },
          {
            rank: 2,
            name: "Bob Smith",
            points: 2380,
            solved: 95,
            avatar: "👨‍💻",
          },
          {
            rank: 3,
            name: "Charlie Brown",
            points: 2245,
            solved: 89,
            avatar: "🧑‍💻",
          },
          {
            rank: 4,
            name: userInfo?.fullName || "Bạn",
            points: userProgress.totalPoints,
            solved: userProgress.totalSolved,
            avatar: userInfo?.avatar || "👤",
          },
          {
            rank: 5,
            name: "David Wilson",
            points: 2100,
            solved: 84,
            avatar: "👨‍🔬",
          },
        ].map((user) => (
          <div
            key={user.rank}
            style={{
              padding: "1.5rem",
              borderBottom: user.rank < 5 ? "1px solid #eee" : "none",
              background:
                user.name === (userInfo?.fullName || "Bạn")
                  ? "#f8f9ff"
                  : "white",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                minWidth: "50px",
                height: "50px",
                borderRadius: "50%",
                background:
                  user.rank <= 3
                    ? user.rank === 1
                      ? "#FFD700"
                      : user.rank === 2
                      ? "#C0C0C0"
                      : "#CD7F32"
                    : "#667eea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {user.rank <= 3
                ? user.rank === 1
                  ? "🥇"
                  : user.rank === 2
                  ? "🥈"
                  : "🥉"
                : user.rank}
            </div>

            <div style={{ fontSize: "2rem" }}>{user.avatar}</div>

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 0.3rem 0" }}>
                {user.name}
                {user.name === (userInfo?.fullName || "Bạn") && (
                  <span
                    style={{
                      background: "#667eea",
                      color: "white",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "12px",
                      fontSize: "0.7rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Bạn
                  </span>
                )}
              </h4>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                <span>{user.points} điểm</span>
                <span>{user.solved} bài đã giải</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCodeEditor = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        height: "80vh",
      }}
    >
      {/* Problem Description */}
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "1.5rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ margin: 0 }}>{selectedChallenge.title}</h3>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span
              style={{
                background: getDifficultyColor(selectedChallenge.difficulty),
                color: "white",
                padding: "0.3rem 0.8rem",
                borderRadius: "15px",
                fontSize: "0.8rem",
              }}
            >
              {getDifficultyText(selectedChallenge.difficulty)}
            </span>
            <span style={{ fontSize: "0.9rem", color: "#666" }}>
              {selectedChallenge.points} điểm
            </span>
          </div>
        </div>

        <p style={{ lineHeight: "1.6", marginBottom: "1.5rem" }}>
          {selectedChallenge.description}
        </p>

        <div style={{ marginBottom: "1.5rem" }}>
          <h4>Ví dụ:</h4>
          {selectedChallenge.examples.map((example, index) => (
            <div
              key={index}
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                marginBottom: "1rem",
                fontFamily: "monospace",
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

        <div style={{ marginBottom: "1.5rem" }}>
          <h4>Ràng buộc:</h4>
          <ul>
            {selectedChallenge.constraints.map((constraint, index) => (
              <li key={index} style={{ marginBottom: "0.3rem" }}>
                {constraint}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Tags:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {selectedChallenge.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#667eea",
                  color: "white",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "15px",
                  fontSize: "0.8rem",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Code Editor and Output */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Language Selector */}
        <div
          style={{
            background: "white",
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Ngôn ngữ:</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              {selectedChallenge.language.map((lang) => {
                const langInfo = languages.find((l) => l.value === lang);
                return (
                  <option key={lang} value={lang}>
                    {langInfo?.label || lang}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Code Editor */}
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "1rem",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ margin: 0 }}>Code Editor</h4>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={runCode}
                disabled={isRunning}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isRunning ? "not-allowed" : "pointer",
                  opacity: isRunning ? 0.6 : 1,
                }}
              >
                {isRunning ? "Đang chạy..." : "▶️ Chạy"}
              </button>
              <button
                onClick={submitCode}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                📤 Nộp bài
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "1rem",
              fontFamily: "Monaco, Menlo, 'Ubuntu Mono', monospace",
              fontSize: "14px",
              lineHeight: "1.5",
              resize: "none",
            }}
            placeholder="// Viết code của bạn ở đây..."
          />
        </div>

        {/* Output */}
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            height: "200px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
            <h4 style={{ margin: 0 }}>Kết quả</h4>
          </div>
          <pre
            style={{
              flex: 1,
              padding: "1rem",
              margin: 0,
              fontFamily: "Monaco, Menlo, 'Ubuntu Mono', monospace",
              fontSize: "13px",
              overflow: "auto",
              background: "#f8f9fa",
            }}
          >
            {output || "Chưa có kết quả. Nhấn 'Chạy' để kiểm tra code của bạn."}
          </pre>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ margin: "0 0 0.5rem 0" }}>💻 Luyện tập lập trình</h1>
            <p style={{ margin: 0, color: "#666" }}>
              Nâng cao kỹ năng coding với các bài tập thực hành
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => (window.location.href = "/code-editor")}
              style={{
                padding: "0.8rem 1.5rem",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ⚡ Code Editor
            </button>
          </div>

          {selectedChallenge && (
            <button
              onClick={() => setSelectedChallenge(null)}
              style={{
                padding: "0.8rem 1.5rem",
                background: "#f0f0f0",
                color: "#666",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ← Quay lại danh sách
            </button>
          )}
        </div>
      </div>

      {selectedChallenge ? (
        renderCodeEditor()
      ) : (
        <>
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
                { key: "challenges", label: "🎯 Thử thách" },
                { key: "leaderboard", label: "🏆 Xếp hạng" },
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
          {activeTab === "challenges" && renderChallenges()}
          {activeTab === "leaderboard" && renderLeaderboard()}
        </>
      )}
    </div>
  );
};

export default CodingPractice;
