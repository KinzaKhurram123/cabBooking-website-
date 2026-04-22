/**
 * RideLynk Parcel Service
 * Handles all parcel booking and tracking API calls
 */

const ParcelService = {
  /**
   * Create parcel booking
   * POST /parcel/create
   */
  async createParcelBooking(parcelData) {
    try {
      const response = await ApiService.post('/parcel/create', parcelData);
      return response;
    } catch (error) {
      console.error('Create parcel booking error:', error);
      throw error;
    }
  },

  /**
   * Get all parcel bookings (Admin)
   * GET /parcel/all
   */
  async getAllParcels(status = '', page = 1, limit = 20, startDate = '', endDate = '') {
    try {
      const params = new URLSearchParams({ page, limit });
      if (status) params.append('status', status);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      const response = await ApiService.get(`/parcel/all?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Get all parcels error:', error);
      throw error;
    }
  },

  /**
   * Get nearby pending parcel deliveries for driver
   * GET /parcel/nearby
   */
  async getNearbyParcels(latitude, longitude, radius = 20) {
    try {
      const params = new URLSearchParams({ latitude, longitude, radius });
      const response = await ApiService.get(`/parcel/nearby?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Get nearby parcels error:', error);
      throw error;
    }
  },

  /**
   * Get parcel booking by ID
   * GET /parcel/:id
   */
  async getParcelBooking(id) {
    try {
      const response = await ApiService.get(`/parcel/${id}`);
      return response;
    } catch (error) {
      console.error('Get parcel booking error:', error);
      throw error;
    }
  },

  /**
   * Driver accepts parcel delivery
   * POST /parcel/accept/:bookingId
   */
  async acceptParcel(bookingId) {
    try {
      const response = await ApiService.post(`/parcel/accept/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Accept parcel error:', error);
      throw error;
    }
  },

  /**
   * Driver on the way to pickup
   * PUT /parcel/:bookingId/on-the-way
   */
  async setParcelOnTheWay(bookingId) {
    try {
      const response = await ApiService.put(`/parcel/${bookingId}/on-the-way`);
      return response;
    } catch (error) {
      console.error('Set parcel on the way error:', error);
      throw error;
    }
  },

  /**
   * Driver arrived at pickup
   * PUT /parcel/:bookingId/reached-pickup
   */
  async reachedParcelPickup(bookingId) {
    try {
      const response = await ApiService.put(`/parcel/${bookingId}/reached-pickup`);
      return response;
    } catch (error) {
      console.error('Reached parcel pickup error:', error);
      throw error;
    }
  },

  /**
   * Start parcel delivery
   * PUT /parcel/:bookingId/start
   */
  async startParcelDelivery(bookingId) {
    try {
      const response = await ApiService.put(`/parcel/${bookingId}/start`);
      return response;
    } catch (error) {
      console.error('Start parcel delivery error:', error);
      throw error;
    }
  },

  /**
   * Complete parcel delivery
   * PUT /parcel/:bookingId/complete
   */
  async completeParcelDelivery(bookingId) {
    try {
      const response = await ApiService.put(`/parcel/${bookingId}/complete`);
      return response;
    } catch (error) {
      console.error('Complete parcel delivery error:', error);
      throw error;
    }
  },

  /**
   * Cancel parcel booking
   * PUT /parcel/bookings/:bookingId/cancel
   */
  async cancelParcelBooking(bookingId, cancellationReason = '') {
    try {
      const response = await ApiService.put(`/parcel/bookings/${bookingId}/cancel`, {
        cancellationReason
      });
      return response;
    } catch (error) {
      console.error('Cancel parcel booking error:', error);
      throw error;
    }
  },

  /**
   * Get parcel delivery status
   * GET /parcel/:bookingId/status
   */
  async getParcelStatus(bookingId) {
    try {
      const response = await ApiService.get(`/parcel/${bookingId}/status`);
      return response;
    } catch (error) {
      console.error('Get parcel status error:', error);
      throw error;
    }
  },

  /**
   * Update driver location during delivery
   * PUT /parcel/:bookingId/update-location
   */
  async updateParcelLocation(bookingId, latitude, longitude) {
    try {
      const response = await ApiService.put(`/parcel/${bookingId}/update-location`, {
        latitude,
        longitude
      });
      return response;
    } catch (error) {
      console.error('Update parcel location error:', error);
      throw error;
    }
  },

  /**
   * Track driver location for parcel delivery
   * GET /parcel/:bookingId/track
   */
  async trackParcelDriver(bookingId) {
    try {
      const response = await ApiService.get(`/parcel/${bookingId}/track`);
      return response;
    } catch (error) {
      console.error('Track parcel driver error:', error);
      throw error;
    }
  },

  /**
   * Get all deliveries for logged in driver
   * GET /parcel/driver/deliveries
   */
  async getDriverParcelDeliveries() {
    try {
      const response = await ApiService.get('/parcel/driver/deliveries');
      return response;
    } catch (error) {
      console.error('Get driver parcel deliveries error:', error);
      throw error;
    }
  }
};
