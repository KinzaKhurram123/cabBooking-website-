/**
 * RideLynk Chat Service
 * Handles all chat and messaging API calls
 */

const ChatService = {
  /**
   * Send message
   * POST /chat/send
   */
  async sendMessage(rideId, receiverId, content) {
    try {
      const response = await ApiService.post('/chat/send', {
        rideId,
        receiverId,
        content
      });
      return response;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  },

  /**
   * Get messages for a ride
   * GET /chat/messages/:rideId
   */
  async getMessages(rideId) {
    try {
      const response = await ApiService.get(`/chat/messages/${rideId}`);
      return response;
    } catch (error) {
      console.error('Get messages error:', error);
      throw error;
    }
  },

  /**
   * Mark messages as read
   * PUT /chat/read/:rideId
   */
  async markAsRead(rideId) {
    try {
      const response = await ApiService.put(`/chat/read/${rideId}`);
      return response;
    } catch (error) {
      console.error('Mark as read error:', error);
      throw error;
    }
  },

  /**
   * Delete message
   * DELETE /chat/message/:messageId
   */
  async deleteMessage(messageId) {
    try {
      const response = await ApiService.delete(`/chat/message/${messageId}`);
      return response;
    } catch (error) {
      console.error('Delete message error:', error);
      throw error;
    }
  },

  /**
   * Authenticate Pusher channel
   * POST /chat/pusher/auth
   */
  async authenticatePusher(socket_id, channel_name) {
    try {
      const response = await ApiService.post('/chat/pusher/auth', {
        socket_id,
        channel_name
      });
      return response;
    } catch (error) {
      console.error('Authenticate Pusher error:', error);
      throw error;
    }
  },

  /**
   * Debug ride access
   * GET /chat/debug/ride/:rideId
   */
  async debugRideAccess(rideId) {
    try {
      const response = await ApiService.get(`/chat/debug/ride/${rideId}`);
      return response;
    } catch (error) {
      console.error('Debug ride access error:', error);
      throw error;
    }
  },

  /**
   * Debug messages
   * GET /chat/debug/messages/:rideId
   */
  async debugMessages(rideId) {
    try {
      const response = await ApiService.get(`/chat/debug/messages/${rideId}`);
      return response;
    } catch (error) {
      console.error('Debug messages error:', error);
      throw error;
    }
  },

  /**
   * Send message for parcel or pet delivery
   * POST /chats/delivery/send
   */
  async sendDeliveryMessage(bookingId, bookingType, message) {
    try {
      const response = await ApiService.post('/chats/delivery/send', {
        bookingId,
        bookingType,
        message
      });
      return response;
    } catch (error) {
      console.error('Send delivery message error:', error);
      throw error;
    }
  },

  /**
   * Get messages for parcel or pet delivery
   * GET /chats/delivery/:bookingId?bookingType=parcel|pet
   */
  async getDeliveryMessages(bookingId, bookingType) {
    try {
      const response = await ApiService.get(`/chats/delivery/${bookingId}?bookingType=${bookingType}`);
      return response;
    } catch (error) {
      console.error('Get delivery messages error:', error);
      throw error;
    }
  },

  /**
   * Mark delivery messages as read
   * PUT /chats/delivery/read/:bookingId?bookingType=parcel|pet
   */
  async markDeliveryMessagesRead(bookingId, bookingType) {
    try {
      const response = await ApiService.put(`/chats/delivery/read/${bookingId}?bookingType=${bookingType}`);
      return response;
    } catch (error) {
      console.error('Mark delivery messages read error:', error);
      throw error;
    }
  }
};
