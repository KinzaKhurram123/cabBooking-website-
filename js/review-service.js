/**
 * RideLynk Review Service
 * Handles all review and rating API calls
 */

const ReviewService = {
  /**
   * Create review for a ride
   * POST /reviews/:bookingId/create
   */
  async createReview(bookingId, reviewData) {
    try {
      const response = await ApiService.post(`/reviews/${bookingId}/create`, reviewData);
      return response;
    } catch (error) {
      console.error('Create review error:', error);
      throw error;
    }
  },

  /**
   * Get review by booking ID
   * GET /reviews/booking/:bookingId
   */
  async getReviewByBooking(bookingId) {
    try {
      const response = await ApiService.get(`/reviews/booking/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Get review by booking error:', error);
      throw error;
    }
  },

  /**
   * Get driver reviews
   * GET /reviews/driver/:driverId/reviews
   */
  async getDriverReviews(driverId) {
    try {
      const response = await ApiService.get(`/reviews/driver/${driverId}/reviews`);
      return response;
    } catch (error) {
      console.error('Get driver reviews error:', error);
      throw error;
    }
  },

  /**
   * Get user's reviews
   * GET /reviews/user/my-reviews
   */
  async getMyReviews() {
    try {
      const response = await ApiService.get('/reviews/user/my-reviews');
      return response;
    } catch (error) {
      console.error('Get my reviews error:', error);
      throw error;
    }
  },

  /**
   * Check if user can review a ride
   * GET /reviews/can-review/:bookingId
   */
  async canReview(bookingId) {
    try {
      const response = await ApiService.get(`/reviews/can-review/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Can review error:', error);
      throw error;
    }
  },

  /**
   * Update review
   * PUT /reviews/:reviewId/update
   */
  async updateReview(reviewId, reviewData) {
    try {
      const response = await ApiService.put(`/reviews/${reviewId}/update`, reviewData);
      return response;
    } catch (error) {
      console.error('Update review error:', error);
      throw error;
    }
  },

  /**
   * Delete review
   * DELETE /reviews/:reviewId/delete
   */
  async deleteReview(reviewId) {
    try {
      const response = await ApiService.delete(`/reviews/${reviewId}/delete`);
      return response;
    } catch (error) {
      console.error('Delete review error:', error);
      throw error;
    }
  },

  /**
   * Driver reply to review
   * POST /reviews/:reviewId/driver-reply
   */
  async driverReply(reviewId, reply) {
    try {
      const response = await ApiService.post(`/reviews/${reviewId}/driver-reply`, { reply });
      return response;
    } catch (error) {
      console.error('Driver reply error:', error);
      throw error;
    }
  },

  /**
   * Get driver review statistics
   * GET /reviews/driver/stats
   */
  async getDriverStats() {
    try {
      const response = await ApiService.get('/reviews/driver/stats');
      return response;
    } catch (error) {
      console.error('Get driver stats error:', error);
      throw error;
    }
  }
};
