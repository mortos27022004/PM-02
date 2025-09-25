// Dữ liệu tài khoản demo cho từng role
export const DEMO_ACCOUNTS = [
  // Admin accounts
  {
    username: "admin1",
    password: "123456",
    role: "admin",
    fullName: "Nguyễn Văn Admin",
    email: "admin1@codelearn.io",
    avatar: "👨‍💼",
  },
  {
    username: "admin2",
    password: "123456",
    role: "admin",
    fullName: "Trần Thị Quản lý",
    email: "admin2@codelearn.io",
    avatar: "👩‍💼",
  },
  {
    username: "admin3",
    password: "123456",
    role: "admin",
    fullName: "Lê Văn Điều hành",
    email: "admin3@codelearn.io",
    avatar: "🧑‍💼",
  },

  // Teacher accounts
  {
    username: "teacher1",
    password: "123456",
    role: "teacher",
    fullName: "Phạm Văn Giảng viên",
    email: "teacher1@codelearn.io",
    avatar: "👨‍🏫",
    subjects: ["JavaScript", "React"],
  },
  {
    username: "teacher2",
    password: "123456",
    role: "teacher",
    fullName: "Vũ Thị Hướng dẫn",
    email: "teacher2@codelearn.io",
    avatar: "👩‍🏫",
    subjects: ["Node.js", "Database"],
  },
  {
    username: "teacher3",
    password: "123456",
    role: "teacher",
    fullName: "Hoàng Văn Mentor",
    email: "teacher3@codelearn.io",
    avatar: "🧑‍🏫",
    subjects: ["Python", "AI/ML"],
  },

  // Student accounts
  {
    username: "student1",
    password: "123456",
    role: "student",
    fullName: "Đỗ Văn Học viên",
    email: "student1@codelearn.io",
    avatar: "👨‍🎓",
    level: "Beginner",
  },
  {
    username: "student2",
    password: "123456",
    role: "student",
    fullName: "Bùi Thị Sinh viên",
    email: "student2@codelearn.io",
    avatar: "👩‍🎓",
    level: "Intermediate",
  },
  {
    username: "student3",
    password: "123456",
    role: "student",
    fullName: "Ngô Văn Learner",
    email: "student3@codelearn.io",
    avatar: "🧑‍🎓",
    level: "Advanced",
  },
];

// Hàm xác thực tài khoản
export const authenticateUser = (username, password) => {
  const user = DEMO_ACCOUNTS.find(
    (account) => account.username === username && account.password === password
  );

  if (user) {
    return {
      success: true,
      user: {
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        ...(user.subjects && { subjects: user.subjects }),
        ...(user.level && { level: user.level }),
      },
    };
  }

  return {
    success: false,
    message: "Tên đăng nhập hoặc mật khẩu không đúng!",
  };
};
