import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DEMO_ACCOUNTS } from "../../data/accounts";

const UserManagement = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [users, setUsers] = useState(DEMO_ACCOUNTS);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    role: "student",
    isActive: true,
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    const newUser = {
      ...formData,
      avatar:
        formData.role === "admin"
          ? "👨‍💼"
          : formData.role === "teacher"
          ? "👨‍🏫"
          : "👨‍🎓",
      password: "123456", // Default password
    };

    setUsers([...users, newUser]);
    setFormData({
      username: "",
      fullName: "",
      email: "",
      role: "student",
      isActive: true,
    });
    setShowCreateForm(false);

    // In real app: send API request and log action
    console.log("Created user:", newUser);
  };

  const handleToggleUserStatus = (username) => {
    setUsers(
      users.map((user) =>
        user.username === username
          ? { ...user, isActive: !user.isActive }
          : user
      )
    );

    // Log action
    console.log(`Toggled status for user: ${username}`);
  };

  const handleDeleteUser = (username) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản ${username}?`)) {
      setUsers(users.filter((user) => user.username !== username));
      console.log(`Deleted user: ${username}`);
    }
  };

  const getRoleLabel = (role) => {
    const labels = {
      admin: "Quản trị viên",
      teacher: "Giảng viên",
      student: "Học viên",
    };
    return labels[role] || role;
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: "#dc2626",
      teacher: "#7c3aed",
      student: "#059669",
    };
    return colors[role] || "#6b7280";
  };

  if (userInfo?.role !== "admin") {
    return (
      <div className="main-container">
        <div className="card">
          <h3>❌ Không có quyền truy cập</h3>
          <p>Bạn không có quyền truy cập tính năng này.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="flex justify-between items-center mb-6">
        <h2>👥 Quản lý Tài khoản Người dùng</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          + Tạo tài khoản mới
        </button>
      </div>

      {/* Create User Form */}
      {showCreateForm && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h3>➕ Tạo Tài khoản Mới</h3>
          <form
            onSubmit={handleCreateUser}
            style={{ display: "grid", gap: "1rem" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label>Tên đăng nhập:</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                  placeholder="Nhập tên đăng nhập"
                />
              </div>

              <div className="form-group">
                <label>Họ và tên:</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  placeholder="Nhập họ và tên"
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  placeholder="Nhập email"
                />
              </div>

              <div className="form-group">
                <label>Vai trò:</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="student">Học viên</option>
                  <option value="teacher">Giảng viên</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button type="submit" className="btn btn-primary">
                Tạo tài khoản
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowCreateForm(false)}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="card">
        <h3>📋 Danh sách Tài khoản ({users.length})</h3>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ padding: "1rem", textAlign: "left" }}>Avatar</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>
                  Tên đăng nhập
                </th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Họ tên</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Email</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Vai trò</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>
                  Trạng thái
                </th>
                <th style={{ padding: "1rem", textAlign: "left" }}>
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.username}
                  style={{ borderBottom: "1px solid #e5e7eb" }}
                >
                  <td style={{ padding: "1rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{user.avatar}</span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <strong>{user.username}</strong>
                  </td>
                  <td style={{ padding: "1rem" }}>{user.fullName}</td>
                  <td style={{ padding: "1rem" }}>{user.email}</td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        background: getRoleColor(user.role),
                        color: "white",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        background: user.isActive ? "#10b981" : "#ef4444",
                        color: "white",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {user.isActive ? "Hoạt động" : "Bị khóa"}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        className="btn btn-secondary"
                        style={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
                        onClick={() => setSelectedUser(user)}
                      >
                        Sửa
                      </button>
                      <button
                        className={`btn ${
                          user.isActive ? "btn-danger" : "btn-primary"
                        }`}
                        style={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
                        onClick={() => handleToggleUserStatus(user.username)}
                      >
                        {user.isActive ? "Khóa" : "Mở khóa"}
                      </button>
                      {user.username !== userInfo?.username && (
                        <button
                          className="btn btn-danger"
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.3rem 0.6rem",
                          }}
                          onClick={() => handleDeleteUser(user.username)}
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid" style={{ marginTop: "2rem" }}>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter((u) => u.role === "admin").length}
          </div>
          <div className="stat-label">Quản trị viên</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter((u) => u.role === "teacher").length}
          </div>
          <div className="stat-label">Giảng viên</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter((u) => u.role === "student").length}
          </div>
          <div className="stat-label">Học viên</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter((u) => u.isActive).length}
          </div>
          <div className="stat-label">Tài khoản hoạt động</div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
