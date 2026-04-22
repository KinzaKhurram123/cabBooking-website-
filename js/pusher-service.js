/**
 * RideLynk Pusher Service
 * Handles real-time updates using Pusher
 */

const PusherService = {
  pusher: null,
  subscribedChannels: {},

  /**
   * Initialize Pusher
   */
  init() {
    if (this.pusher) {
      return this.pusher;
    }

    try {
      // Initialize Pusher with configuration
      this.pusher = new Pusher(CONFIG.PUSHER_KEY, {
        cluster: CONFIG.PUSHER_CLUSTER,
        encrypted: true,
        authEndpoint: `${CONFIG.API_BASE_URL}/chat/pusher/auth`,
        auth: {
          headers: {
            'Authorization': `Bearer ${Utils.getAuthToken()}`
          }
        }
      });

      // Connection state monitoring
      this.pusher.connection.bind('connected', () => {
        console.log('Pusher connected');
      });

      this.pusher.connection.bind('disconnected', () => {
        console.log('Pusher disconnected');
      });

      this.pusher.connection.bind('error', (err) => {
        console.error('Pusher connection error:', err);
      });

      return this.pusher;
    } catch (error) {
      console.error('Failed to initialize Pusher:', error);
      return null;
    }
  },

  /**
   * Subscribe to a channel
   */
  subscribe(channelName) {
    if (!this.pusher) {
      this.init();
    }

    if (this.subscribedChannels[channelName]) {
      return this.subscribedChannels[channelName];
    }

    try {
      const channel = this.pusher.subscribe(channelName);
      this.subscribedChannels[channelName] = channel;

      channel.bind('pusher:subscription_succeeded', () => {
        console.log(`Subscribed to channel: ${channelName}`);
      });

      channel.bind('pusher:subscription_error', (error) => {
        console.error(`Failed to subscribe to ${channelName}:`, error);
      });

      return channel;
    } catch (error) {
      console.error(`Error subscribing to ${channelName}:`, error);
      return null;
    }
  },

  /**
   * Unsubscribe from a channel
   */
  unsubscribe(channelName) {
    if (this.subscribedChannels[channelName]) {
      this.pusher.unsubscribe(channelName);
      delete this.subscribedChannels[channelName];
      console.log(`Unsubscribed from channel: ${channelName}`);
    }
  },

  /**
   * Subscribe to ride updates
   */
  subscribeToRide(rideId, callbacks = {}) {
    const channelName = `ride-${rideId}`;
    const channel = this.subscribe(channelName);

    if (!channel) return null;

    if (callbacks.onRideStatusUpdate) {
      channel.bind('ride-status-update', callbacks.onRideStatusUpdate);
    }

    if (callbacks.onDriverLocationUpdate) {
      channel.bind('driver-location-update', callbacks.onDriverLocationUpdate);
    }

    return channel;
  },

  /**
   * Subscribe to parcel delivery updates
   */
  subscribeToParcelDelivery(bookingId, callbacks = {}) {
    const channelName = `parcel-delivery-${bookingId}`;
    const channel = this.subscribe(channelName);

    if (!channel) return null;

    if (callbacks.onDeliveryAccepted) {
      channel.bind('delivery-accepted', callbacks.onDeliveryAccepted);
    }

    if (callbacks.onDeliveryStatusUpdate) {
      channel.bind('delivery-status-update', callbacks.onDeliveryStatusUpdate);
    }

    if (callbacks.onDriverLocationUpdate) {
      channel.bind('driver-location-update', callbacks.onDriverLocationUpdate);
    }

    return channel;
  },

  /**
   * Subscribe to pet delivery updates
   */
  subscribeToPetDelivery(bookingId, callbacks = {}) {
    const channelName = `pet-delivery-${bookingId}`;
    const channel = this.subscribe(channelName);

    if (!channel) return null;

    if (callbacks.onDeliveryAccepted) {
      channel.bind('delivery-accepted', callbacks.onDeliveryAccepted);
    }

    if (callbacks.onDeliveryStatusUpdate) {
      channel.bind('delivery-status-update', callbacks.onDeliveryStatusUpdate);
    }

    if (callbacks.onDriverLocationUpdate) {
      channel.bind('driver-location-update', callbacks.onDriverLocationUpdate);
    }

    return channel;
  },

  /**
   * Subscribe to new ride bookings (for drivers)
   */
  subscribeToRideBookings(callback) {
    const channelName = 'ride-bookings';
    const channel = this.subscribe(channelName);

    if (!channel) return null;

    if (callback) {
      channel.bind('new-ride-booking', callback);
    }

    return channel;
  },

  /**
   * Subscribe to new parcel bookings (for drivers)
   */
  subscribeToParcelBookings(callback) {
    const channelName = 'parcel-bookings';
    const channel = this.subscribe(channelName);

    if (!channel) return null;

    if (callback) {
      channel.bind('new-parcel-booking', callback);
    }

    return channel;
  },

  /**
   * Subscribe to new pet bookings (for drivers)
   */
  subscribeToPetBookings(callback) {
    const channelName = 'pet-bookings';
    const channel = this.subscribe(channelName);

    if (!channel) return null;

    if (callback) {
      channel.bind('new-pet-booking', callback);
    }

    return channel;
  },

  /**
   * Subscribe to rider personal channel
   */
  subscribeToRiderChannel(riderId, callbacks = {}) {
    const channelName = `rider-${riderId}`;
    const channel = this.subscribe(channelName);

    if (!channel) return null;

    if (callbacks.onNewRideBooking) {
      channel.bind('new-ride-booking', callbacks.onNewRideBooking);
    }

    if (callbacks.onNewParcelBooking) {
      channel.bind('new-parcel-booking', callbacks.onNewParcelBooking);
    }

    if (callbacks.onNewPetBooking) {
      channel.bind('new-pet-booking', callbacks.onNewPetBooking);
    }

    return channel;
  },

  /**
   * Unsubscribe from ride updates
   */
  unsubscribeFromRide(rideId) {
    const channelName = `ride-${rideId}`;
    this.unsubscribe(channelName);
  },

  /**
   * Unsubscribe from parcel delivery
   */
  unsubscribeFromParcelDelivery(bookingId) {
    const channelName = `parcel-delivery-${bookingId}`;
    this.unsubscribe(channelName);
  },

  /**
   * Unsubscribe from pet delivery
   */
  unsubscribeFromPetDelivery(bookingId) {
    const channelName = `pet-delivery-${bookingId}`;
    this.unsubscribe(channelName);
  },

  /**
   * Disconnect Pusher
   */
  disconnect() {
    if (this.pusher) {
      // Unsubscribe from all channels
      Object.keys(this.subscribedChannels).forEach(channelName => {
        this.unsubscribe(channelName);
      });

      this.pusher.disconnect();
      this.pusher = null;
      console.log('Pusher disconnected');
    }
  },

  /**
   * Get connection state
   */
  getConnectionState() {
    return this.pusher ? this.pusher.connection.state : 'disconnected';
  },

  /**
   * Check if connected
   */
  isConnected() {
    return this.getConnectionState() === 'connected';
  }
};

// Auto-initialize on page load if user is authenticated
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    if (Utils.isAuthenticated()) {
      // Initialize Pusher but don't subscribe to any channels yet
      // Channels will be subscribed when needed
      PusherService.init();
    }
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    PusherService.disconnect();
  });
}
