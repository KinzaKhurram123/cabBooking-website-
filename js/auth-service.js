/**
 * RideLynk Authentication Service
 * Handles all authentication-related API calls
 */

const AuthService = {
  /**
   * Register new user
   * POST /auth/register
   */
  async register(userData) {
    try {
      // Add role field for customer registration
      const registrationData = {
        ...userData,
        role: "customer", // Default role for customer registration
      };

      console.log("AuthService - Register data with role:", registrationData);

      const response = await ApiService.post(
        "/auth/register",
        registrationData,
        {
          requiresAuth: false,
        },
      );

      console.log("AuthService - Register response:", response);

      if (response.success !== false && response.token) {
        // Store token and user data
        localStorage.setItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN, response.token);
        localStorage.setItem(
          CONFIG.STORAGE_KEYS.USER_DATA,
          JSON.stringify(response.user || response.data),
        );
        localStorage.setItem(
          CONFIG.STORAGE_KEYS.USER_ROLE,
          response.user?.role || "customer",
        );
      }

      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  /**
   * Register new driver
   * POST /auth/register/driver
   */
  async registerDriver(driverData) {
    try {
      const response = await ApiService.post(
        "/auth/register/driver",
        driverData,
        {
          requiresAuth: false,
        },
      );

      if (response.success !== false && response.token) {
        // Store token and user data
        localStorage.setItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN, response.token);
        localStorage.setItem(
          CONFIG.STORAGE_KEYS.USER_DATA,
          JSON.stringify(response.user || response.data),
        );
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_ROLE, "driver");
      }

      return response;
    } catch (error) {
      console.error("Driver registration error:", error);
      throw error;
    }
  },

  /**
   * Login user
   * POST /auth/login
   */
  async login(credentials) {
    try {
      const response = await ApiService.post("/auth/login", credentials, {
        requiresAuth: false,
      });

      console.log("AuthService - Raw API response:", response);

      let token = response.token || response.data?.token;
      let user = response.user || response.data?.user || response.data;
      let userRole = user?.role || response.role || "customer";

      if (
        userRole &&
        (userRole.toLowerCase() === "superadmin" ||
          userRole.toLowerCase() === "super_admin" ||
          userRole.toLowerCase() === "admin")
      ) {
        userRole = "admin";
      } else {
        userRole = "customer";
      }

      console.log("AuthService - Extracted token:", token);
      console.log("AuthService - Extracted user:", user);
      console.log("AuthService - Extracted role (normalized):", userRole);

      if (token) {
        // Merge all data from API response
        const userData = {
          ...user,
          ...(response.data?.riderDetails || {}),
          vehicleDetails: response.data?.vehicleDetails || user?.vehicleDetails,
          documents: response.data?.documents || user?.documents,
          onboardingSteps:
            response.data?.onboardingSteps || user?.onboardingSteps,
          onboardingRequired:
            response.data?.onboardingRequired !== undefined
              ? response.data.onboardingRequired
              : user?.onboardingRequired,
          verificationStatus:
            response.data?.riderDetails?.verificationStatus ||
            user?.verificationStatus,
        };

        console.log("AuthService - Merged userData:", userData);
        console.log("AuthService - onboardingSteps:", userData.onboardingSteps);
        console.log(
          "AuthService - onboardingRequired:",
          userData.onboardingRequired,
        );

        // Store token and user data
        localStorage.setItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(
          CONFIG.STORAGE_KEYS.USER_DATA,
          JSON.stringify(userData),
        );
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_ROLE, userRole);

        console.log("AuthService - Data stored in localStorage");
      }

      return response;
    } catch (error) {
      console.error("AuthService - Login error:", error);
      throw error;
    }
  },

  /**
   * Forgot password - send OTP
   * POST /auth/forget_password
   */
  async forgotPassword(email) {
    try {
      const response = await ApiService.post(
        "/auth/forget_password",
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
   * Verify OTP code
   * POST /auth/checkOTP
   */
  async verifyOTP(email, code) {
    try {
      const response = await ApiService.post(
        "/auth/checkOTP",
        { email, code },
        {
          requiresAuth: false,
        },
      );
      return response;
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  },

  /**
   * Reset password
   * POST /auth/reset_password
   */
  async resetPassword(email, password, confirmpassword) {
    try {
      const response = await ApiService.post(
        "/auth/reset_password",
        {
          email,
          password,
          confirmpassword,
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
   * Get user profile
   * POST /auth/get_profile
   */
  async getProfile() {
    try {
      const response = await ApiService.post("/auth/get_profile");

      if (response.success !== false && response.user) {
        // Update stored user data
        localStorage.setItem(
          CONFIG.STORAGE_KEYS.USER_DATA,
          JSON.stringify(response.user),
        );
      }

      return response;
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  },

  /**
   * Update user profile
   * POST /auth/edit_profile
   */
  async updateProfile(profileData) {
    try {
      const response = await ApiService.post("/auth/edit_profile", profileData);

      if (response.success !== false && response.user) {
        // Update stored user data
        localStorage.setItem(
          CONFIG.STORAGE_KEYS.USER_DATA,
          JSON.stringify(response.user),
        );
      }

      return response;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout() {
    // Clear all stored data
    localStorage.removeItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USER_ROLE);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.REMEMBER_ME);

    // Redirect to login
    window.location.href = "login.html";
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Get current user
   */
  getCurrentUser() {
    const userData = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Get user role
   */
  getUserRole() {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.USER_ROLE) || "customer";
  },
};
