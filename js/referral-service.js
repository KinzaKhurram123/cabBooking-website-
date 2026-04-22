/**
 * RideLynk Referral Service
 * Handles all referral and wallet API calls
 */

const ReferralService = {
  /**
   * Get my referral code and stats
   * GET /api/referral/my-referral
   */
  async getMyReferral() {
    try {
      const response = await ApiService.get('/referral/my-referral');
      return response;
    } catch (error) {
      console.error('Get my referral error:', error);
      throw error;
    }
  },

  /**
   * Get wallet balance from referrals
   * GET /api/referral/wallet
   */
  async getWallet() {
    try {
      const response = await ApiService.get('/referral/wallet');
      return response;
    } catch (error) {
      console.error('Get referral wallet error:', error);
      throw error;
    }
  },

  /**
   * Validate a referral code before signup
   * POST /api/referral/validate
   */
  async validateReferralCode(referralCode) {
    try {
      const response = await ApiService.post('/referral/validate', {
        referralCode
      }, {
        requiresAuth: false
      });
      return response;
    } catch (error) {
      console.error('Validate referral code error:', error);
      throw error;
    }
  }
};
