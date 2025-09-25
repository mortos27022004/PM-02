import { createSlice } from "@reduxjs/toolkit";
import { SUPPORT_TICKETS } from "../data/extendedData";

const initialState = {
  tickets: SUPPORT_TICKETS,
  faqs: [
    {
      id: 1,
      question: "Làm thế nào để đăng ký khóa học?",
      answer:
        'Bạn có thể đăng ký khóa học bằng cách click vào nút "Đăng ký học" trên trang chi tiết khóa học.',
      category: "general",
      views: 156,
    },
    {
      id: 2,
      question: "Tôi có thể hủy khóa học đã đăng ký không?",
      answer:
        "Bạn có thể hủy khóa học trong vòng 7 ngày đầu sau khi đăng ký và sẽ được hoàn tiền 100%.",
      category: "payment",
      views: 89,
    },
    {
      id: 3,
      question: "Video không tải được, tôi phải làm sao?",
      answer:
        "Vui lòng kiểm tra kết nối internet và thử tải lại trang. Nếu vẫn không được, hãy liên hệ bộ phận hỗ trợ.",
      category: "technical",
      views: 234,
    },
  ],
  chatSessions: [],
};

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    createTicket: (state, action) => {
      const newTicket = {
        id: `TK_${String(Date.now()).slice(-3)}`,
        ...action.payload,
        status: "open",
        priority: "medium",
        assignedTo: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tickets.push(newTicket);
    },

    updateTicketStatus: (state, action) => {
      const { ticketId, status, assignedTo } = action.payload;
      const ticket = state.tickets.find((t) => t.id === ticketId);
      if (ticket) {
        ticket.status = status;
        if (assignedTo) ticket.assignedTo = assignedTo;
        ticket.updatedAt = new Date().toISOString();
      }
    },

    addTicketResponse: (state, action) => {
      const { ticketId, response, responderId, responderName } = action.payload;
      const ticket = state.tickets.find((t) => t.id === ticketId);
      if (ticket) {
        if (!ticket.responses) ticket.responses = [];
        ticket.responses.push({
          id: Math.random().toString(36),
          content: response,
          responderId,
          responderName,
          createdAt: new Date().toISOString(),
        });
        ticket.updatedAt = new Date().toISOString();
      }
    },

    startChatSession: (state, action) => {
      const { userId, userName, supportAgentId } = action.payload;
      const newSession = {
        id: `CHAT_${Date.now()}`,
        userId,
        userName,
        supportAgentId,
        status: "active",
        messages: [],
        startedAt: new Date().toISOString(),
      };
      state.chatSessions.push(newSession);
    },

    addChatMessage: (state, action) => {
      const { sessionId, senderId, senderName, message, senderType } =
        action.payload;
      const session = state.chatSessions.find((s) => s.id === sessionId);
      if (session) {
        session.messages.push({
          id: Math.random().toString(36),
          senderId,
          senderName,
          senderType, // 'user' or 'agent'
          message,
          timestamp: new Date().toISOString(),
        });
      }
    },

    endChatSession: (state, action) => {
      const sessionId = action.payload;
      const session = state.chatSessions.find((s) => s.id === sessionId);
      if (session) {
        session.status = "closed";
        session.endedAt = new Date().toISOString();
      }
    },
  },
});

export const {
  createTicket,
  updateTicketStatus,
  addTicketResponse,
  startChatSession,
  addChatMessage,
  endChatSession,
} = supportSlice.actions;

export default supportSlice.reducer;
