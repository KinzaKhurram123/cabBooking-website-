/**
 * RideLynk Admin Service
 * Complete implementation of Admin API Documentation
 */

const AdminService = {
  async login(credentials) {
    try {
      console.log("AdminService - Calling admin login API...");
      console.log("AdminService - Credentials:", { email: credentials.email });

      const response = await ApiService.post("/admin/login", credentials, {
        requiresAuth: false,
      });

      console.log("AdminService - Login response:", response);
      console.log("AdminService - Response structure:", JSON.stringify(response, null, 2));

      if (response.success && response.data && response.data.token) {
        const token = response.data.token;
        const adminData = response.data.admin || response.data.user;
        const role = adminData?.role || response.data.role || 'admin';

        console.log("AdminService - Extracted data:", {
          token: token.substring(0, 30) + '...',
          role: role,
          adminData: adminData
        });

        // Store token
        localStorage.setItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN, token);

        // Store user data
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(adminData));

        // Store role - accept multiple admin role variations
        const validAdminRoles = ['admin', 'superadmin', 'super_admin', 'super-admin'];
        const normalizedRole = validAdminRoles.includes(role?.toLowerCase()) ? 'admin' : role;

        console.log("AdminService - Storing role:", normalizedRole, "(original:", role + ")");
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_ROLE, normalizedRole);

        console.log("AdminService - Storage complete");
      }

      return response;
    } catch (error) {
      console.error("AdminService - Login error:", error);
      throw error;
    }
  },

  /**
   * Admin Register
   * POST /api/admin/register
   */
  async register(adminData) {
    try {
      const response = await ApiService.post("/admin/register", adminData, {
        requiresAuth: false,
      });
      return response;
    } catch (error) {
      console.error("Admin register error:", error);
      throw error;
    }
  },

  /**
   * Admin Logout
   * POST /api/admin/logout
   */
  async logout() {
    try {
      const response = await ApiService.post("/admin/logout");
      localStorage.clear();
      return response;
    } catch (error) {
      console.error("Admin logout error:", error);
      throw error;
    }
  },

  /**
   * Forgot Password
   * POST /api/admin/forgot-password
   */
  async forgotPassword(email) {
    try {
      const response = await ApiService.post(
        "/admin/forgot-password",
        { email },
        {
          requiresAuth: false,
        },
      );
      return response;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  },

  /**
   * Reset Password
   * POST /api/admin/reset-password
   */
  async resetPassword(email, otp, newPassword) {
    try {
      const response = await ApiService.post(
        "/admin/reset-password",
        {
          email,
          otp,
          newPassword,
        },
        {
          requiresAuth: false,
        },
      );
      return response;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  },

  /**
   * Refresh Token
   * POST /api/admin/refresh-token
   */
  async refreshToken(refreshToken) {
    try {
      const response = await ApiService.post(
        "/admin/refresh-token",
        { refreshToken },
        {
          requiresAuth: false,
        },
      );
      return response;
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  },

  // ==================== DASHBOARD APIs ====================

  /**
   * Get Dashboard Stats
   * GET /api/admin/dashboard/stats
   */
  async getDashboardStats() {
    try {
      const response = await ApiService.get("/admin/dashboard/stats");
      return response;
    } catch (error) {
      console.error("Get dashboard stats error:", error);
      throw error;
    }
  },

  /**
   * Get Dashboard Chart Data
   * GET /api/admin/dashboard/chart-data
   */
  async getDashboardChartData() {
    try {
      const response = await ApiService.get("/admin/dashboard/chart-data");
      return response;
    } catch (error) {
      console.error("Get dashboard chart data error:", error);
      throw error;
    }
  },

  /**
   * Get Ride Status Stats
   * GET /api/admin/dashboard/ride-status
   */
  async getRideStatusStats() {
    try {
      const response = await ApiService.get("/admin/dashboard/ride-status");
      return response;
    } catch (error) {
      console.error("Get ride status stats error:", error);
      throw error;
    }
  },

  // ==================== USER MANAGEMENT APIs ====================

  /**
   * Get All Users
   * GET /api/admin/users?page=1&limit=10&search=john
   */
  async getAllUsers(page = 1, limit = 10, search = "") {
    try {
      const params = new URLSearchParams({ page, limit });
      if (search) params.append("search", search);
      const response = await ApiService.get(
        `/admin/users?${params.toString()}`,
      );
      console.log(response?.data, "response?.dataaaaaaaa");
      return response;
    } catch (error) {
      console.error("Get all users error:", error);
      throw error;
    }
  },

  /**
   * Get User By ID
   * GET /api/admin/users/:id
   */
  async getUserById(userId) {
    try {
      const response = await ApiService.get(`/admin/users/${userId}`);
      return response;
    } catch (error) {
      console.error("Get user by ID error:", error);
      throw error;
    }
  },

  /**
   * Update User
   * PUT /api/admin/users/:id
   */
  async updateUser(userId, userData) {
    try {
      const response = await ApiService.put(`/admin/users/${userId}`, userData);
      return response;
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  },

  /**
   * Delete User
   * DELETE /api/admin/users/:id
   */
  async deleteUser(userId) {
    try {
      const response = await ApiService.delete(`/admin/users/${userId}`);
      return response;
    } catch (error) {
      console.error("Delete user error:", error);
      throw error;
    }
  },

  /**
   * Block User
   * POST /api/admin/users/:id/block
   */
  async blockUser(userId) {
    try {
      const response = await ApiService.post(`/admin/users/${userId}/block`);
      return response;
    } catch (error) {
      console.error("Block user error:", error);
      throw error;
    }
  },

  /**
   * Unblock User
   * POST /api/admin/users/:id/unblock
   */
  async unblockUser(userId) {
    try {
      const response = await ApiService.post(`/admin/users/${userId}/unblock`);
      return response;
    } catch (error) {
      console.error("Unblock user error:", error);
      throw error;
    }
  },

  // ==================== DRIVER MANAGEMENT APIs ====================

  /**
   * Get All Drivers
   * GET /api/drivers?page=1&limit=10&status=approved
   */
  async getAllDrivers(page = 1, limit = 10, status = "") {
    try {
      const params = new URLSearchParams({ page, limit });
      if (status) params.append("status", status);
      const response = await ApiService.get(
        `/drivers?${params.toString()}`,
      );
      return response;
    } catch (error) {
      console.error("Get all drivers error:", error);
      throw error;
    }
  },

  /**
   * Get Pending Drivers
   * GET /api/drivers/pending
   */
  async getPendingDrivers() {
    try {
      const response = await ApiService.get("/drivers/pending");
      return response;
    } catch (error) {
      console.error("Get pending drivers error:", error);
      throw error;
    }
  },

  /**
   * Get Driver By ID
   * GET /api/drivers/:id
   */
  async getDriverById(driverId) {
    try {
      const response = await ApiService.get(`/drivers/${driverId}`);
      return response;
    } catch (error) {
      console.error("Get driver by ID error:", error);
      throw error;
    }
  },

  /**
   * Update Driver
   * PUT /api/admin/drivers/:id
   */
  async updateDriver(driverId, driverData) {
    try {
      const response = await ApiService.put(
        `/admin/drivers/${driverId}`,
        driverData,
      );
      return response;
    } catch (error) {
      console.error("Update driver error:", error);
      throw error;
    }
  },

  /**
   * Delete Driver
   * DELETE /api/admin/drivers/:id
   */
  async deleteDriver(driverId) {
    try {
      const response = await ApiService.delete(`/admin/drivers/${driverId}`);
      return response;
    } catch (error) {
      console.error("Delete driver error:", error);
      throw error;
    }
  },

  /**
   * Verify Driver
   * POST /api/admin/drivers/:id/verify
   */
  async verifyDriver(driverId) {
    try {
      const response = await ApiService.post(
        `/admin/drivers/${driverId}/verify`,
      );
      return response;
    } catch (error) {
      console.error("Verify driver error:", error);
      throw error;
    }
  },

  /**
   * Reject Driver
   * POST /api/admin/drivers/:id/reject
   */
  async rejectDriver(driverId, rejectionReason) {
    try {
      const response = await ApiService.post(
        `/admin/drivers/${driverId}/reject`,
        {
          rejectionReason,
        },
      );
      return response;
    } catch (error) {
      console.error("Reject driver error:", error);
      throw error;
    }
  },

  // ==================== ROLE MANAGEMENT APIs ====================

  /**
   * Get All Roles
   * GET /api/admin/roles
   */
  async getAllRoles() {
    try {
      const response = await ApiService.get("/admin/roles");
      return response;
    } catch (error) {
      console.error("Get all roles error:", error);
      throw error;
    }
  },

  /**
   * Create Role
   * POST /api/admin/roles
   */
  async createRole(roleData) {
    try {
      const response = await ApiService.post("/admin/roles", roleData);
      return response;
    } catch (error) {
      console.error("Create role error:", error);
      throw error;
    }
  },

  /**
   * Update Role
   * PUT /api/admin/roles/:id
   */
  async updateRole(roleId, roleData) {
    try {
      const response = await ApiService.put(`/admin/roles/${roleId}`, roleData);
      return response;
    } catch (error) {
      console.error("Update role error:", error);
      throw error;
    }
  },

  /**
   * Delete Role
   * DELETE /api/admin/roles/:id
   */
  async deleteRole(roleId) {
    try {
      const response = await ApiService.delete(`/admin/roles/${roleId}`);
      return response;
    } catch (error) {
      console.error("Delete role error:", error);
      throw error;
    }
  },

  // ==================== PERMISSIONS APIs ====================

  /**
   * Get All Permissions
   * GET /api/admin/permissions
   */
  async getAllPermissions() {
    try {
      const response = await ApiService.get("/admin/permissions");
      return response;
    } catch (error) {
      console.error("Get all permissions error:", error);
      throw error;
    }
  },

  /**
   * Create Permission
   * POST /api/admin/permissions
   */
  async createPermission(permissionData) {
    try {
      const response = await ApiService.post(
        "/admin/permissions",
        permissionData,
      );
      return response;
    } catch (error) {
      console.error("Create permission error:", error);
      throw error;
    }
  },

  /**
   * Update Permission
   * PUT /api/admin/permissions/:id
   */
  async updatePermission(permissionId, permissionData) {
    try {
      const response = await ApiService.put(
        `/admin/permissions/${permissionId}`,
        permissionData,
      );
      return response;
    } catch (error) {
      console.error("Update permission error:", error);
      throw error;
    }
  },

  /**
   * Delete Permission
   * DELETE /api/admin/permissions/:id
   */
  async deletePermission(permissionId) {
    try {
      const response = await ApiService.delete(
        `/admin/permissions/${permissionId}`,
      );
      return response;
    } catch (error) {
      console.error("Delete permission error:", error);
      throw error;
    }
  },

  // ==================== CAB MANAGEMENT APIs ====================

  /**
   * Get All Categories
   * GET /api/admin/categories
   */
  async getAllCategories() {
    try {
      const response = await ApiService.get("/admin/categories");
      return response;
    } catch (error) {
      console.error("Get all categories error:", error);
      throw error;
    }
  },

  /**
   * Get Category By ID
   * GET /api/admin/categories/:id
   */
  async getCategoryById(categoryId) {
    try {
      const response = await ApiService.get(`/admin/categories/${categoryId}`);
      return response;
    } catch (error) {
      console.error("Get category by ID error:", error);
      throw error;
    }
  },

  /**
   * Create Category
   * POST /api/admin/categories
   */
  async createCategory(categoryData) {
    try {
      const response = await ApiService.post("/admin/categories", categoryData);
      return response;
    } catch (error) {
      console.error("Create category error:", error);
      throw error;
    }
  },

  /**
   * Update Category
   * PUT /api/admin/categories/:id
   */
  async updateCategory(categoryId, categoryData) {
    try {
      const response = await ApiService.put(`/admin/categories/${categoryId}`, categoryData);
      return response;
    } catch (error) {
      console.error("Update category error:", error);
      throw error;
    }
  },

  /**
   * Delete Category
   * DELETE /api/admin/categories/:id
   */
  async deleteCategory(categoryId) {
    try {
      const response = await ApiService.delete(`/admin/categories/${categoryId}`);
      return response;
    } catch (error) {
      console.error("Delete category error:", error);
      throw error;
    }
  },

  /**
   * Get All Cabs
   * GET /api/admin/cabs
   */
  async getAllCabs() {
    try {
      const response = await ApiService.get("/admin/cabs");
      return response;
    } catch (error) {
      console.error("Get all cabs error:", error);
      throw error;
    }
  },

  /**
   * Get Cab By ID
   * GET /api/admin/cabs/:id
   */
  async getCabById(cabId) {
    try {
      const response = await ApiService.get(`/admin/cabs/${cabId}`);
      return response;
    } catch (error) {
      console.error("Get cab by ID error:", error);
      throw error;
    }
  },

  /**
   * Add Cab
   * POST /api/admin/cabs
   */
  async addCab(cabData) {
    try {
      const response = await ApiService.post("/admin/cabs", cabData);
      return response;
    } catch (error) {
      console.error("Add cab error:", error);
      throw error;
    }
  },

  /**
   * Update Cab
   * PUT /api/admin/cabs/:id
   */
  async updateCab(cabId, cabData) {
    try {
      const response = await ApiService.put(`/admin/cabs/${cabId}`, cabData);
      return response;
    } catch (error) {
      console.error("Update cab error:", error);
      throw error;
    }
  },

  /**
   * Delete Cab
   * DELETE /api/admin/cabs/:id
   */
  async deleteCab(cabId) {
    try {
      const response = await ApiService.delete(`/admin/cabs/${cabId}`);
      return response;
    } catch (error) {
      console.error("Delete cab error:", error);
      throw error;
    }
  },

  // ==================== REFERRAL & EARNINGS APIs ====================

  /**
   * Get Referral Earnings
   * GET /api/admin/referral/earnings
   */
  async getReferralEarnings() {
    try {
      const response = await ApiService.get("/admin/referral/earnings");
      return response;
    } catch (error) {
      console.error("Get referral earnings error:", error);
      throw error;
    }
  },

  /**
   * Get Referral Earnings By User
   * GET /api/admin/referral/earnings/:userId
   */
  async getReferralEarningsByUser(userId) {
    try {
      const response = await ApiService.get(
        `/admin/referral/earnings/${userId}`,
      );
      return response;
    } catch (error) {
      console.error("Get referral earnings by user error:", error);
      throw error;
    }
  },

  /**
   * Get All Referrals
   * GET /api/admin/referrals
   */
  async getAllReferrals() {
    try {
      const response = await ApiService.get("/admin/referrals");
      return response;
    } catch (error) {
      console.error("Get all referrals error:", error);
      throw error;
    }
  },

  /**
   * Get Referrals By User
   * GET /api/admin/referrals/:userId
   */
  async getReferralsByUser(userId) {
    try {
      const response = await ApiService.get(`/admin/referrals/${userId}`);
      return response;
    } catch (error) {
      console.error("Get referrals by user error:", error);
      throw error;
    }
  },

  // ==================== PROMOTIONS APIs ====================

  /**
   * Get All Promotions
   * GET /api/admin/promotions
   */
  async getAllPromotions() {
    try {
      const response = await ApiService.get("/admin/promotions");
      return response;
    } catch (error) {
      console.error("Get all promotions error:", error);
      throw error;
    }
  },

  /**
   * Create Promotion
   * POST /api/admin/promotions
   */
  async createPromotion(promotionData) {
    try {
      const response = await ApiService.post(
        "/admin/promotions",
        promotionData,
      );
      return response;
    } catch (error) {
      console.error("Create promotion error:", error);
      throw error;
    }
  },

  /**
   * Update Promotion
   * PUT /api/admin/promotions/:id
   */
  async updatePromotion(promotionId, promotionData) {
    try {
      const response = await ApiService.put(
        `/admin/promotions/${promotionId}`,
        promotionData,
      );
      return response;
    } catch (error) {
      console.error("Update promotion error:", error);
      throw error;
    }
  },

  /**
   * Delete Promotion
   * DELETE /api/admin/promotions/:id
   */
  async deletePromotion(promotionId) {
    try {
      const response = await ApiService.delete(
        `/admin/promotions/${promotionId}`,
      );
      return response;
    } catch (error) {
      console.error("Delete promotion error:", error);
      throw error;
    }
  },

  // ==================== RIDE MANAGEMENT APIs ====================

  /**
   * Get All Rides
   * GET /api/admin/rides?page=1&limit=10&status=completed
   */
  async getAllRides(page = 1, limit = 10, status = "") {
    try {
      const params = new URLSearchParams({ page, limit });
      if (status) params.append("status", status);
      const response = await ApiService.get(
        `/admin/rides?${params.toString()}`,
      );
      return response;
    } catch (error) {
      console.error("Get all rides error:", error);
      throw error;
    }
  },

  /**
   * Get Ride By ID
   * GET /api/admin/rides/:id
   */
  async getRideById(rideId) {
    try {
      const response = await ApiService.get(`/admin/rides/${rideId}`);
      return response;
    } catch (error) {
      console.error("Get ride by ID error:", error);
      throw error;
    }
  },

  /**
   * Update Ride Status
   * PUT /api/admin/rides/:id/status
   */
  async updateRideStatus(rideId, status) {
    try {
      const response = await ApiService.put(`/admin/rides/${rideId}/status`, {
        status,
      });
      return response;
    } catch (error) {
      console.error("Update ride status error:", error);
      throw error;
    }
  },

  /**
   * Delete Ride
   * DELETE /api/admin/rides/:id
   */
  async deleteRide(rideId) {
    try {
      const response = await ApiService.delete(`/admin/rides/${rideId}`);
      return response;
    } catch (error) {
      console.error("Delete ride error:", error);
      throw error;
    }
  },

  // ==================== DRIVER VERIFICATIONS APIs ====================

  /**
   * Get Driver Verifications
   * GET /api/admin/driver-verifications
   */
  async getDriverVerifications() {
    try {
      const response = await ApiService.get("/admin/driver-verifications");
      return response;
    } catch (error) {
      console.error("Get driver verifications error:", error);
      throw error;
    }
  },

  /**
   * Get Pending Verifications
   * GET /api/admin/driver-verifications/pending
   */
  async getPendingVerifications() {
    try {
      const response = await ApiService.get(
        "/admin/driver-verifications/pending",
      );
      return response;
    } catch (error) {
      console.error("Get pending verifications error:", error);
      throw error;
    }
  },

  /**
   * Get Verification By ID
   * GET /api/admin/driver-verifications/:id
   */
  async getVerificationById(verificationId) {
    try {
      const response = await ApiService.get(
        `/admin/driver-verifications/${verificationId}`,
      );
      return response;
    } catch (error) {
      console.error("Get verification by ID error:", error);
      throw error;
    }
  },

  /**
   * Approve Verification
   * POST /api/admin/driver-verifications/:id/approve
   */
  async approveVerification(verificationId) {
    try {
      const response = await ApiService.post(
        `/admin/driver-verifications/${verificationId}/approve`,
      );
      return response;
    } catch (error) {
      console.error("Approve verification error:", error);
      throw error;
    }
  },

  /**
   * Reject Verification
   * POST /api/admin/driver-verifications/:id/reject
   */
  async rejectVerification(verificationId, rejectionReason, rejectedDocument) {
    try {
      const response = await ApiService.post(
        `/admin/driver-verifications/${verificationId}/reject`,
        {
          rejectionReason,
          rejectedDocument,
        },
      );
      return response;
    } catch (error) {
      console.error("Reject verification error:", error);
      throw error;
    }
  },

  // ==================== RECENT ACTIVITY APIs ====================

  /**
   * Get Recent Activities
   * GET /api/admin/recent-activities
   */
  async getRecentActivities() {
    try {
      const response = await ApiService.get("/admin/recent-activities");
      return response;
    } catch (error) {
      console.error("Get recent activities error:", error);
      throw error;
    }
  },

  // ==================== ANALYTICS APIs ====================

  /**
   * Get Analytics Overview
   * GET /api/admin/analytics/overview
   */
  async getAnalyticsOverview() {
    try {
      const response = await ApiService.get("/admin/analytics/overview");
      return response;
    } catch (error) {
      console.error("Get analytics overview error:", error);
      throw error;
    }
  },

  /**
   * Get Revenue Analytics
   * GET /api/admin/analytics/revenue?period=monthly
   */
  async getRevenueAnalytics(period = "monthly") {
    try {
      const response = await ApiService.get(
        `/admin/analytics/revenue?period=${period}`,
      );
      return response;
    } catch (error) {
      console.error("Get revenue analytics error:", error);
      throw error;
    }
  },

  /**
   * Get Ride Analytics
   * GET /api/admin/analytics/rides
   */
  async getRideAnalytics() {
    try {
      const response = await ApiService.get("/admin/analytics/rides");
      return response;
    } catch (error) {
      console.error("Get ride analytics error:", error);
      throw error;
    }
  },

  // ==================== SETTINGS APIs ====================

  /**
   * Get Settings
   * GET /api/admin/settings
   */
  async getSettings() {
    try {
      const response = await ApiService.get("/admin/settings");
      return response;
    } catch (error) {
      console.error("Get settings error:", error);
      throw error;
    }
  },

  /**
   * Update Settings
   * PUT /api/admin/settings
   */
  async updateSettings(settingsData) {
    try {
      const response = await ApiService.put("/admin/settings", settingsData);
      return response;
    } catch (error) {
      console.error("Update settings error:", error);
      throw error;
    }
  },

  // ==================== ADMIN PROFILE APIs ====================

  /**
   * Get Admin Profile
   * GET /api/admin/profile
   */
  async getProfile() {
    try {
      const response = await ApiService.get("/admin/profile");
      return response;
    } catch (error) {
      console.error("Get admin profile error:", error);
      throw error;
    }
  },

  /**
   * Update Admin Profile
   * PUT /api/admin/profile
   */
  async updateProfile(profileData) {
    try {
      const response = await ApiService.put("/admin/profile", profileData);
      return response;
    } catch (error) {
      console.error("Update admin profile error:", error);
      throw error;
    }
  },

  /**
   * Change Password
   * POST /api/admin/change-password
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await ApiService.post("/admin/change-password", {
        currentPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      console.error("Change password error:", error);
      throw error;
    }
  },

  // ==================== ADMIN MANAGEMENT APIs (Super Admin Only) ====================

  /**
   * Get All Admins
   * GET /api/admin/admins
   */
  async getAllAdmins() {
    try {
      const response = await ApiService.get("/admin/admins");
      return response;
    } catch (error) {
      console.error("Get all admins error:", error);
      throw error;
    }
  },

  /**
   * Get Admin By ID
   * GET /api/admin/admins/:id
   */
  async getAdminById(adminId) {
    try {
      const response = await ApiService.get(`/admin/admins/${adminId}`);
      return response;
    } catch (error) {
      console.error("Get admin by ID error:", error);
      throw error;
    }
  },

  /**
   * Create Admin
   * POST /api/admin/admins
   */
  async createAdmin(adminData) {
    try {
      const response = await ApiService.post("/admin/admins", adminData);
      return response;
    } catch (error) {
      console.error("Create admin error:", error);
      throw error;
    }
  },

  /**
   * Update Admin
   * PUT /api/admin/admins/:id
   */
  async updateAdmin(adminId, adminData) {
    try {
      const response = await ApiService.put(
        `/admin/admins/${adminId}`,
        adminData,
      );
      return response;
    } catch (error) {
      console.error("Update admin error:", error);
      throw error;
    }
  },

  /**
   * Delete Admin
   * DELETE /api/admin/admins/:id
   */
  async deleteAdmin(adminId) {
    try {
      const response = await ApiService.delete(`/admin/admins/${adminId}`);
      return response;
    } catch (error) {
      console.error("Delete admin error:", error);
      throw error;
    }
  },

  /**
   * Toggle Admin Status
   * POST /api/admin/admins/:id/toggle-status
   */
  async toggleAdminStatus(adminId) {
    try {
      const response = await ApiService.post(
        `/admin/admins/${adminId}/toggle-status`,
      );
      return response;
    } catch (error) {
      console.error("Toggle admin status error:", error);
      throw error;
    }
  },

  /**
   * Update Admin Permissions
   * PUT /api/admin/admins/:id/permissions
   */
  async updateAdminPermissions(adminId, permissions) {
    try {
      const response = await ApiService.put(
        `/admin/admins/${adminId}/permissions`,
        {
          permissions,
        },
      );
      return response;
    } catch (error) {
      console.error("Update admin permissions error:", error);
      throw error;
    }
  },
};
