/**
 * RideLynk Admin Service
 * Handles all admin-related API calls
 */

const AdminService = {
  /**
   * Admin login
   * POST /admin/login
   */
  async login(credentials) {
    try {
      console.log('AdminService - Calling admin login API...');
      const response = await ApiService.post('/admin/login', credentials, {
        requiresAuth: false
      });

      console.log('AdminService - API Response:', response);

      if (response.success !== false && response.token) {
        console.log('AdminService - Login successful, storing data...');

        // Store token and admin data
        localStorage.setItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN, response.token);
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(response.admin || response.data));
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_ROLE, 'admin');

        console.log('AdminService - Data stored successfully');
        console.log('AdminService - Token:', localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN) ? 'Stored' : 'NOT STORED');
        console.log('AdminService - Role:', localStorage.getItem(CONFIG.STORAGE_KEYS.USER_ROLE));
        console.log('AdminService - User Data:', localStorage.getItem(CONFIG.STORAGE_KEYS.USER_DATA) ? 'Stored' : 'NOT STORED');
      } else {
        console.log('AdminService - Login failed or no token in response');
      }

      return response;
    } catch (error) {
      console.error('AdminService - Login error:', error);
      throw error;
    }
  },

  /**
   * Get admin profile
   * GET /admin/profile
   */
  async getProfile() {
    try {
      const response = await ApiService.get('/admin/profile');
      return response;
    } catch (error) {
      console.error('Get admin profile error:', error);
      throw error;
    }
  },

  /**
   * Update admin profile
   * PUT /admin/profile
   */
  async updateProfile(profileData) {
    try {
      const response = await ApiService.put('/admin/profile', profileData);
      return response;
    } catch (error) {
      console.error('Update admin profile error:', error);
      throw error;
    }
  },

  /**
   * Change admin password
   * PUT /admin/change-password
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await ApiService.put('/admin/change-password', {
        currentPassword,
        newPassword
      });
      return response;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  /**
   * Get dashboard statistics
   * GET /admin/dashboard-stats
   */
  async getDashboardStats() {
    try {
      const response = await ApiService.get('/admin/dashboard-stats');
      return response;
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      throw error;
    }
  },

  /**
   * Create new admin (Super Admin only)
   * POST /admin/create
   */
  async createAdmin(adminData) {
    try {
      const response = await ApiService.post('/admin/create', adminData);
      return response;
    } catch (error) {
      console.error('Create admin error:', error);
      throw error;
    }
  },

  /**
   * Get all admins (Super Admin only)
   * GET /admin/all
   */
  async getAllAdmins() {
    try {
      const response = await ApiService.get('/admin/all');
      return response;
    } catch (error) {
      console.error('Get all admins error:', error);
      throw error;
    }
  },

  /**
   * Update admin permissions (Super Admin only)
   * PUT /admin/permissions/:id
   */
  async updatePermissions(adminId, permissions) {
    try {
      const response = await ApiService.put(`/admin/permissions/${adminId}`, {
        permissions
      });
      return response;
    } catch (error) {
      console.error('Update permissions error:', error);
      throw error;
    }
  },

  /**
   * Toggle admin status (Super Admin only)
   * PUT /admin/toggle-status/:id
   */
  async toggleStatus(adminId) {
    try {
      const response = await ApiService.put(`/admin/toggle-status/${adminId}`);
      return response;
    } catch (error) {
      console.error('Toggle admin status error:', error);
      throw error;
    }
  },

  /**
   * Delete admin (Super Admin only)
   * DELETE /admin/:id
   */
  async deleteAdmin(adminId) {
    try {
      const response = await ApiService.delete(`/admin/${adminId}`);
      return response;
    } catch (error) {
      console.error('Delete admin error:', error);
      throw error;
    }
  },

  /**
   * Approve rider/driver
   * PUT /admin/riders/approve/:riderId
   */
  async approveRider(riderId, adminNotes = '') {
    try {
      const response = await ApiService.put(`/admin/riders/approve/${riderId}`, {
        adminNotes
      });
      return response;
    } catch (error) {
      console.error('Approve rider error:', error);
      throw error;
    }
  },

  /**
   * Reject rider/driver
   * PUT /admin/riders/reject/:riderId
   */
  async rejectRider(riderId, rejectionReason, rejectedDocument = '') {
    try {
      const response = await ApiService.put(`/admin/riders/reject/${riderId}`, {
        rejectionReason,
        rejectedDocument
      });
      return response;
    } catch (error) {
      console.error('Reject rider error:', error);
      throw error;
    }
  },

  /**
   * Get pending verifications
   * GET /admin/riders/pending
   */
  async getPendingVerifications() {
    try {
      const response = await ApiService.get('/admin/riders/pending');
      return response;
    } catch (error) {
      console.error('Get pending verifications error:', error);
      throw error;
    }
  }
};
