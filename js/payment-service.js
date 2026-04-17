/**
 * RideLynk Payment Service
 * Handles all payment-related API calls (Stripe integration)
 */

const PaymentService = {
  /**
   * Setup payment method (Create Stripe SetupIntent)
   * POST /rides/payment/setup
   */
  async setupPayment() {
    try {
      const response = await ApiService.post('/rides/payment/setup');
      return response;
    } catch (error) {
      console.error('Setup payment error:', error);
      throw error;
    }
  },

  /**
   * Get user's saved cards
   * GET /rides/payment/cards
   */
  async getCards() {
    try {
      const response = await ApiService.get('/rides/payment/cards');
      return response;
    } catch (error) {
      console.error('Get cards error:', error);
      throw error;
    }
  },

  /**
   * Set default card
   * PUT /rides/payment/default-card
   */
  async setDefaultCard(paymentMethodId) {
    try {
      const response = await ApiService.put('/rides/payment/default-card', {
        paymentMethodId
      });
      return response;
    } catch (error) {
      console.error('Set default card error:', error);
      throw error;
    }
  },

  /**
   * Remove card
   * DELETE /rides/payment/card/:paymentMethodId
   */
  async removeCard(paymentMethodId) {
    try {
      const response = await ApiService.delete(`/rides/payment/card/${paymentMethodId}`);
      return response;
    } catch (error) {
      console.error('Remove card error:', error);
      throw error;
    }
  },

  /**
   * Get payment status for a booking
   * GET /rides/payment/status/:bookingId
   */
  async getPaymentStatus(bookingId) {
    try {
      const response = await ApiService.get(`/rides/payment/status/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Get payment status error:', error);
      throw error;
    }
  }
};
