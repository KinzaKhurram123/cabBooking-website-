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
   * Get all pet delivery bookings
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
   * Cancel pet delivery booking
   * PUT /pet/pet-delivery/:id
   */
  async cancelPetDeliveryBooking(id) {
    try {
      const response = await ApiService.put(`/pet/pet-delivery/${id}`);
      return response;
    } catch (error) {
      console.error('Cancel pet delivery booking error:', error);
      throw error;
    }
  }
};
