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
   * Cancel parcel booking
   * PUT /parcel/cancel/:id
   */
  async cancelParcelBooking(id) {
    try {
      const response = await ApiService.put(`/parcel/cancel/${id}`);
      return response;
    } catch (error) {
      console.error('Cancel parcel booking error:', error);
      throw error;
    }
  }
};
