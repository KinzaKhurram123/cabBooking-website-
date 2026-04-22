/**
 * RideLynk Pet Delivery Service
 * Handles all pet delivery booking and tracking API calls
 */

const PetService = {
  /**
   * Create pet delivery booking
   * POST /pet/pet_delivery_booking
   */
  async createPetDeliveryBooking(petData) {
    try {
      const response = await ApiService.post('/pet/pet_delivery_booking', petData);
      return response;
    } catch (error) {
      console.error('Create pet delivery booking error:', error);
      throw error;
    }
  },

  /**
   * Get all pet delivery bookings (Admin)
   * GET /pet/get_pet_delivery
   */
  async getAllPetDeliveries() {
    try {
      const response = await ApiService.get('/pet/get_pet_delivery');
      return response;
    } catch (error) {
      console.error('Get all pet deliveries error:', error);
      throw error;
    }
  },

  /**
   * Get nearby pending pet deliveries for driver
   * GET /pet/nearby
   */
  async getNearbyPetDeliveries(latitude, longitude, radius = 20) {
    try {
      const params = new URLSearchParams({ latitude, longitude, radius });
      const response = await ApiService.get(`/pet/nearby?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Get nearby pet deliveries error:', error);
      throw error;
    }
  },

  /**
   * Get pet delivery booking by ID
   * GET /pet/pet_delivery/:id
   */
  async getPetDeliveryBooking(id) {
    try {
      const response = await ApiService.get(`/pet/pet_delivery/${id}`);
      return response;
    } catch (error) {
      console.error('Get pet delivery booking error:', error);
      throw error;
    }
  },

  /**
   * Driver accepts pet delivery
   * POST /pet/accept/:bookingId
   */
  async acceptPetDelivery(bookingId) {
    try {
      const response = await ApiService.post(`/pet/accept/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Accept pet delivery error:', error);
      throw error;
    }
  },

  /**
   * Driver on the way to pickup
   * PUT /pet/:bookingId/on-the-way
   */
  async setPetOnTheWay(bookingId) {
    try {
      const response = await ApiService.put(`/pet/${bookingId}/on-the-way`);
      return response;
    } catch (error) {
      console.error('Set pet on the way error:', error);
      throw error;
    }
  },

  /**
   * Driver arrived at pickup
   * PUT /pet/:bookingId/reached-pickup
   */
  async reachedPetPickup(bookingId) {
    try {
      const response = await ApiService.put(`/pet/${bookingId}/reached-pickup`);
      return response;
    } catch (error) {
      console.error('Reached pet pickup error:', error);
      throw error;
    }
  },

  /**
   * Start pet delivery
   * PUT /pet/:bookingId/start
   */
  async startPetDelivery(bookingId) {
    try {
      const response = await ApiService.put(`/pet/${bookingId}/start`);
      return response;
    } catch (error) {
      console.error('Start pet delivery error:', error);
      throw error;
    }
  },

  /**
   * Complete pet delivery
   * PUT /pet/:bookingId/complete
   */
  async completePetDelivery(bookingId) {
    try {
      const response = await ApiService.put(`/pet/${bookingId}/complete`);
      return response;
    } catch (error) {
      console.error('Complete pet delivery error:', error);
      throw error;
    }
  },

  /**
   * Cancel pet delivery booking
   * PUT /pet/bookings/:bookingId/cancel
   */
  async cancelPetDeliveryBooking(bookingId, cancellationReason = '') {
    try {
      const response = await ApiService.put(`/pet/bookings/${bookingId}/cancel`, {
        cancellationReason
      });
      return response;
    } catch (error) {
      console.error('Cancel pet delivery booking error:', error);
      throw error;
    }
  },

  /**
   * Get pet delivery status
   * GET /pet/:bookingId/status
   */
  async getPetStatus(bookingId) {
    try {
      const response = await ApiService.get(`/pet/${bookingId}/status`);
      return response;
    } catch (error) {
      console.error('Get pet status error:', error);
      throw error;
    }
  },

  /**
   * Update driver location during pet delivery
   * PUT /pet/:bookingId/update-location
   */
  async updatePetLocation(bookingId, latitude, longitude) {
    try {
      const response = await ApiService.put(`/pet/${bookingId}/update-location`, {
        latitude,
        longitude
      });
      return response;
    } catch (error) {
      console.error('Update pet location error:', error);
      throw error;
    }
  },

  /**
   * Track driver location for pet delivery
   * GET /pet/:bookingId/track
   */
  async trackPetDriver(bookingId) {
    try {
      const response = await ApiService.get(`/pet/${bookingId}/track`);
      return response;
    } catch (error) {
      console.error('Track pet driver error:', error);
      throw error;
    }
  },

  /**
   * Get all pet deliveries for logged in driver
   * GET /pet/driver/deliveries
   */
  async getDriverPetDeliveries() {
    try {
      const response = await ApiService.get('/pet/driver/deliveries');
      return response;
    } catch (error) {
      console.error('Get driver pet deliveries error:', error);
      throw error;
    }
  }
};
