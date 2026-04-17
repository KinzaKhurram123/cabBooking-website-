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
    const channelName = `private-ride-${rideId}`;
    const channel = this.subscribe(channelName);

    if (!channel) return null;

    // Bind event handlers
    if (callbacks.onNewMessage) {
      channel.bind('new-message', callbacks.onNewMessage);
    }

    if (callbacks.onRideStatusUpdate) {
      channel.bind('ride-status-update', callbacks.onRideStatusUpdate);
    }

    if (callbacks.onDriverLocationUpdate) {
      channel.bind('driver-location-update', callbacks.onDriverLocationUpdate);
    }

    return channel;
  },

  /**
   * Subscribe to driver status updates
   */
  subscribeToDriverStatus(callbacks = {}) {
    const channelName = 'driver-status';
    const channel = this.subscribe(channelName);

    if (!channel) return null;

    if (callbacks.onDriverAvailable) {
      channel.bind('driver-available', callbacks.onDriverAvailable);
    }

    if (callbacks.onDriverOffline) {
      channel.bind('driver-offline', callbacks.onDriverOffline);
    }

    return channel;
  },

  /**
   * Unsubscribe from ride updates
   */
  unsubscribeFromRide(rideId) {
    const channelName = `private-ride-${rideId}`;
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
