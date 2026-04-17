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
      method = 'GET',
      body = null,
      headers = {},
      requiresAuth = true,
      isFormData = false
    } = options;

    const url = `${CONFIG.API_BASE_URL}${endpoint}`;

    // Prepare headers
    const requestHeaders = {
      ...headers
    };

    // Add Content-Type for JSON requests
    if (!isFormData && body) {
      requestHeaders['Content-Type'] = 'application/json';
    }

    // Add authorization token if required
    if (requiresAuth) {
      const token = Utils.getAuthToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    // Prepare request config
    const config = {
      method,
      headers: requestHeaders
    };

    // Add body for POST, PUT, PATCH requests
    if (body) {
      config.body = isFormData ? body : JSON.stringify(body);
    }

    console.log('ApiService - Making request to:', url);
    console.log('ApiService - Method:', method);
    console.log('ApiService - Headers:', requestHeaders);
    if (body && !isFormData) {
      console.log('ApiService - Request body:', JSON.parse(config.body));
    }

    try {
      const response = await fetch(url, config);

      // Handle response
      return await this.handleResponse(response);
    } catch (error) {
      console.error('API Request Error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Handle API response
   */
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    console.log('ApiService - Response status:', response.status);
    console.log('ApiService - Response ok:', response.ok);
    console.log('ApiService - Content type:', contentType);
    console.log('ApiService - Response URL:', response.url);

    let data;
    if (isJson) {
      data = await response.json();
      console.log('ApiService - Parsed JSON data:', data);
    } else {
      data = await response.text();
      console.log('ApiService - Text data:', data);
    }

    if (!response.ok) {
      console.log('ApiService - Response not OK, status:', response.status);
      console.log('ApiService - Error data:', data);

      // Handle specific error codes
      if (response.status === 401) {
        // Unauthorized - token expired or invalid
        Utils.showToast('Session expired. Please login again.', 'error');
        Utils.logout();
        throw new Error('Unauthorized');
      }

      if (response.status === 403) {
        Utils.showToast('Access denied', 'error');
        throw new Error('Forbidden');
      }

      if (response.status === 404) {
        throw new Error(data.message || 'Resource not found');
      }

      if (response.status === 422) {
        // Validation error
        throw {
          message: data.message || 'Validation failed',
          errors: data.errors || [],
          status: 422
        };
      }

      if (response.status >= 500) {
        console.error('ApiService - Server error details:', data);
        Utils.showToast('Server error. Please try again later.', 'error');
        throw {
          success: false,
          message: data.message || 'Server error',
          error: data.error || 'Internal server error',
          status: response.status
        };
      }

      // Generic error
      throw new Error(data.message || 'Request failed');
    }

    console.log('ApiService - Returning successful response:', data);
    return data;
  },

  /**
   * Handle API errors
   */
  handleError(error) {
    if (error.message === 'Failed to fetch') {
      return {
        success: false,
        message: 'Network error. Please check your connection.',
        error: 'NETWORK_ERROR'
      };
    }

    return {
      success: false,
      message: error.message || 'An error occurred',
      error: error
    };
  },

  /**
   * GET request
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  /**
   * POST request
   */
  async post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  },

  /**
   * PUT request
   */
  async put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  },

  /**
   * PATCH request
   */
  async patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body });
  },

  /**
   * DELETE request
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },

  /**
   * Upload file(s)
   */
  async upload(endpoint, formData, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: formData,
      isFormData: true
    });
  }
};
