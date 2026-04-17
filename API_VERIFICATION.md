# API Verification & Testing Guide

## ✅ Backend Status
- **API Server**: `http://142.93.59.204:5000/api`
- **Status**: ✅ ONLINE (Tested and responding)
- **Test Result**: `/ride-types` endpoint returns proper JSON response

---

## 🔍 Common Issues & Solutions

### Issue 1: CORS (Cross-Origin Resource Sharing) Errors
**Symptoms**: 
- APIs work in backend but fail in browser
- Console shows "CORS policy" errors
- Network tab shows requests blocked

**Solution**: Backend needs to allow your frontend domain in CORS settings.

### Issue 2: Missing Script Includes
**Check**: Make sure your HTML files include scripts in this order:
```html
<script src="js/config.js"></script>
<script src="js/utils.js"></script>
<script src="js/api-service.js"></script>
<script src="js/auth-service.js"></script>
<!-- Other service files as needed -->
```

### Issue 3: Browser Console Errors
**Check**: Open browser DevTools (F12) and look for:
- JavaScript errors (red text)
- Network errors (failed requests)
- CORS errors

---

## 🧪 Quick API Tests

### Test 1: Check API Connection
Open browser console and run:
```javascript
fetch('http://142.93.59.204:5000/api/ride-types')
  .then(r => r.json())
  .then(d => console.log('✅ API Working:', d))
  .catch(e => console.error('❌ API Error:', e));
```

### Test 2: Test Login API
```javascript
fetch('http://142.93.59.204:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test123'
  })
})
  .then(r => r.json())
  .then(d => console.log('Login Response:', d))
  .catch(e => console.error('Login Error:', e));
```

### Test 3: Test AuthService
```javascript
// Make sure you're on a page with AuthService loaded
AuthService.login({
  email: 'test@example.com',
  password: 'test123'
})
  .then(r => console.log('✅ AuthService Working:', r))
  .catch(e => console.error('❌ AuthService Error:', e));
```

---

## 📋 Service Files Verification

### ✅ All Service Files Present:
- [x] `js/config.js` - API configuration
- [x] `js/utils.js` - Utility functions
- [x] `js/api-service.js` - Core HTTP client
- [x] `js/auth-service.js` - Authentication APIs
- [x] `js/ride-service.js` - Ride booking APIs
- [x] `js/driver-service.js` - Driver/Rider APIs
- [x] `js/payment-service.js` - Payment APIs
- [x] `js/review-service.js` - Review APIs
- [x] `js/chat-service.js` - Chat APIs
- [x] `js/parcel-service.js` - Parcel booking APIs
- [x] `js/pet-service.js` - Pet delivery APIs
- [x] `js/admin-service.js` - Admin APIs
- [x] `js/pusher-service.js` - Real-time updates

---

## 🔧 Debugging Steps

### Step 1: Open Browser Console
1. Press `F12` or `Ctrl+Shift+I`
2. Go to "Console" tab
3. Look for any red error messages

### Step 2: Check Network Tab
1. Go to "Network" tab in DevTools
2. Try to login or use any feature
3. Look at the requests:
   - **Red requests** = Failed
   - **Status 200** = Success
   - **Status 401** = Unauthorized (wrong credentials)
   - **Status 404** = Endpoint not found
   - **Status 500** = Server error

### Step 3: Check Script Loading
In console, type:
```javascript
console.log('CONFIG:', typeof CONFIG);
console.log('ApiService:', typeof ApiService);
console.log('AuthService:', typeof AuthService);
console.log('RideService:', typeof RideService);
```

All should show `"object"`. If any shows `"undefined"`, that script didn't load.

### Step 4: Test Individual APIs
```javascript
// Test if CONFIG is loaded
console.log('API URL:', CONFIG.API_BASE_URL);

// Test if services are available
console.log('Services:', {
  ApiService: typeof ApiService,
  AuthService: typeof AuthService,
  RideService: typeof RideService,
  DriverService: typeof DriverService,
  PaymentService: typeof PaymentService
});
```

---

## 📝 API Endpoint Mapping

### Authentication APIs ✅
| Method | Endpoint | Service Method | Status |
|--------|----------|----------------|--------|
| POST | `/auth/register` | `AuthService.register()` | ✅ |
| POST | `/auth/register/driver` | `AuthService.registerDriver()` | ✅ |
| POST | `/auth/login` | `AuthService.login()` | ✅ |
| POST | `/auth/forget_password` | `AuthService.forgotPassword()` | ✅ |
| POST | `/auth/checkOTP` | `AuthService.verifyOTP()` | ✅ |
| POST | `/auth/reset_password` | `AuthService.resetPassword()` | ✅ |
| POST | `/auth/get_profile` | `AuthService.getProfile()` | ✅ |
| POST | `/auth/edit_profile` | `AuthService.updateProfile()` | ✅ |

### Ride Booking APIs ✅
| Method | Endpoint | Service Method | Status |
|--------|----------|----------------|--------|
| POST | `/rides/ridebook` | `RideService.createRide()` | ✅ |
| GET | `/rides/nearby` | `RideService.getNearbyRides()` | ✅ |
| GET | `/rides/all_rides` | `RideService.getAllRides()` | ✅ |
| GET | `/rides/ride_history/:userId` | `RideService.getRideHistory()` | ✅ |
| POST | `/rides/accept/:bookingId` | `RideService.acceptRide()` | ✅ |
| PUT | `/rides/:bookingId/on-the-way` | `RideService.setOnTheWay()` | ✅ |
| PUT | `/rides/:bookingId/start` | `RideService.startRide()` | ✅ |
| PUT | `/rides/:bookingId/complete` | `RideService.completeRide()` | ✅ |
| GET | `/ride-types` | `RideService.getRideTypes()` | ✅ |

### Driver/Rider APIs ✅
| Method | Endpoint | Service Method | Status |
|--------|----------|----------------|--------|
| POST | `/rider/vehicle-details` | `DriverService.addVehicleDetails()` | ✅ |
| POST | `/rider/upload-license` | `DriverService.uploadLicense()` | ✅ |
| POST | `/rider/upload-insurance` | `DriverService.uploadInsurance()` | ✅ |
| POST | `/rider/upload-profile-photo` | `DriverService.uploadProfilePhoto()` | ✅ |
| POST | `/rider/accept-terms` | `DriverService.acceptTerms()` | ✅ |
| POST | `/rider/submit-verification` | `DriverService.submitVerification()` | ✅ |
| GET | `/rider/onboarding-status` | `DriverService.getOnboardingStatus()` | ✅ |
| PUT | `/rider/status` | `DriverService.updateStatus()` | ✅ |

### Payment APIs ✅
| Method | Endpoint | Service Method | Status |
|--------|----------|----------------|--------|
| POST | `/rides/payment/setup` | `PaymentService.setupPayment()` | ✅ |
| GET | `/rides/payment/cards` | `PaymentService.getCards()` | ✅ |
| PUT | `/rides/payment/default-card` | `PaymentService.setDefaultCard()` | ✅ |
| DELETE | `/rides/payment/card/:id` | `PaymentService.removeCard()` | ✅ |

### Review APIs ✅
| Method | Endpoint | Service Method | Status |
|--------|----------|----------------|--------|
| POST | `/reviews/:bookingId/create` | `ReviewService.createReview()` | ✅ |
| GET | `/reviews/booking/:bookingId` | `ReviewService.getReviewByBooking()` | ✅ |
| GET | `/reviews/driver/:driverId/reviews` | `ReviewService.getDriverReviews()` | ✅ |
| GET | `/reviews/user/my-reviews` | `ReviewService.getMyReviews()` | ✅ |

### Chat APIs ✅
| Method | Endpoint | Service Method | Status |
|--------|----------|----------------|--------|
| POST | `/chat/send` | `ChatService.sendMessage()` | ✅ |
| GET | `/chat/messages/:rideId` | `ChatService.getMessages()` | ✅ |
| PUT | `/chat/read/:rideId` | `ChatService.markAsRead()` | ✅ |
| DELETE | `/chat/message/:messageId` | `ChatService.deleteMessage()` | ✅ |

### Admin APIs ✅
| Method | Endpoint | Service Method | Status |
|--------|----------|----------------|--------|
| POST | `/admin/login` | `AdminService.login()` | ✅ |
| GET | `/admin/profile` | `AdminService.getProfile()` | ✅ |
| GET | `/admin/dashboard-stats` | `AdminService.getDashboardStats()` | ✅ |
| PUT | `/admin/riders/approve/:id` | `AdminService.approveRider()` | ✅ |
| PUT | `/admin/riders/reject/:id` | `AdminService.rejectRider()` | ✅ |

---

## 🚨 Most Common Problems

### Problem 1: "CONFIG is not defined"
**Cause**: `config.js` not loaded or loaded after other scripts
**Fix**: Make sure `config.js` is the FIRST script tag

### Problem 2: "AuthService is not defined"
**Cause**: `auth-service.js` not included in HTML
**Fix**: Add `<script src="js/auth-service.js"></script>`

### Problem 3: "Network Error" or "Failed to fetch"
**Cause**: 
- Backend server is down
- CORS not configured
- Wrong API URL

**Fix**: 
1. Check if backend is running
2. Verify API_BASE_URL in config.js
3. Check browser console for CORS errors

### Problem 4: "401 Unauthorized"
**Cause**: Token expired or invalid
**Fix**: Login again to get new token

### Problem 5: "404 Not Found"
**Cause**: Wrong endpoint URL
**Fix**: Check API_DOCUMENTATION.md for correct endpoints

---

## 📞 Support

If APIs still not working after these checks:

1. **Share browser console errors** - Take screenshot of console (F12)
2. **Share network tab** - Show failed requests
3. **Test with curl** - Try API directly:
   ```bash
   curl http://142.93.59.204:5000/api/ride-types
   ```

---

## ✅ Quick Checklist

- [ ] Backend server is running
- [ ] All script files are included in HTML
- [ ] Scripts are in correct order (config.js first)
- [ ] No errors in browser console
- [ ] API_BASE_URL is correct in config.js
- [ ] CORS is configured on backend
- [ ] Browser allows cookies/localStorage
- [ ] No ad-blockers blocking requests

---

**Last Updated**: April 17, 2026
**API Server**: http://142.93.59.204:5000/api
**Status**: ✅ ONLINE
