import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Header = () => {
  const { user, role, isAuthenticated, userInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const getRoleDisplay = (role) => {
    const roleMap = {
      admin: "Quản trị viên",
      teacher: "Giảng viên",
      student: "Học viên",
    };
    return roleMap[role] || role;
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          CodeLearn Demo
        </Link>

        {isAuthenticated && (
          <>
            <nav>
              <ul className="nav-menu">
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/courses">Khóa học</Link>
                </li>
                <li>
                  <Link to="/search">Tìm kiếm</Link>
                </li>
                <li>
                  <Link to="/practice">Luyện tập</Link>
                </li>
                <li>
                  <Link to="/progress">Tiến độ</Link>
                </li>
                <li>
                  <Link to="/feedback">Phản hồi</Link>
                </li>
                <li>
                  <Link to="/notifications">Thông báo</Link>
                </li>
                <li>
                  <Link to="/profile">Tài khoản</Link>
                </li>
                <li>
                  <Link to="/help">Trợ giúp</Link>
                </li>
                {role === "admin" && (
                  <li>
                    <Link to="/admin">Quản lý</Link>
                  </li>
                )}
                {role === "teacher" && (
                  <li>
                    <Link to="/teacher">Giảng dạy</Link>
                  </li>
                )}
                {role === "student" && (
                  <li>
                    <Link to="/student">Học tập</Link>
                  </li>
                )}
              </ul>
            </nav>

            <div className="user-info">
              <span className="role-badge">{getRoleDisplay(role)}</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span style={{ fontSize: "1.2rem" }}>{userInfo?.avatar}</span>
                <span>Xin chào, {userInfo?.fullName || user}!</span>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary">
                Đăng xuất
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
