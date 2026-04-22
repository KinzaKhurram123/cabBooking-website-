/**
 * RideLynk Withdrawal Service
 * Handles all driver withdrawal and earnings API calls
 */

const WithdrawalService = {
  /**
   * Get driver wallet details
   * GET /api/withdrawal/wallet
   */
  async getWallet() {
    try {
      const response = await ApiService.get('/withdrawal/wallet');
      return response;
    } catch (error) {
      console.error('Get wallet error:', error);
      throw error;
    }
  },

  /**
   * Request a withdrawal
   * POST /api/withdrawal/request
   */
  async requestWithdrawal(amount, bankAccountId) {
    try {
      const response = await ApiService.post('/withdrawal/request', {
        amount,
        bankAccountId
      });
      return response;
    } catch (error) {
      console.error('Request withdrawal error:', error);
      throw error;
    }
  },

  /**
   * Get withdrawal history
   * GET /api/withdrawal/history
   */
  async getWithdrawalHistory() {
    try {
      const response = await ApiService.get('/withdrawal/history');
      return response;
    } catch (error) {
      console.error('Get withdrawal history error:', error);
      throw error;
    }
  },

  /**
   * Update bank account details
   * PUT /api/withdrawal/bank-account
   */
  async updateBankAccount(bankAccountData) {
    try {
      const response = await ApiService.put('/withdrawal/bank-account', bankAccountData);
      return response;
    } catch (error) {
      console.error('Update bank account error:', error);
      throw error;
    }
  },

  /**
   * Get all withdrawal requests (Admin)
   * GET /api/withdrawal/admin/all
   */
  async getAllWithdrawalsAdmin(status = '', page = 1, limit = 20) {
    try {
      const params = new URLSearchParams({ page, limit });
      if (status) params.append('status', status);
      const response = await ApiService.get(`/withdrawal/admin/all?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Get all withdrawals (admin) error:', error);
      throw error;
    }
  },

  /**
   * Approve a withdrawal request (Admin)
   * PUT /api/withdrawal/admin/approve/:withdrawalId
   */
  async approveWithdrawalAdmin(withdrawalId) {
    try {
      const response = await ApiService.put(`/withdrawal/admin/approve/${withdrawalId}`);
      return response;
    } catch (error) {
      console.error('Approve withdrawal (admin) error:', error);
      throw error;
    }
  },

  /**
   * Reject a withdrawal request (Admin)
   * PUT /api/withdrawal/admin/reject/:withdrawalId
   */
  async rejectWithdrawalAdmin(withdrawalId, reason) {
    try {
      const response = await ApiService.put(`/withdrawal/admin/reject/${withdrawalId}`, {
        reason
      });
      return response;
    } catch (error) {
      console.error('Reject withdrawal (admin) error:', error);
      throw error;
    }
  },

  /**
   * Mark withdrawal as paid (Admin)
   * PUT /api/withdrawal/admin/mark-paid/:withdrawalId
   */
  async markWithdrawalPaidAdmin(withdrawalId) {
    try {
      const response = await ApiService.put(`/withdrawal/admin/mark-paid/${withdrawalId}`);
      return response;
    } catch (error) {
      console.error('Mark withdrawal paid (admin) error:', error);
      throw error;
    }
  }
};
