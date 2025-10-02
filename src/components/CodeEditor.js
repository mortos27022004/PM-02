import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CodeEditor = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [runHistory, setRunHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Language templates
  const languageTemplates = {
    javascript: `// JavaScript Code
console.log("Hello, World!");

// Tính tổng từ 1 đến n
function sum(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}

console.log("Tổng từ 1 đến 5:", sum(5));`,

    python: `# Python Code
print("Hello, World!")

# Tính tổng từ 1 đến n
def sum_range(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total

print("Tổng từ 1 đến 5:", sum_range(5))`,

    java: `// Java Code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Tính tổng từ 1 đến n
        int n = 5;
        int sum = sumRange(n);
        System.out.println("Tổng từ 1 đến " + n + ": " + sum);
    }
    
    public static int sumRange(int n) {
        int total = 0;
        for (int i = 1; i <= n; i++) {
            total += i;
        }
        return total;
    }
}`,

    cpp: `// C++ Code
#include <iostream>
using namespace std;

int sumRange(int n) {
    int total = 0;
    for (int i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}

int main() {
    cout << "Hello, World!" << endl;
    
    int n = 5;
    int sum = sumRange(n);
    cout << "Tổng từ 1 đến " << n << ": " << sum << endl;
    
    return 0;
}`,

    csharp: `// C# Code
using System;

public class Program {
    public static void Main() {
        Console.WriteLine("Hello, World!");
        
        int n = 5;
        int sum = SumRange(n);
        Console.WriteLine($"Tổng từ 1 đến {n}: {sum}");
    }
    
    public static int SumRange(int n) {
        int total = 0;
        for (int i = 1; i <= n; i++) {
            total += i;
        }
        return total;
    }
}`,
  };

  useEffect(() => {
    // Load template when language changes
    setCode(languageTemplates[selectedLanguage] || "");
  }, [selectedLanguage]);

  useEffect(() => {
    // Load run history from localStorage
    const savedHistory = localStorage.getItem(
      `codeHistory_${userInfo?.username}`
    );
    if (savedHistory) {
      setRunHistory(JSON.parse(savedHistory));
    }
  }, [userInfo]);

  const getLanguageIcon = (lang) => {
    const icons = {
      javascript: "🟨",
      python: "🐍",
      java: "☕",
      cpp: "⚡",
      csharp: "🔷",
    };
    return icons[lang] || "💻";
  };

  const getLanguageName = (lang) => {
    const names = {
      javascript: "JavaScript",
      python: "Python",
      java: "Java",
      cpp: "C++",
      csharp: "C#",
    };
    return names[lang] || lang;
  };

  const runCode = async () => {
    if (!code.trim()) {
      setOutput("❌ Vui lòng nhập code trước khi chạy!");
      return;
    }

    setIsRunning(true);
    setOutput("🔄 Đang chạy code...");

    // Simulate API call to code execution service
    setTimeout(() => {
      let result = "";

      try {
        // Mock different outputs based on language
        switch (selectedLanguage) {
          case "javascript":
            if (code.includes("console.log")) {
              result = `Hello, World!
Tổng từ 1 đến 5: 15`;
            } else {
              result = "✅ Code chạy thành công (không có output)";
            }
            break;

          case "python":
            if (code.includes("print")) {
              result = `Hello, World!
Tổng từ 1 đến 5: 15`;
            } else {
              result = "✅ Code chạy thành công (không có output)";
            }
            break;

          case "java":
            result = `Hello, World!
Tổng từ 1 đến 5: 15`;
            break;

          case "cpp":
            result = `Hello, World!
Tổng từ 1 đến 5: 15`;
            break;

          case "csharp":
            result = `Hello, World!
Tổng từ 1 đến 5: 15`;
            break;

          default:
            result = "✅ Code chạy thành công";
        }

        // Add to run history
        const historyItem = {
          id: Date.now(),
          timestamp: new Date().toLocaleString("vi-VN"),
          language: selectedLanguage,
          code: code,
          output: result,
          status: "success",
        };

        const newHistory = [historyItem, ...runHistory.slice(0, 9)]; // Keep last 10 runs
        setRunHistory(newHistory);
        localStorage.setItem(
          `codeHistory_${userInfo?.username}`,
          JSON.stringify(newHistory)
        );
      } catch (error) {
        result = `❌ Lỗi runtime:
${error.message}

Vui lòng kiểm tra lại code của bạn.`;

        // Add error to history
        const historyItem = {
          id: Date.now(),
          timestamp: new Date().toLocaleString("vi-VN"),
          language: selectedLanguage,
          code: code,
          output: result,
          status: "error",
        };

        const newHistory = [historyItem, ...runHistory.slice(0, 9)];
        setRunHistory(newHistory);
        localStorage.setItem(
          `codeHistory_${userInfo?.username}`,
          JSON.stringify(newHistory)
        );
      }

      setOutput(result);
      setIsRunning(false);
    }, 2000);
  };

  const loadFromHistory = (historyItem) => {
    setSelectedLanguage(historyItem.language);
    setCode(historyItem.code);
    setOutput(historyItem.output);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setRunHistory([]);
    localStorage.removeItem(`codeHistory_${userInfo?.username}`);
  };

  return (
    <div className="main-container">
      {/* Header */}
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: "0 0 0.5rem 0" }}>💻 Code Editor</h1>
        <p style={{ margin: 0, color: "#666" }}>
          Viết và chạy code trực tuyến với nhiều ngôn ngữ lập trình
        </p>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}
      >
        {/* Editor Panel */}
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Editor Header */}
          <div
            style={{
              background: "#2d3748",
              color: "white",
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontWeight: "bold" }}>Chọn ngôn ngữ:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "none",
                  background: "#4a5568",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <option value="javascript">🟨 JavaScript</option>
                <option value="python">🐍 Python</option>
                <option value="java">☕ Java</option>
                <option value="cpp">⚡ C++</option>
                <option value="csharp">🔷 C#</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => setShowHistory(!showHistory)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                📋 Lịch sử ({runHistory.length})
              </button>
              <button
                onClick={runCode}
                disabled={isRunning}
                style={{
                  padding: "0.5rem 1.5rem",
                  background: isRunning ? "#a0aec0" : "#48bb78",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: isRunning ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
              >
                {isRunning ? "⏳ Đang chạy..." : "▶️ Chạy code"}
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div style={{ position: "relative" }}>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Nhập code ${getLanguageName(
                selectedLanguage
              )} của bạn...`}
              style={{
                width: "100%",
                minHeight: "400px",
                padding: "1rem",
                border: "none",
                background: "#1a202c",
                color: "#e2e8f0",
                fontSize: "14px",
                fontFamily: "'Fira Code', 'Consolas', monospace",
                lineHeight: "1.5",
                resize: "vertical",
                outline: "none",
              }}
              spellCheck={false}
            />
            <div
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                background: "rgba(45, 55, 72, 0.8)",
                color: "#a0aec0",
                padding: "0.3rem 0.8rem",
                borderRadius: "15px",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              {getLanguageIcon(selectedLanguage)}{" "}
              {getLanguageName(selectedLanguage)}
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#2d3748",
              color: "white",
              padding: "1rem",
              fontWeight: "bold",
            }}
          >
            📤 Output
          </div>
          <div
            style={{
              padding: "1rem",
              minHeight: "200px",
              background: "#1a202c",
              color: "#e2e8f0",
              fontFamily: "'Fira Code', 'Consolas', monospace",
              fontSize: "14px",
              lineHeight: "1.5",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {output || "Nhấn 'Chạy code' để xem kết quả..."}
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#2d3748",
                color: "white",
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "bold" }}>📋 Lịch sử chạy code</span>
              <button
                onClick={clearHistory}
                style={{
                  padding: "0.3rem 0.8rem",
                  background: "#e53e3e",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                🗑️ Xóa lịch sử
              </button>
            </div>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {runHistory.length === 0 ? (
                <div
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  Chưa có lịch sử chạy code
                </div>
              ) : (
                runHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    style={{
                      padding: "1rem",
                      borderBottom: "1px solid #e2e8f0",
                      cursor: "pointer",
                      hover: { background: "#f7fafc" },
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "#f7fafc")
                    }
                    onMouseLeave={(e) => (e.target.style.background = "white")}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        {getLanguageIcon(item.language)}{" "}
                        {getLanguageName(item.language)}
                        <span
                          style={{
                            padding: "0.1rem 0.5rem",
                            borderRadius: "10px",
                            fontSize: "0.7rem",
                            background:
                              item.status === "success" ? "#c6f6d5" : "#fed7d7",
                            color:
                              item.status === "success" ? "#22543d" : "#c53030",
                          }}
                        >
                          {item.status === "success"
                            ? "✅ Thành công"
                            : "❌ Lỗi"}
                        </span>
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "#666" }}>
                        {item.timestamp}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "#666",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.code.substring(0, 100)}...
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
