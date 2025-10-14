import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";

const Login = () => {
  const [username, setUsername] = useState("student1");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginError } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading time
    setTimeout(() => {
      dispatch(loginUser(username, password));
      setIsLoading(false);

      // Navigate will be handled by useEffect in App.js if login is successful
      if (!loginError) {
        navigate("/");
      }
    }, 500);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập CodeLearn</h2>

        {loginError && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "0.8rem",
              borderRadius: "5px",
              marginBottom: "1rem",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            {loginError}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Nhập tên đăng nhập"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="login-btn"
          disabled={isLoading}
          style={{
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {/* OAuth Login */}
        <div style={{ margin: "1.5rem 0" }}>
          <div style={{ textAlign: "center", margin: "1rem 0", color: "#555" }}>
            Hoặc đăng nhập với
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              type="button"
              onClick={() =>
                alert("Chức năng đăng nhập với Google đang phát triển")
              }
              style={{
                flex: 1,
                padding: "0.8rem",
                border: "2px solid #db4437",
                borderRadius: "5px",
                background: "white",
                color: "#db4437",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              🔴 Google
            </button>
            <button
              type="button"
              onClick={() =>
                alert("Chức năng đăng nhập với Facebook đang phát triển")
              }
              style={{
                flex: 1,
                padding: "0.8rem",
                border: "2px solid #4267B2",
                borderRadius: "5px",
                background: "white",
                color: "#4267B2",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              🔵 Facebook
            </button>
          </div>
        </div>

        {/* Register and Forgot Password Links */}
        <div
          style={{
            marginTop: "1rem",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a
            href="/register"
            style={{
              color: "#667eea",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            📝 Đăng ký tài khoản
          </a>
          <a
            href="/forgot-password"
            style={{
              color: "#667eea",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            🔑 Quên mật khẩu?
          </a>
        </div>

        {/* Demo accounts info */}
        <div
          style={{
            marginTop: "1.5rem",
            fontSize: "0.85rem",
            color: "#333",
            textAlign: "left",
            background: "#f8f9fa",
            padding: "1rem",
            borderRadius: "5px",
            border: "1px solid #e9ecef",
          }}
        >
          <h4
            style={{
              margin: "0 0 0.8rem 0",
              color: "#333",
              fontSize: "0.9rem",
            }}
          >
            🔑 Tài khoản demo:
          </h4>

          <div style={{ marginBottom: "0.8rem" }}>
            <strong style={{ color: "#667eea" }}>👨‍💼 Quản trị viên:</strong>
            <div>• admin1 / 123456</div>
            <div>• admin2 / 123456</div>
            <div>• admin3 / 123456</div>
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <strong style={{ color: "#667eea" }}>👨‍🏫 Giảng viên:</strong>
            <div>• teacher1 / 123456</div>
            <div>• teacher2 / 123456</div>
            <div>• teacher3 / 123456</div>
          </div>

          <div>
            <strong style={{ color: "#667eea" }}>🎓 Học viên:</strong>
            <div>• student1 / 123456</div>
            <div>• student2 / 123456</div>
            <div>• student3 / 123456</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
