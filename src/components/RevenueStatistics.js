import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./RevenueStatistics.css";

const RevenueStatistics = () => {
  const { user } = useSelector((state) => state.auth);
  const [dateRange, setDateRange] = useState("30days");
  const [customDateRange, setCustomDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedInstructor, setSelectedInstructor] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [transactionStatus, setTransactionStatus] = useState("all");
  const [courseType, setCourseType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [reconciliationStatus, setReconciliationStatus] = useState("synced");

  const [revenueData, setRevenueData] = useState({
    summary: {
      totalRevenue: 2450000000, // 2.45 billion VND
      totalTransactions: 15420,
      successfulTransactions: 14830,
      refunds: 590,
      averageOrderValue: 159000,
      growth: 18.5,
    },
    courseRevenue: [
      {
        id: 1,
        name: "JavaScript Cơ Bản",
        revenue: 450000000,
        transactions: 2500,
        instructor: "Nguyễn Văn A",
        type: "paid",
      },
      {
        id: 2,
        name: "React Advanced",
        revenue: 380000000,
        transactions: 1900,
        instructor: "Trần Thị B",
        type: "paid",
      },
      {
        id: 3,
        name: "Python for Beginners",
        revenue: 320000000,
        transactions: 2100,
        instructor: "Lê Văn C",
        type: "paid",
      },
      {
        id: 4,
        name: "Node.js Backend",
        revenue: 290000000,
        transactions: 1450,
        instructor: "Phạm Thị D",
        type: "paid",
      },
      {
        id: 5,
        name: "Vue.js Fundamentals",
        revenue: 250000000,
        transactions: 1200,
        instructor: "Hoàng Văn E",
        type: "paid",
      },
    ],
    instructorRevenue: [
      {
        name: "Nguyễn Văn A",
        revenue: 450000000,
        courses: 3,
        transactions: 2500,
      },
      {
        name: "Trần Thị B",
        revenue: 380000000,
        courses: 2,
        transactions: 1900,
      },
      { name: "Lê Văn C", revenue: 320000000, courses: 4, transactions: 2100 },
      {
        name: "Phạm Thị D",
        revenue: 290000000,
        courses: 2,
        transactions: 1450,
      },
      {
        name: "Hoàng Văn E",
        revenue: 250000000,
        courses: 3,
        transactions: 1200,
      },
    ],
    timeRevenue: [],
    paymentMethods: [
      {
        method: "VNPay",
        revenue: 980000000,
        transactions: 6200,
        percentage: 40,
      },
      {
        method: "MoMo",
        revenue: 735000000,
        transactions: 4650,
        percentage: 30,
      },
      {
        method: "Banking",
        revenue: 490000000,
        transactions: 2800,
        percentage: 20,
      },
      {
        method: "Credit Card",
        revenue: 245000000,
        transactions: 1770,
        percentage: 10,
      },
    ],
    transactionStatuses: [
      {
        status: "success",
        count: 14830,
        revenue: 2450000000,
        percentage: 96.2,
      },
      { status: "pending", count: 180, revenue: 28000000, percentage: 1.2 },
      { status: "failed", count: 320, revenue: 0, percentage: 2.1 },
      { status: "refunded", count: 590, revenue: -94000000, percentage: 3.8 },
    ],
    detailedTransactions: [],
  });

  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [chartData, setChartData] = useState({});
  const [drillDownData, setDrillDownData] = useState(null);
  const [showDrillDown, setShowDrillDown] = useState(false);

  useEffect(() => {
    loadFiltersData();
    loadChartData();
    loadDetailedTransactions();
  }, [
    dateRange,
    customDateRange,
    selectedCourse,
    selectedInstructor,
    paymentMethod,
    transactionStatus,
  ]);

  const loadFiltersData = () => {
    const mockCourses = [
      { id: "all", name: "Tất cả khóa học" },
      ...revenueData.courseRevenue.map((course) => ({
        id: course.id,
        name: course.name,
      })),
    ];

    const mockInstructors = [
      { id: "all", name: "Tất cả giảng viên" },
      ...revenueData.instructorRevenue.map((instructor) => ({
        id: instructor.name,
        name: instructor.name,
      })),
    ];

    setCourses(mockCourses);
    setInstructors(mockInstructors);
  };

  const loadChartData = () => {
    const days = dateRange === "7days" ? 7 : dateRange === "30days" ? 30 : 90;
    const revenueByTime = [];
    const comparisonData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const dailyRevenue = Math.floor(Math.random() * 50000000) + 20000000; // 20M - 70M VND
      const previousRevenue = Math.floor(Math.random() * 45000000) + 18000000;

      revenueByTime.push({
        date: date.toLocaleDateString("vi-VN"),
        revenue: dailyRevenue,
        transactions: Math.floor(dailyRevenue / 159000),
      });

      comparisonData.push({
        date: date.toLocaleDateString("vi-VN"),
        current: dailyRevenue,
        previous: previousRevenue,
      });
    }

    setRevenueData((prev) => ({
      ...prev,
      timeRevenue: revenueByTime,
    }));

    setChartData({
      timeRevenue: revenueByTime,
      comparison: comparisonData,
    });
  };

  const loadDetailedTransactions = () => {
    const transactions = [];
    for (let i = 0; i < 50; i++) {
      const course =
        revenueData.courseRevenue[
          Math.floor(Math.random() * revenueData.courseRevenue.length)
        ];
      const paymentMethods = ["VNPay", "MoMo", "Banking", "Credit Card"];
      const statuses = ["success", "pending", "failed", "refunded"];

      transactions.push({
        id: `TX${String(i + 1).padStart(6, "0")}`,
        courseId: course.id,
        courseName: course.name,
        studentName: `Học viên ${i + 1}`,
        amount: Math.floor(Math.random() * 500000) + 100000,
        paymentMethod:
          paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
        instructor: course.instructor,
      });
    }

    setRevenueData((prev) => ({
      ...prev,
      detailedTransactions: transactions,
    }));
  };

  const handleQuickDateRange = (range) => {
    setDateRange(range);
    setCustomDateRange({ startDate: "", endDate: "" });
  };

  const handleCustomDateChange = (field, value) => {
    setCustomDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "endDate" && value && customDateRange.startDate) {
      setDateRange("custom");
    }
  };

  const handleDrillDown = (type, item) => {
    let transactions = [];

    if (type === "course") {
      transactions = revenueData.detailedTransactions.filter(
        (t) => t.courseId === item.id
      );
    } else if (type === "instructor") {
      transactions = revenueData.detailedTransactions.filter(
        (t) => t.instructor === item.name
      );
    } else if (type === "payment") {
      transactions = revenueData.detailedTransactions.filter(
        (t) => t.paymentMethod === item.method
      );
    } else if (type === "status") {
      transactions = revenueData.detailedTransactions.filter(
        (t) => t.status === item.status
      );
    }

    setDrillDownData({
      type,
      item,
      transactions,
    });
    setShowDrillDown(true);
  };

  const exportData = async (format) => {
    setExportLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const exportData = {
        summary: revenueData.summary,
        filters: {
          dateRange,
          customDateRange,
          selectedCourse,
          selectedInstructor,
          paymentMethod,
          transactionStatus,
          courseType,
        },
        exportedAt: new Date().toISOString(),
        exportedBy: user?.name,
      };

      if (format === "pdf") {
        // Simulate PDF generation
        alert("Đã tạo báo cáo PDF thành công! File sẽ được tải xuống.");
      } else {
        // CSV Export
        const csvData = [
          ["BÁO CÁO DOANH THU", ""],
          ["Thời gian xuất", new Date().toLocaleString("vi-VN")],
          ["Người xuất", user?.name],
          ["Khoảng thời gian", dateRange],
          [""],
          ["TỔNG QUAN", ""],
          [
            "Tổng doanh thu (VND)",
            revenueData.summary.totalRevenue.toLocaleString(),
          ],
          [
            "Tổng giao dịch",
            revenueData.summary.totalTransactions.toLocaleString(),
          ],
          [
            "Giao dịch thành công",
            revenueData.summary.successfulTransactions.toLocaleString(),
          ],
          ["Hoàn tiền", revenueData.summary.refunds.toLocaleString()],
          [
            "Giá trị đơn hàng TB (VND)",
            revenueData.summary.averageOrderValue.toLocaleString(),
          ],
          ["Tăng trưởng (%)", revenueData.summary.growth],
          [""],
          ["DOANH THU THEO KHÓA HỌC", "", "", ""],
          ["Tên khóa học", "Doanh thu (VND)", "Giao dịch", "Giảng viên"],
          ...revenueData.courseRevenue.map((course) => [
            course.name,
            course.revenue.toLocaleString(),
            course.transactions.toLocaleString(),
            course.instructor,
          ]),
        ];

        const csvContent = csvData.map((row) => row.join(",")).join("\n");
        const blob = new Blob(["\uFEFF" + csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `revenue_report_${
          new Date().toISOString().split("T")[0]
        }.csv`;
        link.click();
      }

      // Log audit
      console.log("Export audit:", exportData);
    } catch (error) {
      alert("Có lỗi xảy ra khi xuất báo cáo. Vui lòng thử lại.");
    } finally {
      setExportLoading(false);
    }
  };

  const runReconciliation = async () => {
    setLoading(true);
    setReconciliationStatus("running");

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate reconciliation result
      const hasDiscrepancies = Math.random() > 0.7; // 30% chance of discrepancies

      if (hasDiscrepancies) {
        setReconciliationStatus("discrepancy");
        alert("Phát hiện chênh lệch! Vui lòng tải báo cáo đối soát để xử lý.");
      } else {
        setReconciliationStatus("synced");
        alert("Đối soát hoàn tất! Không có chênh lệch nào được phát hiện.");
      }
    } catch (error) {
      setReconciliationStatus("error");
      alert("Lỗi khi chạy đối soát. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      success: "#2ed573",
      pending: "#ffa502",
      failed: "#ff4757",
      refunded: "#5f27cd",
    };
    return colors[status] || "#666";
  };

  const getReconciliationStatusColor = () => {
    const colors = {
      synced: "#2ed573",
      running: "#ffa502",
      discrepancy: "#ff4757",
      error: "#ff4757",
    };
    return colors[reconciliationStatus] || "#666";
  };

  return (
    <div className="revenue-statistics">
      <div className="revenue-header">
        <h2>💰 Thống kê doanh thu</h2>
        <p>Báo cáo chi tiết và phân tích doanh thu hệ thống</p>
      </div>

      {/* Filters */}
      <div className="revenue-filters">
        <div className="filter-section">
          <h3>🔍 Bộ lọc báo cáo</h3>

          <div className="filter-row">
            <div className="filter-group">
              <label>Khoảng thời gian:</label>
              <div className="date-options">
                <button
                  className={dateRange === "7days" ? "active" : ""}
                  onClick={() => handleQuickDateRange("7days")}
                >
                  7 ngày
                </button>
                <button
                  className={dateRange === "30days" ? "active" : ""}
                  onClick={() => handleQuickDateRange("30days")}
                >
                  30 ngày
                </button>
                <button
                  className={dateRange === "90days" ? "active" : ""}
                  onClick={() => handleQuickDateRange("90days")}
                >
                  90 ngày
                </button>
              </div>
            </div>

            <div className="filter-group">
              <label>Tùy chọn:</label>
              <div className="custom-date-range">
                <input
                  type="date"
                  value={customDateRange.startDate}
                  onChange={(e) =>
                    handleCustomDateChange("startDate", e.target.value)
                  }
                  placeholder="Từ ngày"
                />
                <span>đến</span>
                <input
                  type="date"
                  value={customDateRange.endDate}
                  onChange={(e) =>
                    handleCustomDateChange("endDate", e.target.value)
                  }
                  placeholder="Đến ngày"
                />
              </div>
            </div>
          </div>

          <div className="filter-row">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  📚 {course.name}
                </option>
              ))}
            </select>

            <select
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
            >
              <option value="all">Tất cả loại khóa</option>
              <option value="paid">Khóa trả phí</option>
              <option value="free">Khóa miễn phí</option>
            </select>

            {user?.role === "admin" && (
              <select
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
              >
                {instructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    👨‍🏫 {instructor.name}
                  </option>
                ))}
              </select>
            )}

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="all">Tất cả PT thanh toán</option>
              <option value="VNPay">VNPay</option>
              <option value="MoMo">MoMo</option>
              <option value="Banking">Banking</option>
              <option value="Credit Card">Credit Card</option>
            </select>

            <select
              value={transactionStatus}
              onChange={(e) => setTransactionStatus(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="success">Thành công</option>
              <option value="pending">Đang xử lý</option>
              <option value="failed">Thất bại</option>
              <option value="refunded">Hoàn tiền</option>
            </select>
          </div>
        </div>

        <div className="action-section">
          <div className="reconciliation-status">
            <span className="status-label">Trạng thái đối soát:</span>
            <span
              className="status-badge"
              style={{ backgroundColor: getReconciliationStatusColor() }}
            >
              {reconciliationStatus === "synced"
                ? "✅ Đã đồng bộ"
                : reconciliationStatus === "running"
                ? "⏳ Đang chạy"
                : reconciliationStatus === "discrepancy"
                ? "⚠️ Có chênh lệch"
                : "❌ Lỗi"}
            </span>
            <button
              className="reconcile-btn"
              onClick={runReconciliation}
              disabled={loading}
            >
              {loading ? "⏳" : "🔄"} Chạy đối soát
            </button>
          </div>

          <div className="export-actions">
            <button
              className="export-btn pdf"
              onClick={() => exportData("pdf")}
              disabled={exportLoading}
            >
              {exportLoading ? "⏳" : "📄"} Xuất PDF
            </button>
            <button
              className="export-btn excel"
              onClick={() => exportData("excel")}
              disabled={exportLoading}
            >
              {exportLoading ? "⏳" : "📊"} Xuất Excel
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="revenue-summary">
        <div className="summary-card primary">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <div className="card-value">
              {formatCurrency(revenueData.summary.totalRevenue)}
            </div>
            <div className="card-label">Tổng doanh thu</div>
            <div className="card-growth positive">
              +{revenueData.summary.growth}% so với kỳ trước
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <div className="card-value">
              {revenueData.summary.totalTransactions.toLocaleString()}
            </div>
            <div className="card-label">Tổng giao dịch</div>
            <div className="card-detail">
              ✅ {revenueData.summary.successfulTransactions.toLocaleString()}{" "}
              thành công
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">↩️</div>
          <div className="card-content">
            <div className="card-value">
              {revenueData.summary.refunds.toLocaleString()}
            </div>
            <div className="card-label">Hoàn tiền</div>
            <div className="card-detail">
              {(
                (revenueData.summary.refunds /
                  revenueData.summary.totalTransactions) *
                100
              ).toFixed(1)}
              % tổng GD
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">💳</div>
          <div className="card-content">
            <div className="card-value">
              {formatCurrency(revenueData.summary.averageOrderValue)}
            </div>
            <div className="card-label">AOV (Giá trị TB)</div>
            <div className="card-detail">
              {(
                revenueData.summary.totalRevenue /
                revenueData.summary.successfulTransactions
              ).toLocaleString()}{" "}
              VND/GD
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="revenue-content">
        {/* Time Revenue Chart */}
        <div className="chart-section">
          <h3>📈 Doanh thu theo thời gian</h3>
          <div className="line-chart">
            {chartData.timeRevenue?.map((day, index) => (
              <div key={index} className="chart-point">
                <div
                  className="point"
                  style={{
                    height: `${(day.revenue / 70000000) * 100}%`,
                    backgroundColor:
                      day.revenue > 50000000 ? "#2ed573" : "#ffa502",
                  }}
                  title={`${day.date}: ${formatCurrency(day.revenue)}`}
                />
                <div className="point-label">{day.date.split("/")[0]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Revenue Table */}
        <div className="table-section">
          <h3>🏆 Doanh thu theo khóa học</h3>
          <div className="revenue-table">
            <table>
              <thead>
                <tr>
                  <th>Xếp hạng</th>
                  <th>Khóa học</th>
                  <th>Doanh thu</th>
                  <th>Giao dịch</th>
                  <th>Giảng viên</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.courseRevenue.map((course, index) => (
                  <tr key={course.id}>
                    <td>
                      <div className="rank">#{index + 1}</div>
                    </td>
                    <td>
                      <div className="course-info">
                        <strong>{course.name}</strong>
                      </div>
                    </td>
                    <td>
                      <div className="revenue-amount">
                        {formatCurrency(course.revenue)}
                      </div>
                    </td>
                    <td>{course.transactions.toLocaleString()}</td>
                    <td>{course.instructor}</td>
                    <td>
                      <button
                        className="drill-down-btn"
                        onClick={() => handleDrillDown("course", course)}
                      >
                        🔍 Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods Chart */}
        <div className="chart-section">
          <h3>💳 Phương thức thanh toán</h3>
          <div className="payment-methods">
            {revenueData.paymentMethods.map((method, index) => (
              <div key={index} className="payment-method">
                <div className="method-info">
                  <span className="method-name">{method.method}</span>
                  <span className="method-percentage">
                    {method.percentage}%
                  </span>
                </div>
                <div className="method-bar">
                  <div
                    className="bar-fill"
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
                <div className="method-details">
                  <span>{formatCurrency(method.revenue)}</span>
                  <span>{method.transactions.toLocaleString()} GD</span>
                  <button
                    className="drill-down-btn small"
                    onClick={() => handleDrillDown("payment", method)}
                  >
                    🔍
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Status */}
        <div className="chart-section">
          <h3>📊 Trạng thái giao dịch</h3>
          <div className="status-chart">
            {revenueData.transactionStatuses.map((status, index) => (
              <div key={index} className="status-item">
                <div
                  className="status-bar"
                  style={{
                    width: `${status.percentage}%`,
                    backgroundColor: getStatusColor(status.status),
                  }}
                />
                <div className="status-info">
                  <span className="status-name">
                    {status.status === "success"
                      ? "✅ Thành công"
                      : status.status === "pending"
                      ? "⏳ Đang xử lý"
                      : status.status === "failed"
                      ? "❌ Thất bại"
                      : "↩️ Hoàn tiền"}
                  </span>
                  <span className="status-count">
                    {status.count.toLocaleString()}
                  </span>
                  <button
                    className="drill-down-btn small"
                    onClick={() => handleDrillDown("status", status)}
                  >
                    🔍
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drill Down Modal */}
      {showDrillDown && drillDownData && (
        <div className="drill-down-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                🔍 Chi tiết giao dịch -{" "}
                {drillDownData.item.name ||
                  drillDownData.item.method ||
                  drillDownData.item.status}
              </h3>
              <button
                className="close-btn"
                onClick={() => setShowDrillDown(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="transactions-table">
                <table>
                  <thead>
                    <tr>
                      <th>Mã GD</th>
                      <th>Khóa học</th>
                      <th>Học viên</th>
                      <th>Số tiền</th>
                      <th>PT thanh toán</th>
                      <th>Trạng thái</th>
                      <th>Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drillDownData.transactions
                      .slice(0, 20)
                      .map((transaction) => (
                        <tr key={transaction.id}>
                          <td>
                            <code>{transaction.id}</code>
                          </td>
                          <td>{transaction.courseName}</td>
                          <td>{transaction.studentName}</td>
                          <td>{formatCurrency(transaction.amount)}</td>
                          <td>{transaction.paymentMethod}</td>
                          <td>
                            <span
                              className="status-badge"
                              style={{
                                backgroundColor: getStatusColor(
                                  transaction.status
                                ),
                              }}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td>
                            {transaction.createdAt.toLocaleString("vi-VN")}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {drillDownData.transactions.length > 20 && (
                <div className="modal-footer">
                  <p>
                    Hiển thị 20/{drillDownData.transactions.length} giao dịch
                  </p>
                  <button className="export-btn">📊 Xuất tất cả</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueStatistics;
