/**
 * RideLynk Driver/Rider Service
 * Handles all driver/rider related API calls
 */

const DriverService = {
  /**
   * Add vehicle details
   * POST /rider/vehicle-details
   */
  async addVehicleDetails(vehicleData) {
    try {
      const response = await ApiService.post('/rider/vehicle-details', vehicleData);
      return response;
    } catch (error) {
      console.error('Add vehicle details error:', error);
      throw error;
    }
  },

  /**
   * Upload driver's license
   * POST /rider/upload-license
   */
  async uploadLicense(formData) {
    try {
      const response = await ApiService.upload('/rider/upload-license', formData);
      return response;
    } catch (error) {
      console.error('Upload license error:', error);
      throw error;
    }
  },

  /**
   * Upload insurance document
   * POST /rider/upload-insurance
   */
  async uploadInsurance(formData) {
    try {
      const response = await ApiService.upload('/rider/upload-insurance', formData);
      return response;
    } catch (error) {
      console.error('Upload insurance error:', error);
      throw error;
    }
  },

  /**
   * Upload profile photo
   * POST /rider/upload-profile-photo
   */
  async uploadProfilePhoto(formData) {
    try {
      const response = await ApiService.upload('/rider/upload-profile-photo', formData);
      return response;
    } catch (error) {
      console.error('Upload profile photo error:', error);
      throw error;
    }
  },

  /**
   * Add complete vehicle details with files
   * POST /rider/add-complete-vehicle-details
   */
  async addCompleteVehicleDetails(formData) {
    try {
      const response = await ApiService.upload('/rider/add-complete-vehicle-details', formData);
      return response;
    } catch (error) {
      console.error('Add complete vehicle details error:', error);
      throw error;
    }
  },

  /**
   * Accept terms and conditions
   * POST /rider/accept-terms
   */
  async acceptTerms(accepted = true) {
    try {
      const response = await ApiService.post('/rider/accept-terms', { accepted });
      return response;
    } catch (error) {
      console.error('Accept terms error:', error);
      throw error;
    }
  },

  /**
   * Submit for verification
   * POST /rider/submit-verification
   */
  async submitVerification() {
    try {
      const response = await ApiService.post('/rider/submit-verification');
      return response;
    } catch (error) {
      console.error('Submit verification error:', error);
      throw error;
    }
  },

  /**
   * Get onboarding status
   * GET /rider/onboarding-status
   */
  async getOnboardingStatus() {
    try {
      const response = await ApiService.get('/rider/onboarding-status');

      // If API returns success, return it
      if (response && response.success !== false) {
        return response;
      }

      // Fallback: check localStorage for verification status
      const userData = AuthService.getCurrentUser();
      if (userData && userData.verificationStatus) {
        return {
          success: true,
          status: {
            overallStatus: userData.verificationStatus,
            vehicleDetails: userData.vehicleDetails?.status || 'pending',
            license: userData.license?.status || 'pending',
            insurance: userData.insurance?.status || 'pending',
            profilePhoto: userData.profilePhoto?.status || 'pending'
          }
        };
      }

      // Default response if no data
      return {
        success: true,
        status: {
          overallStatus: 'incomplete',
          vehicleDetails: 'pending',
          license: 'pending',
          insurance: 'pending',
          profilePhoto: 'pending'
        }
      };
    } catch (error) {
      console.error('Get onboarding status error:', error);

      // On error, try to get from localStorage
      const userData = AuthService.getCurrentUser();
      if (userData && userData.verificationStatus) {
        return {
          success: true,
          status: {
            overallStatus: userData.verificationStatus,
            vehicleDetails: 'pending',
            license: 'pending',
            insurance: 'pending',
            profilePhoto: 'pending'
          }
        };
      }

      throw error;
    }
  },

  /**
   * Update rider profile
   * PUT /rider/profile
   */
  async updateProfile(profileData) {
    try {
      const response = await ApiService.put('/rider/profile', profileData);
      return response;
    } catch (error) {
      console.error('Update rider profile error:', error);
      throw error;
    }
  },

  /**
   * Update rider status (available/offline)
   * PUT /rider/status
   */
  async updateStatus(status) {
    try {
      const response = await ApiService.put('/rider/status', { status });
      return response;
    } catch (error) {
      console.error('Update rider status error:', error);
      throw error;
    }
  }
};
