import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const LessonDetail = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [reportingComment, setReportingComment] = useState(null);
  const { userInfo, role } = useSelector((state) => state.auth);

  // Mock data - thay bằng API call thực tế
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLesson({
        id: lessonId,
        title: `Bài học ${lessonId.replace("_", " ").replace("_", ".")}`,
        content: `
          <h3>Nội dung bài học</h3>
          <p>Đây là nội dung chi tiết của ${lessonId}. Trong bài học này, chúng ta sẽ học về...</p>
          
          <h4>Mục tiêu bài học:</h4>
          <ul>
            <li>Hiểu được khái niệm cơ bản</li>
            <li>Thực hành qua các ví dụ</li>
            <li>Áp dụng kiến thức vào bài tập</li>
          </ul>

          <h4>Bài tập:</h4>
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
            <p><strong>Đề bài:</strong> Viết chương trình tính tổng các số từ 1 đến n</p>
            <pre><code>// Ví dụ với n = 5
// Kết quả: 1 + 2 + 3 + 4 + 5 = 15</code></pre>
          </div>
        `,
        videoUrl: "https://example.com/video.mp4",
        duration: "15 phút",
      });

      setComments([
        {
          id: 1,
          userId: "student2",
          userName: "Nguyễn Văn B",
          avatar: "👨‍🎓",
          content:
            "Bài học rất hay! Có thể giải thích thêm về phần này không ạ?",
          timestamp: "2024-10-01 14:30",
          replies: [
            {
              id: 2,
              userId: "teacher1",
              userName: "Thầy Minh",
              avatar: "👨‍🏫",
              content: "Chào bạn! Mình sẽ giải thích thêm. Phần này...",
              timestamp: "2024-10-01 15:00",
              isTeacher: true,
            },
          ],
        },
        {
          id: 3,
          userId: "student3",
          userName: "Trần Thị C",
          avatar: "👩‍🎓",
          content: "Code example rất dễ hiểu. Cảm ơn thầy!",
          timestamp: "2024-10-01 16:15",
          replies: [],
        },
      ]);

      setLoading(false);
    }, 1000);
  }, [courseId, lessonId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      userId: userInfo.username,
      userName: userInfo.fullName,
      avatar: userInfo.avatar,
      content: newComment,
      timestamp: new Date().toLocaleString("vi-VN"),
      replies: [],
      isTeacher: role === "teacher",
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleReportComment = (commentId, reason) => {
    alert(`Đã báo cáo bình luận #${commentId} với lý do: ${reason}`);
    setReportingComment(null);
  };

  const handleMentionUser = (username) => {
    setNewComment((prev) => prev + `@${username} `);
  };

  if (loading) {
    return (
      <div className="main-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div>🔄 Đang tải bài học...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      {/* Breadcrumb */}
      <div style={{ marginBottom: "1rem", color: "#666", fontSize: "0.9rem" }}>
        <a href="/" style={{ color: "#667eea", textDecoration: "none" }}>
          Trang chủ
        </a>
        {" > "}
        <a
          href={`/course/${courseId}`}
          style={{ color: "#667eea", textDecoration: "none" }}
        >
          Khóa học {courseId}
        </a>
        {" > "}
        <span>{lesson.title}</span>
      </div>

      {/* Lesson Content */}
      <div
        style={{
          background: "white",
          padding: "2rem",
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
            marginBottom: "1.5rem",
          }}
        >
          <h1 style={{ margin: 0, color: "#333" }}>{lesson.title}</h1>
          <div style={{ color: "#666", fontSize: "0.9rem" }}>
            ⏱️ {lesson.duration}
          </div>
        </div>

        {/* Video Player */}
        <div
          style={{
            background: "#000",
            borderRadius: "8px",
            marginBottom: "2rem",
            minHeight: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          🎥 Video Player (Demo)
        </div>

        {/* Lesson Content */}
        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </div>

      {/* Comments Section */}
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h3
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          💬 Thảo luận ({comments.length} bình luận)
        </h3>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} style={{ marginBottom: "2rem" }}>
          <div
            style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
          >
            <div style={{ fontSize: "2rem" }}>{userInfo?.avatar}</div>
            <div style={{ flex: 1 }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Chia sẻ suy nghĩ của bạn về bài học này... (Sử dụng @username để mention)"
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "0.8rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  resize: "vertical",
                }}
              />
              <div style={{ marginTop: "0.5rem", textAlign: "right" }}>
                <button
                  type="submit"
                  style={{
                    background: "#667eea",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  Gửi bình luận
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                background: "#f8f9fa",
                borderRadius: "8px",
                border: comment.isTeacher
                  ? "2px solid #667eea"
                  : "1px solid #e9ecef",
              }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ fontSize: "2rem" }}>{comment.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong
                      style={{ color: comment.isTeacher ? "#667eea" : "#333" }}
                    >
                      {comment.userName}
                      {comment.isTeacher && (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            background: "#667eea",
                            color: "white",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "3px",
                            marginLeft: "0.5rem",
                          }}
                        >
                          Giảng viên
                        </span>
                      )}
                    </strong>
                    <span style={{ color: "#666", fontSize: "0.8rem" }}>
                      {comment.timestamp}
                    </span>

                    {/* Comment Actions */}
                    <div
                      style={{
                        marginLeft: "auto",
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <button
                        onClick={() => handleMentionUser(comment.userName)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#667eea",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                        title="Trả lời"
                      >
                        💬
                      </button>
                      {comment.userId !== userInfo.username && (
                        <button
                          onClick={() => setReportingComment(comment.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#FF6B6B",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                          title="Báo cáo vi phạm"
                        >
                          🚩
                        </button>
                      )}
                    </div>
                  </div>
                  <p style={{ margin: "0 0 1rem 0", lineHeight: "1.5" }}>
                    {comment.content}
                  </p>

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div
                      style={{
                        marginLeft: "1rem",
                        borderLeft: "2px solid #e2e8f0",
                        paddingLeft: "1rem",
                      }}
                    >
                      {comment.replies.map((reply) => (
                        <div key={reply.id} style={{ marginBottom: "1rem" }}>
                          <div style={{ display: "flex", gap: "1rem" }}>
                            <div style={{ fontSize: "1.5rem" }}>
                              {reply.avatar}
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  marginBottom: "0.5rem",
                                }}
                              >
                                <strong
                                  style={{
                                    color: reply.isTeacher ? "#667eea" : "#333",
                                  }}
                                >
                                  {reply.userName}
                                  {reply.isTeacher && (
                                    <span
                                      style={{
                                        fontSize: "0.7rem",
                                        background: "#667eea",
                                        color: "white",
                                        padding: "0.1rem 0.4rem",
                                        borderRadius: "3px",
                                        marginLeft: "0.3rem",
                                      }}
                                    >
                                      Giảng viên
                                    </span>
                                  )}
                                </strong>
                                <span
                                  style={{ color: "#666", fontSize: "0.8rem" }}
                                >
                                  {reply.timestamp}
                                </span>
                              </div>
                              <p
                                style={{
                                  margin: 0,
                                  lineHeight: "1.5",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {reply.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div style={{ textAlign: "center", color: "#666", padding: "2rem" }}>
            Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ suy nghĩ!
          </div>
        )}
      </div>

      {/* Report Comment Modal */}
      {reportingComment && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <h3>Báo cáo bình luận vi phạm</h3>
            <p>Chọn lý do báo cáo:</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {[
                "Spam hoặc quảng cáo",
                "Ngôn ngữ thù địch",
                "Nội dung không phù hợp",
                "Thông tin sai lệch",
                "Khác",
              ].map((reason) => (
                <button
                  key={reason}
                  onClick={() => handleReportComment(reportingComment, reason)}
                  style={{
                    padding: "0.8rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "5px",
                    background: "white",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {reason}
                </button>
              ))}
            </div>
            <div style={{ marginTop: "1rem", textAlign: "right" }}>
              <button
                onClick={() => setReportingComment(null)}
                style={{
                  padding: "0.8rem 1.5rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "5px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetail;
