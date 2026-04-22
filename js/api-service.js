/**
 * RideLynk API Service
 * Core HTTP client for making API requests
 */

const ApiService = {
  /**
   * Make HTTP request
   */
  async request(endpoint, options = {}) {
    const {
      method = "GET",
      body = null,
      headers = {},
      requiresAuth = true,
      isFormData = false,
    } = options;

    const url = `${CONFIG.API_BASE_URL}${endpoint}`;

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📡 API REQUEST");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎯 URL:", url);
    console.log("📝 Method:", method);
    console.log("🔐 Requires Auth:", requiresAuth);

    // Prepare headers
    const requestHeaders = {
      ...headers,
    };
    requestHeaders["ngrok-skip-browser-warning"] = "true";
    // Add Content-Type for JSON requests
    if (!isFormData && body) {
      requestHeaders["Content-Type"] = "application/json";
    }

    // Add authorization token if required
    if (requiresAuth) {
      const token = Utils.getAuthToken();
      if (token) {
        requestHeaders["Authorization"] = `Bearer ${token}`;
        console.log("🔑 Token Added:", token.substring(0, 30) + "...");
      } else {
        console.warn("⚠️ No token found in localStorage!");
        console.log("📦 Storage Keys:", CONFIG.STORAGE_KEYS);
        console.log("📦 Checking:", CONFIG.STORAGE_KEYS.AUTH_TOKEN);
      }
    } else {
      console.log("🔓 No auth required for this request");
    }

    console.log("📋 Headers:", requestHeaders);

    // Prepare request config
    const config = {
      method,
      headers: requestHeaders,
    };

    // Add body for POST, PUT, PATCH requests
    if (body) {
      config.body = isFormData ? body : JSON.stringify(body);
      if (!isFormData) {
        console.log("📤 Request Body:", body);
      }
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    try {
      console.log("⏳ Sending request...");
      const response = await fetch(url, config);
      console.log("✅ Response received");

      // Handle response
      return await this.handleResponse(response);
    } catch (error) {
      console.error("❌ API Request Error:", error);
      throw this.handleError(error);
    }
  },

  /**
   * Handle API response
   */
  async handleResponse(response) {
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📥 API RESPONSE");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🌐 URL:", response.url);
    console.log("📊 Status:", response.status, response.statusText);
    console.log("✅ OK:", response.ok);
    console.log("📄 Content-Type:", contentType);

    let data;
    if (isJson) {
      data = await response.json();
      console.log("📦 Response Data:", data);
    } else {
      data = await response.text();
      console.log("📝 Response Text:", data.substring(0, 200));
    }

    if (!response.ok) {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.error("❌ REQUEST FAILED");
      console.error("Status:", response.status);
      console.error("Error Data:", data);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      // Handle specific error codes
      if (response.status === 401) {
        // Unauthorized - token expired or invalid
        console.warn("⚠️ 401 Unauthorized - Token may be invalid or expired");
        console.log(
          "Current token:",
          localStorage
            .getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN)
            ?.substring(0, 20) + "...",
        );
        console.log("Request URL:", response.url);

        // Only logout if this is not a dashboard initial load
        // This prevents redirect loops when backend is unavailable
        const isDashboardLoad = window.location.pathname.includes("dashboard");
        if (!isDashboardLoad) {
          Utils.showToast("Session expired. Please login again.", "error");
          Utils.logout();
        } else {
          console.warn(
            "Dashboard load detected - not auto-logging out to prevent redirect loop",
          );
          Utils.showToast(
            "Unable to load dashboard data. Backend may be unavailable.",
            "warning",
          );
        }
        throw new Error("Unauthorized");
      }

      if (response.status === 403) {
        Utils.showToast("Access denied", "error");
        throw new Error("Forbidden");
      }

      if (response.status === 404) {
        throw new Error(data.message || "Resource not found");
      }

      if (response.status === 422) {
        // Validation error
        throw {
          message: data.message || "Validation failed",
          errors: data.errors || [],
          status: 422,
        };
      }

      if (response.status >= 500) {
        console.error("ApiService - Server error details:", data);
        Utils.showToast("Server error. Please try again later.", "error");
        throw {
          success: false,
          message: data.message || "Server error",
          error: data.error || "Internal server error",
          status: response.status,
        };
      }

      // Generic error
      throw new Error(data.message || "Request failed");
    }

    console.log("✅ Request successful");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    return data;
  },

  /**
   * Handle API errors
   */
  handleError(error) {
    if (error.message === "Failed to fetch") {
      return {
        success: false,
        message: "Network error. Please check your connection.",
        error: "NETWORK_ERROR",
      };
    }

    return {
      success: false,
      message: error.message || "An error occurred",
      error: error,
    };
  },

  /**
   * GET request
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  },

  /**
   * POST request
   */
  async post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: "POST", body });
  },

  /**
   * PUT request
   */
  async put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: "PUT", body });
  },

  /**
   * PATCH request
   */
  async patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: "PATCH", body });
  },

  /**
   * DELETE request
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  },

  /**
   * Upload file(s)
   */
  async upload(endpoint, formData, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: formData,
      isFormData: true,
    });
  },
};
