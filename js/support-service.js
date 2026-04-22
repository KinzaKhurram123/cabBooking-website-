/**
 * RideLynk Support Service
 * Handles all support ticket and help desk API calls
 */

const SupportService = {
  /**
   * Create a support ticket
   * POST /api/support/create
   */
  async createTicket(ticketData) {
    try {
      const response = await ApiService.post('/support/create', ticketData);
      return response;
    } catch (error) {
      console.error('Create support ticket error:', error);
      throw error;
    }
  },

  /**
   * Get all my support tickets
   * GET /api/support/my-tickets
   */
  async getMyTickets() {
    try {
      const response = await ApiService.get('/support/my-tickets');
      return response;
    } catch (error) {
      console.error('Get my tickets error:', error);
      throw error;
    }
  },

  /**
   * Get a specific ticket with all replies
   * GET /api/support/:ticketId
   */
  async getTicketById(ticketId) {
    try {
      const response = await ApiService.get(`/support/${ticketId}`);
      return response;
    } catch (error) {
      console.error('Get ticket by ID error:', error);
      throw error;
    }
  },

  /**
   * Reply to a support ticket
   * POST /api/support/:ticketId/reply
   */
  async replyToTicket(ticketId, message) {
    try {
      const response = await ApiService.post(`/support/${ticketId}/reply`, {
        message
      });
      return response;
    } catch (error) {
      console.error('Reply to ticket error:', error);
      throw error;
    }
  },

  /**
   * Close a support ticket
   * PUT /api/support/:ticketId/close
   */
  async closeTicket(ticketId) {
    try {
      const response = await ApiService.put(`/support/${ticketId}/close`);
      return response;
    } catch (error) {
      console.error('Close ticket error:', error);
      throw error;
    }
  },

  /**
   * Get all support tickets (Admin)
   * GET /api/support/admin/all
   */
  async getAllTicketsAdmin(status = '', page = 1, limit = 20) {
    try {
      const params = new URLSearchParams({ page, limit });
      if (status) params.append('status', status);
      const response = await ApiService.get(`/support/admin/all?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Get all tickets (admin) error:', error);
      throw error;
    }
  },

  /**
   * Update ticket status (Admin)
   * PUT /api/support/admin/:ticketId/status
   */
  async updateTicketStatusAdmin(ticketId, status, adminReply = '') {
    try {
      const response = await ApiService.put(`/support/admin/${ticketId}/status`, {
        status,
        adminReply
      });
      return response;
    } catch (error) {
      console.error('Update ticket status (admin) error:', error);
      throw error;
    }
  }
};
