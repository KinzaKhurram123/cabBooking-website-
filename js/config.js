/**
 * RideLynk Configuration
 * Central configuration for API endpoints and third-party services
 */

const CONFIG = {
  // API Configuration
  API_BASE_URL: "https://backend.ridelynk.com/api",

  // Google Maps Configuration
  GOOGLE_MAPS_API_KEY: "AIzaSyAqNK7IfM16zi79N0u7qX4Ncm5QgGvBqmg",

  // Pusher Configuration (Real-time updates)
  PUSHER_KEY: "a7ebb925bd7da86bec30",
  PUSHER_CLUSTER: "mt1",

  // Stripe Configuration (Payment processing)
  STRIPE_PUBLIC_KEY:
    "pk_test_51RjPdjRwYBV7klBlvjEBIXIPmNc4OBdvDtNVbjsZGzry1Ijq8E7waraDg3CXFpVXpJS1kJtuaPcRg7jvbnU76IPw0005YhkwjH",

  // LocalStorage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: "authToken",
    USER_DATA: "userData",
    USER_ROLE: "userRole",
    REMEMBER_ME: "rememberMe",
  },

  // Request Configuration
  REQUEST_TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,

  // File Upload Limits
  MAX_FILE_SIZE: {
    IMAGE: 5 * 1024 * 1024, // 5MB
    DOCUMENT: 10 * 1024 * 1024, // 10MB
  },

  // Supported file types
  ALLOWED_FILE_TYPES: {
    IMAGE: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    DOCUMENT: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
  },
};

// Environment detection
if (
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1"
) {
  // Production environment - update with your production API URL
  CONFIG.API_BASE_URL = "https://your-production-api.com/api";
}
