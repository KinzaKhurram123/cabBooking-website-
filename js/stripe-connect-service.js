/**
 * Stripe Connect Service
 * Handles driver payment account setup and management
 */

const StripeConnectService = {
  /**
   * Get driver's Connect account status
   */
  async getAccountStatus() {
    try {
      const response = await ApiService.get('/stripe-connect/account-status');
      return response;
    } catch (error) {
      console.error('Error fetching Connect account status:', error);
      throw error;
    }
  },

  /**
   * Create a new Connect account for driver
   */
  async createAccount() {
    try {
      const response = await ApiService.post('/stripe-connect/create-account');
      return response;
    } catch (error) {
      console.error('Error creating Connect account:', error);
      throw error;
    }
  },

  /**
   * Generate onboarding link for driver
   */
  async generateOnboardingLink() {
    try {
      const response = await ApiService.post('/stripe-connect/account-link');
      return response;
    } catch (error) {
      console.error('Error generating onboarding link:', error);
      throw error;
    }
  },

  /**
   * Refresh expired onboarding link
   */
  async refreshOnboardingLink() {
    try {
      const response = await ApiService.post('/stripe-connect/refresh-link');
      return response;
    } catch (error) {
      console.error('Error refreshing onboarding link:', error);
      throw error;
    }
  },

  /**
   * Start the Connect onboarding process
   * Creates account if needed and redirects to Stripe
   */
  async startOnboarding() {
    try {
      // Check if account exists
      const statusResponse = await this.getAccountStatus();

      let accountId = null;

      if (statusResponse.status === 'not_started') {
        // Create new account
        const createResponse = await this.createAccount();
        if (!createResponse.success) {
          throw new Error(createResponse.message || 'Failed to create Connect account');
        }
        accountId = createResponse.accountId;
      }

      // Generate onboarding link
      const linkResponse = await this.generateOnboardingLink();

      if (linkResponse.success && linkResponse.url) {
        // Redirect to Stripe onboarding
        window.location.href = linkResponse.url;
      } else {
        throw new Error(linkResponse.message || 'Failed to generate onboarding link');
      }
    } catch (error) {
      console.error('Error starting onboarding:', error);
      throw error;
    }
  },

  /**
   * Get status badge HTML based on account status
   */
  getStatusBadge(status) {
    const badges = {
      not_started: '<span class="status-badge status-not-started"><i class="fas fa-circle"></i> Not Started</span>',
      pending: '<span class="status-badge status-pending"><i class="fas fa-clock"></i> Pending</span>',
      enabled: '<span class="status-badge status-enabled"><i class="fas fa-check-circle"></i> Active</span>',
      disabled: '<span class="status-badge status-disabled"><i class="fas fa-times-circle"></i> Disabled</span>',
      restricted: '<span class="status-badge status-pending"><i class="fas fa-exclamation-triangle"></i> Restricted</span>'
    };

    return badges[status] || badges.not_started;
  },

  /**
   * Get user-friendly message based on account status
   */
  getStatusMessage(accountStatus) {
    if (!accountStatus) {
      return {
        title: 'Payment Account Not Set Up',
        message: 'Set up your payment account to receive earnings directly to your bank account.',
        action: 'Setup Payment Account',
        actionType: 'setup'
      };
    }

    if (accountStatus.chargesEnabled && accountStatus.payoutsEnabled) {
      return {
        title: 'Payment Account Active',
        message: 'Your payment account is active. Earnings will be automatically transferred to your bank account.',
        action: 'View Account Details',
        actionType: 'view'
      };
    }

    if (accountStatus.requirementsCurrentlyDue && accountStatus.requirementsCurrentlyDue.length > 0) {
      return {
        title: 'Action Required',
        message: 'Please complete the verification process to activate your payment account.',
        action: 'Complete Verification',
        actionType: 'complete'
      };
    }

    return {
      title: 'Payment Account Pending',
      message: 'Your payment account is being verified. This usually takes 1-2 business days.',
      action: 'Refresh Status',
      actionType: 'refresh'
    };
  },

  /**
   * Handle errors gracefully with user-friendly messages
   */
  handleError(error) {
    const errorMessages = {
      'Network Error': 'Unable to connect to the server. Please check your internet connection.',
      'Unauthorized': 'Your session has expired. Please log in again.',
      'Forbidden': 'You do not have permission to perform this action.',
      'Not Found': 'The requested resource was not found.',
      'Internal Server Error': 'A server error occurred. Please try again later.',
      'Service Unavailable': 'The service is temporarily unavailable. Please try again later.'
    };

    const errorMessage = error.message || 'An unexpected error occurred';

    // Check if it's a known error type
    for (const [key, message] of Object.entries(errorMessages)) {
      if (errorMessage.includes(key)) {
        return message;
      }
    }

    // Return the original error message if not a known type
    return errorMessage;
  },

  /**
   * Show user-friendly error notification
   */
  showError(error) {
    const message = this.handleError(error);
    if (typeof Utils !== 'undefined' && Utils.showToast) {
      Utils.showToast(message, 'error');
    } else {
      alert(message);
    }
  }
};
