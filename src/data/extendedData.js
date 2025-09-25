// Dữ liệu mở rộng cho hệ thống học tập
export const EXTENDED_COURSES = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Học nền tảng JavaScript từ cơ bản đến nâng cao",
    instructor: "Phạm Văn Giảng viên",
    instructorId: "teacher1",
    students: 120,
    lessons: 24,
    level: "Beginner",
    price: 0, // Free course
    category: "Programming",
    tags: ["javascript", "frontend", "beginner"],
    status: "published", // draft, pending_review, published, rejected
    rating: 4.6,
    totalRatings: 89,
    duration: "40 giờ",
    language: "Tiếng Việt",
    thumbnail: "https://via.placeholder.com/300x200?text=JavaScript",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-20",
  },
  {
    id: 2,
    title: "React Development",
    description: "Xây dựng ứng dụng web hiện đại với React",
    instructor: "Phạm Văn Giảng viên",
    instructorId: "teacher1",
    students: 89,
    lessons: 18,
    level: "Intermediate",
    price: 299000,
    category: "Frontend",
    tags: ["react", "frontend", "intermediate"],
    status: "published",
    rating: 4.8,
    totalRatings: 67,
    duration: "30 giờ",
    language: "Tiếng Việt",
    thumbnail: "https://via.placeholder.com/300x200?text=React",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-15",
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    description: "Phát triển server-side applications với Node.js",
    instructor: "Vũ Thị Hướng dẫn",
    instructorId: "teacher2",
    students: 65,
    lessons: 20,
    level: "Advanced",
    price: 499000,
    category: "Backend",
    tags: ["nodejs", "backend", "advanced"],
    status: "published",
    rating: 4.7,
    totalRatings: 45,
    duration: "45 giờ",
    language: "Tiếng Việt",
    thumbnail: "https://via.placeholder.com/300x200?text=NodeJS",
    createdAt: "2024-01-20",
    updatedAt: "2024-03-10",
  },
  {
    id: 4,
    title: "Database Design & SQL",
    description: "Thiết kế cơ sở dữ liệu và làm chủ SQL",
    instructor: "Vũ Thị Hướng dẫn",
    instructorId: "teacher2",
    students: 95,
    lessons: 16,
    level: "Intermediate",
    price: 199000,
    category: "Database",
    tags: ["sql", "database", "intermediate"],
    status: "published",
    rating: 4.5,
    totalRatings: 78,
    duration: "25 giờ",
    language: "Tiếng Việt",
    thumbnail: "https://via.placeholder.com/300x200?text=SQL",
    createdAt: "2024-02-15",
    updatedAt: "2024-03-25",
  },
  {
    id: 5,
    title: "Python for Data Science",
    description: "Ứng dụng Python trong khoa học dữ liệu",
    instructor: "Hoàng Văn Mentor",
    instructorId: "teacher3",
    students: 78,
    lessons: 22,
    level: "Intermediate",
    price: 399000,
    category: "Data Science",
    tags: ["python", "data-science", "ai"],
    status: "pending_review", // Chờ duyệt
    rating: 0,
    totalRatings: 0,
    duration: "35 giờ",
    language: "Tiếng Việt",
    thumbnail: "https://via.placeholder.com/300x200?text=Python+DS",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-25",
  },
];

// Mock data cho notifications
export const NOTIFICATIONS = [
  {
    id: 1,
    userId: "student1",
    title: "Chào mừng bạn đến với CodeLearn!",
    message:
      "Cảm ơn bạn đã đăng ký tài khoản. Hãy bắt đầu hành trình học tập của mình.",
    type: "welcome",
    isRead: false,
    createdAt: "2024-03-25T10:00:00Z",
  },
  {
    id: 2,
    userId: "student1",
    title: "Khóa học mới được thêm!",
    message: 'Khóa học "React Development" vừa được cập nhật nội dung mới.',
    type: "course_update",
    isRead: true,
    createdAt: "2024-03-24T15:30:00Z",
  },
  {
    id: 3,
    userId: "teacher1",
    title: "Học viên mới đăng ký",
    message:
      "5 học viên mới đã đăng ký vào khóa học JavaScript Fundamentals của bạn.",
    type: "enrollment",
    isRead: false,
    createdAt: "2024-03-23T09:15:00Z",
  },
];

// Mock data cho payments
export const PAYMENTS = [
  {
    id: "PAY_001",
    userId: "student2",
    courseId: 2,
    amount: 299000,
    method: "VNPay",
    status: "success",
    transactionId: "VNP_123456789",
    createdAt: "2024-03-20T14:30:00Z",
  },
  {
    id: "PAY_002",
    userId: "student3",
    courseId: 3,
    amount: 499000,
    method: "MoMo",
    status: "success",
    transactionId: "MOMO_987654321",
    createdAt: "2024-03-18T16:45:00Z",
  },
  {
    id: "PAY_003",
    userId: "student1",
    courseId: 4,
    amount: 199000,
    method: "PayPal",
    status: "pending",
    transactionId: "PP_456789123",
    createdAt: "2024-03-25T11:20:00Z",
  },
];

// Mock data cho comments/discussions
export const COMMENTS = [
  {
    id: 1,
    userId: "student1",
    userName: "Đỗ Văn Học viên",
    courseId: 1,
    lessonId: "lesson_1_1",
    content: "Bài học này rất hay, tôi đã hiểu rõ về biến trong JavaScript.",
    parentId: null,
    createdAt: "2024-03-25T09:30:00Z",
    isHidden: false,
    reportCount: 0,
  },
  {
    id: 2,
    userId: "teacher1",
    userName: "Phạm Văn Giảng viên",
    courseId: 1,
    lessonId: "lesson_1_1",
    content: "Cảm ơn bạn! Hãy tiếp tục với bài tiếp theo nhé.",
    parentId: 1,
    createdAt: "2024-03-25T10:15:00Z",
    isHidden: false,
    reportCount: 0,
  },
  {
    id: 3,
    userId: "student2",
    userName: "Bùi Thị Sinh viên",
    courseId: 2,
    lessonId: "lesson_2_1",
    content: "Làm sao để tạo component trong React vậy thầy?",
    parentId: null,
    createdAt: "2024-03-24T16:45:00Z",
    isHidden: false,
    reportCount: 1,
  },
];

// Mock data cho reports
export const REPORTS = [
  {
    id: 1,
    reporterId: "student3",
    reporterName: "Ngô Văn Learner",
    commentId: 3,
    reason: "spam",
    description: "Câu hỏi này đã được hỏi nhiều lần rồi",
    status: "pending", // pending, resolved, rejected
    createdAt: "2024-03-24T17:00:00Z",
  },
];

// Mock data cho support tickets
export const SUPPORT_TICKETS = [
  {
    id: "TK_001",
    userId: "student1",
    userName: "Đỗ Văn Học viên",
    title: "Không thể truy cập bài học",
    content:
      "Em không thể mở được video bài học JavaScript cơ bản. Mong được hỗ trợ.",
    category: "technical",
    status: "open", // open, in_progress, resolved, closed
    priority: "medium",
    assignedTo: null,
    createdAt: "2024-03-25T08:30:00Z",
    updatedAt: "2024-03-25T08:30:00Z",
  },
  {
    id: "TK_002",
    userId: "student2",
    userName: "Bùi Thị Sinh viên",
    title: "Vấn đề thanh toán",
    content:
      "Em đã chuyển khoản nhưng chưa được mở khóa học. Mã giao dịch: VNP_123456789",
    category: "payment",
    status: "in_progress",
    priority: "high",
    assignedTo: "support_agent_1",
    createdAt: "2024-03-24T14:20:00Z",
    updatedAt: "2024-03-25T09:15:00Z",
  },
];

// Mock data cho learning progress
export const LEARNING_PROGRESS = [
  {
    userId: "student1",
    courseId: 1,
    completedLessons: ["lesson_1_1", "lesson_1_2"],
    totalLessons: 24,
    completionPercentage: 8.3,
    lastAccessedAt: "2024-03-25T10:30:00Z",
    quizScores: {
      quiz_1_1: 85,
      quiz_1_2: 92,
    },
    codeSubmissions: {
      code_1_1: { score: 90, attempts: 2 },
      code_1_2: { score: 78, attempts: 3 },
    },
  },
  {
    userId: "student2",
    courseId: 1,
    completedLessons: ["lesson_1_1", "lesson_1_2", "lesson_1_3", "lesson_1_4"],
    totalLessons: 24,
    completionPercentage: 16.7,
    lastAccessedAt: "2024-03-24T16:45:00Z",
    quizScores: {
      quiz_1_1: 95,
      quiz_1_2: 88,
      quiz_1_3: 91,
    },
  },
  {
    userId: "student2",
    courseId: 2,
    completedLessons: ["lesson_2_1", "lesson_2_2", "lesson_2_3"],
    totalLessons: 18,
    completionPercentage: 16.7,
    lastAccessedAt: "2024-03-25T11:00:00Z",
    quizScores: {
      quiz_2_1: 87,
      quiz_2_2: 94,
    },
  },
];

// Mock data cho course reviews/feedback
export const COURSE_REVIEWS = [
  {
    id: 1,
    userId: "student1",
    userName: "Đỗ Văn Học viên",
    courseId: 1,
    rating: 5,
    comment:
      "Khóa học rất hay, giảng viên giải thích dễ hiểu. Tôi đã nắm vững JavaScript sau khóa học này.",
    createdAt: "2024-03-20T15:30:00Z",
    isVerifiedPurchase: true,
  },
  {
    id: 2,
    userId: "student2",
    userName: "Bùi Thị Sinh viên",
    courseId: 2,
    rating: 4,
    comment:
      "Nội dung React khá tốt, tuy nhiên một số bài tập hơi khó đối với người mới.",
    createdAt: "2024-03-18T09:15:00Z",
    isVerifiedPurchase: true,
  },
];

export default {
  EXTENDED_COURSES,
  NOTIFICATIONS,
  PAYMENTS,
  COMMENTS,
  REPORTS,
  SUPPORT_TICKETS,
  LEARNING_PROGRESS,
  COURSE_REVIEWS,
};
