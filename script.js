const problemData = {
  billing: {
    category: "Billing",
    title: "Billing system",
    current: "Bills are prepared using paper, calculators or separate spreadsheets.",
    problem: "The team repeats entries, loses invoice history and takes longer to answer billing questions.",
    system: "A billing application with invoices, customer records, payment status and searchable history.",
    improvement: "Faster billing, fewer manual mistakes and clear collection tracking.",
  },
  stock: {
    category: "Stock",
    title: "Inventory system",
    current: "Stock is maintained in notebooks or separate Excel files.",
    problem: "The business cannot easily identify current stock, shortages or fast-moving products.",
    system: "A connected inventory application with purchases, sales, stock movement, alerts and reports.",
    improvement: "Real-time stock visibility and fewer stock-related mistakes.",
  },
  customers: {
    category: "Customers",
    title: "Customer management system",
    current: "Customer details are stored in registers, phone contacts or chat history.",
    problem: "Follow-ups depend on memory, and useful customer history is hard to find quickly.",
    system: "A customer management system with profiles, purchases, notes, reminders and activity history.",
    improvement: "Better follow-up discipline and faster customer service.",
  },
  orders: {
    category: "Orders",
    title: "Order tracking system",
    current: "Orders come through calls, WhatsApp messages and handwritten notes.",
    problem: "Order status becomes unclear, delivery promises are missed and changes are hard to track.",
    system: "An order workflow with order capture, assignment, delivery status and alerts.",
    improvement: "Every order stays visible from request to delivery.",
  },
  payments: {
    category: "Payments",
    title: "Payment and collection system",
    current: "Payments and collections are tracked manually in notebooks or spreadsheets.",
    problem: "Pending amounts are easy to miss, and collection follow-ups happen late.",
    system: "A payment dashboard with dues, reminders, receipts and customer balances.",
    improvement: "Cleaner cash-flow visibility and timely payment follow-ups.",
  },
  attendance: {
    category: "Attendance",
    title: "Attendance and payroll system",
    current: "Attendance is marked in books and later re-entered for salary calculations.",
    problem: "Payroll preparation takes time and errors appear when attendance records are copied manually.",
    system: "Attendance and payroll tools with daily status, leave tracking, salary inputs and reports.",
    improvement: "Reliable employee records and simpler payroll preparation.",
  },
  reports: {
    category: "Reports",
    title: "Business dashboard",
    current: "Reports are prepared by combining multiple files at the end of the day or month.",
    problem: "Decisions wait for manual report preparation, and numbers differ across files.",
    system: "Business dashboards with sales, stock, payments, customers and operational reports in one place.",
    improvement: "Instant reporting from the same data used by the team daily.",
  },
  approvals: {
    category: "Approvals",
    title: "Approval workflow system",
    current: "Approvals happen through calls, messages or verbal confirmation.",
    problem: "Requests get stuck because ownership, status and history are not visible.",
    system: "Approval workflows with request status, assigned owners, reminders and audit history.",
    improvement: "Clear accountability and faster decisions.",
  },
};

const problemTabs = document.querySelectorAll(".problem-tab");
const detailFields = {
  category: document.querySelector("#detail-category"),
  title: document.querySelector("#detail-title"),
  current: document.querySelector("#detail-current"),
  problem: document.querySelector("#detail-problem"),
  system: document.querySelector("#detail-system"),
  improvement: document.querySelector("#detail-improvement"),
};

problemTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const problem = problemData[tab.dataset.problem];

    if (!problem) {
      return;
    }

    problemTabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
    });

    detailFields.category.textContent = problem.category;
    detailFields.title.textContent = problem.title;
    detailFields.current.textContent = problem.current;
    detailFields.problem.textContent = problem.problem;
    detailFields.system.textContent = problem.system;
    detailFields.improvement.textContent = problem.improvement;
  });
});
