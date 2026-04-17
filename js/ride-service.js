/**
 * RideLynk Ride Service
 * Handles all ride booking and tracking API calls
 */

const RideService = {
  /**
   * Create ride booking
   * POST /rides/ridebook
   */
  async createRide(rideData) {
    try {
      const response = await ApiService.post('/rides/ridebook', rideData);
      return response;
    } catch (error) {
      console.error('Create ride error:', error);
      throw error;
    }
  },

  /**
   * Get nearby rides
   * GET /rides/nearby?latitude=X&longitude=Y&radius=Z
   */
  async getNearbyRides(latitude, longitude, radius = 5000) {
    try {
      const response = await ApiService.get(
        `/rides/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
      );
      return response;
    } catch (error) {
      console.error('Get nearby rides error:', error);
      throw error;
    }
  },

  /**
   * Get all rides
   * GET /rides/all_rides
   */
  async getAllRides() {
    try {
      const response = await ApiService.get('/rides/all_rides');
      return response;
    } catch (error) {
      console.error('Get all rides error:', error);
      throw error;
    }
  },

  /**
   * Get user ride history
   * GET /rides/ride_history/:userId
   */
  async getRideHistory(userId) {
    try {
      const response = await ApiService.get(`/rides/ride_history/${userId}`);
      return response;
    } catch (error) {
      console.error('Get ride history error:', error);
      throw error;
    }
  },

  /**
   * Get all rides for driver
   * GET /rides/all_rides_status
   */
  async getDriverRides() {
    try {
      const response = await ApiService.get('/rides/all_rides_status');
      return response;
    } catch (error) {
      console.error('Get driver rides error:', error);
      throw error;
    }
  },

  /**
   * Cancel ride booking (User)
   * PUT /rides/bookings/:bookingId/cancel
   */
  async cancelRide(bookingId, cancellationReason = '') {
    try {
      const response = await ApiService.put(`/rides/bookings/${bookingId}/cancel`, {
        cancellationReason,
        cancelledBy: 'user'
      });
      return response;
    } catch (error) {
      console.error('Cancel ride error:', error);
      throw error;
    }
  },

  /**
   * Cancel ride booking (Driver)
   * PUT /rides/driver/bookings/:bookingId/cancel
   */
  async cancelRideDriver(bookingId, cancellationReason = '') {
    try {
      const response = await ApiService.put(`/rides/driver/bookings/${bookingId}/cancel`, {
        cancellationReason
      });
      return response;
    } catch (error) {
      console.error('Driver cancel ride error:', error);
      throw error;
    }
  },

  /**
   * Cancel ride booking (Admin)
   * PUT /rides/admin/bookings/:bookingId/cancel
   */
  async cancelRideAdmin(bookingId, cancellationReason = '') {
    try {
      const response = await ApiService.put(`/rides/admin/bookings/${bookingId}/cancel`, {
        cancellationReason
      });
      return response;
    } catch (error) {
      console.error('Admin cancel ride error:', error);
      throw error;
    }
  },

  /**
   * Get cancelled bookings
   * GET /rides/bookings/cancelled
   */
  async getCancelledBookings() {
    try {
      const response = await ApiService.get('/rides/bookings/cancelled');
      return response;
    } catch (error) {
      console.error('Get cancelled bookings error:', error);
      throw error;
    }
  },

  /**
   * Accept ride (Driver)
   * POST /rides/accept/:bookingId
   */
  async acceptRide(bookingId) {
    try {
      const response = await ApiService.post(`/rides/accept/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Accept ride error:', error);
      throw error;
    }
  },

  /**
   * Driver on the way
   * PUT /rides/:bookingId/on-the-way
   */
  async setOnTheWay(bookingId, currentLocation) {
    try {
      const response = await ApiService.put(`/rides/${bookingId}/on-the-way`, {
        currentLocation
      });
      return response;
    } catch (error) {
      console.error('Set on the way error:', error);
      throw error;
    }
  },

  /**
   * Driver reached pickup
   * PUT /rides/:bookingId/reached-pickup
   */
  async reachedPickup(bookingId) {
    try {
      const response = await ApiService.put(`/rides/${bookingId}/reached-pickup`);
      return response;
    } catch (error) {
      console.error('Reached pickup error:', error);
      throw error;
    }
  },

  /**
   * Start ride
   * PUT /rides/:bookingId/start
   */
  async startRide(bookingId) {
    try {
      const response = await ApiService.put(`/rides/${bookingId}/start`);
      return response;
    } catch (error) {
      console.error('Start ride error:', error);
      throw error;
    }
  },

  /**
   * Complete ride
   * PUT /rides/:bookingId/complete
   */
  async completeRide(bookingId) {
    try {
      const response = await ApiService.put(`/rides/${bookingId}/complete`);
      return response;
    } catch (error) {
      console.error('Complete ride error:', error);
      throw error;
    }
  },

  /**
   * Get ride status
   * GET /rides/:bookingId/status
   */
  async getRideStatus(bookingId) {
    try {
      const response = await ApiService.get(`/rides/${bookingId}/status`);
      return response;
    } catch (error) {
      console.error('Get ride status error:', error);
      throw error;
    }
  },

  /**
   * Update driver location
   * PUT /rides/:bookingId/update-location
   */
  async updateDriverLocation(bookingId, latitude, longitude) {
    try {
      const response = await ApiService.put(`/rides/${bookingId}/update-location`, {
        latitude,
        longitude
      });
      return response;
    } catch (error) {
      console.error('Update driver location error:', error);
      throw error;
    }
  },

  /**
   * Get driver location (Track driver)
   * GET /rides/:bookingId/track
   */
  async trackDriver(bookingId) {
    try {
      const response = await ApiService.get(`/rides/${bookingId}/track`);
      return response;
    } catch (error) {
      console.error('Track driver error:', error);
      throw error;
    }
  },

  /**
   * Get location history
   * GET /rides/:bookingId/location-history
   */
  async getLocationHistory(bookingId) {
    try {
      const response = await ApiService.get(`/rides/${bookingId}/location-history`);
      return response;
    } catch (error) {
      console.error('Get location history error:', error);
      throw error;
    }
  },

  /**
   * Fix booking status
   * PUT /rides/fix-booking-status/:bookingId
   */
  async fixBookingStatus(bookingId) {
    try {
      const response = await ApiService.put(`/rides/fix-booking-status/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Fix booking status error:', error);
      throw error;
    }
  },

  /**
   * Get ride types
   * GET /ride-types
   */
  async getRideTypes() {
    try {
      const response = await ApiService.get('/ride-types', { requiresAuth: false });
      return response;
    } catch (error) {
      console.error('Get ride types error:', error);
      throw error;
    }
  }
};
