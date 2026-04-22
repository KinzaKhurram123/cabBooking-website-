# Stripe Connect Setup Guide

Complete guide for setting up Stripe Connect for driver payouts in RideLynk.

---

## Prerequisites

- Stripe account (test mode for development)
- Backend API running
- Admin access to Stripe Dashboard

---

## Step 1: Enable Stripe Connect in Stripe Dashboard

### 1.1 Access Stripe Connect

1. Log in to your Stripe Dashboard: https://dashboard.stripe.com
2. Switch to **Test Mode** (toggle in top right)
3. Navigate to **Connect** → **Get Started**

### 1.2 Enable Connect

1. Click **"Get started with Connect"**
2. Choose **Express** as your platform type
3. Complete the platform profile:
   - Platform name: RideLynk
   - Platform description: Ride-sharing platform
   - Support email: your-support@email.com
   - Platform website: your-website.com

### 1.3 Get Client ID

1. Go to **Connect** → **Settings**
2. Under **Integration**, find your **Client ID**
3. Copy the Client ID (starts with `ca_`)
4. Update `js/config.js`:
   ```javascript
   STRIPE_CONNECT_CLIENT_ID: "ca_YOUR_CLIENT_ID_HERE"
   ```

### 1.4 Configure OAuth Redirect URLs

1. In **Connect** → **Settings** → **Integration**
2. Under **Redirects**, click **"Add redirect URI"**
3. Add these URLs:

   **For Development:**
   ```
   http://localhost:5000/api/stripe-connect/return
   http://localhost:5000/api/stripe-connect/refresh
   ```

   **For Production:**
   ```
   https://yourdomain.com/api/stripe-connect/return
   https://yourdomain.com/api/stripe-connect/refresh
   ```

4. Click **Save changes**

---

## Step 2: Configure Stripe Connect Webhooks

### 2.1 For Local Development (Using Stripe CLI)

#### Install Stripe CLI

**Windows:**
```bash
scoop install stripe
```

**Mac:**
```bash
brew install stripe/stripe-cli/stripe
```

**Linux:**
Download from: https://github.com/stripe/stripe-cli/releases

#### Setup Webhook Forwarding

1. Login to Stripe CLI:
   ```bash
   stripe login
   ```

2. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:5000/api/webhook/stripe-webhook
   ```

3. Copy the webhook signing secret (starts with `whsec_`)
4. The backend should have this in `.env`:
   ```
   STRIPE_CONNECT_WEBHOOK_SECRET=whsec_xxxxx
   ```

5. Keep the Stripe CLI running while testing

### 2.2 For Production

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **"Add endpoint"**
3. Enter endpoint URL:
   ```
   https://yourdomain.com/api/webhook/stripe-webhook
   ```

4. Select these events:
   - `account.updated`
   - `account.application.deauthorized`
   - `payout.paid`
   - `payout.failed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`

5. Click **Add endpoint**
6. Copy the **Signing secret**
7. Update backend `.env`:
   ```
   STRIPE_CONNECT_WEBHOOK_SECRET=whsec_xxxxx
   ```

---

## Step 3: Test the Complete Flow

### 3.1 Driver Registration & Onboarding

1. **Register as a driver:**
   - Go to driver registration page
   - Complete the registration form
   - Verify email if required

2. **Complete driver onboarding:**
   - Upload required documents
   - Add vehicle information
   - Complete profile setup

3. **Access driver dashboard:**
   - Login as the driver
   - Navigate to dashboard

### 3.2 Setup Payment Account

1. **Check Connect status banner:**
   - Should see "Payment Account Not Set Up" banner
   - Click **"Setup Payment Account"** button

2. **Complete Stripe onboarding:**
   - You'll be redirected to Stripe Connect onboarding
   - Fill in business/individual information:
     - Business type: Individual
     - Personal details (name, DOB, address)
     - SSN or Tax ID
     - Bank account details
   - Accept Stripe Terms of Service

3. **Return to RideLynk:**
   - After completing onboarding, you'll be redirected back
   - Status should update to "Active" or "Pending Verification"

### 3.3 Test Ride Acceptance

1. **Create a test ride booking:**
   - Login as a user/rider
   - Book a ride
   - Note the booking ID

2. **Accept ride as driver:**
   - Login as driver
   - View pending ride requests
   - Try to accept the ride
   - Should succeed if Connect account is active
   - Should show error if Connect not set up

3. **Complete the ride:**
   - Mark as "On the way"
   - Mark as "Arrived"
   - Mark as "Completed"

### 3.4 Verify Payment Transfer

1. **Check Stripe Dashboard:**
   - Go to **Connect** → **Accounts**
   - Find the driver's Connect account
   - Verify account is enabled

2. **Check Transfers:**
   - Go to **Connect** → **Transfers**
   - Should see transfer to driver's account (80% of fare)
   - Platform keeps 20% as commission

3. **Check Driver Earnings:**
   - Login as driver
   - Go to **My Earnings** page
   - Verify earnings are updated
   - Check payment history

### 3.5 Test Admin Panel

1. **Access admin panel:**
   - Login as admin
   - Navigate to **Stripe Connect Management**

2. **Verify driver list:**
   - Should see all drivers with Connect status
   - Filter by status (Active, Pending, Not Started)
   - Search for specific drivers

3. **Generate onboarding link:**
   - Select a driver without Connect account
   - Click **"Generate Link"**
   - Share link with driver for onboarding

---

## Step 4: Production Deployment Checklist

### 4.1 Switch to Live Mode

1. **Get live Stripe keys:**
   - Go to Stripe Dashboard (Live mode)
   - Navigate to **Developers** → **API keys**
   - Copy **Publishable key** and **Secret key**

2. **Update frontend config:**
   ```javascript
   // js/config.js
   STRIPE_PUBLIC_KEY: "pk_live_xxxxx"
   STRIPE_CONNECT_CLIENT_ID: "ca_xxxxx" // Live mode Client ID
   ```

3. **Update backend environment:**
   ```env
   STRIPE_SECRET_KEY=sk_live_xxxxx
   STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   STRIPE_CONNECT_CLIENT_ID=ca_xxxxx
   STRIPE_CONNECT_WEBHOOK_SECRET=whsec_xxxxx
   ```

### 4.2 Update OAuth URLs

1. Go to **Connect** → **Settings** (Live mode)
2. Update redirect URIs to production URLs:
   ```
   https://yourdomain.com/api/stripe-connect/return
   https://yourdomain.com/api/stripe-connect/refresh
   ```

### 4.3 Configure Production Webhook

1. Add webhook endpoint in Live mode
2. Use production URL
3. Select all required events
4. Update webhook secret in backend

### 4.4 Security Checklist

- [ ] All API keys are in environment variables (not hardcoded)
- [ ] Webhook signature verification is enabled
- [ ] HTTPS is enabled on production domain
- [ ] OAuth redirect URLs are whitelisted
- [ ] Rate limiting is configured
- [ ] Error logging is set up
- [ ] Monitoring alerts are configured

### 4.5 Testing in Production

1. **Create test driver account:**
   - Use real email address
   - Complete onboarding with test bank account

2. **Process test transaction:**
   - Book a test ride
   - Accept and complete as driver
   - Verify transfer in Stripe Dashboard

3. **Monitor for 24 hours:**
   - Check webhook delivery
   - Monitor error logs
   - Verify payout schedule

### 4.6 Go-Live Checklist

- [ ] All drivers notified about new payout system
- [ ] Support team trained on Connect issues
- [ ] Documentation updated
- [ ] Rollback plan prepared
- [ ] Monitoring dashboards set up
- [ ] First payout date communicated
- [ ] FAQ page updated

---

## Troubleshooting

### Issue: "Connect account not set up" error

**Solution:**
- Driver needs to complete Stripe Connect onboarding
- Generate onboarding link from admin panel
- Share link with driver

### Issue: "Payment account not enabled"

**Solution:**
- Check account status in admin panel
- If requirements pending, driver needs to provide more info
- Generate refresh link for driver

### Issue: Webhook not receiving events

**Solution:**
- Verify webhook endpoint is accessible
- Check webhook signing secret is correct
- For local testing, ensure Stripe CLI is running
- Check webhook logs in Stripe Dashboard

### Issue: Transfer not appearing

**Solution:**
- Check ride was completed successfully
- Verify payment was captured
- Check Stripe Dashboard → Connect → Transfers
- Verify driver's Connect account is enabled

### Issue: Onboarding link expired

**Solution:**
- Links expire after 5 minutes
- Generate new link from admin panel
- Driver should complete onboarding immediately

---

## Support Resources

- **Stripe Connect Docs:** https://stripe.com/docs/connect
- **Stripe Express Accounts:** https://stripe.com/docs/connect/express-accounts
- **Webhook Events:** https://stripe.com/docs/api/events/types
- **Testing Guide:** https://stripe.com/docs/connect/testing

---

## Monitoring & Alerts

### Key Metrics to Monitor

1. **Connect Account Creation Rate**
   - Track how many drivers complete onboarding
   - Monitor drop-off points

2. **Failed Payouts**
   - Set up alerts for failed transfers
   - Monitor payout.failed webhook events

3. **Webhook Delivery**
   - Monitor webhook success rate
   - Alert on delivery failures

4. **Account Verification Time**
   - Track time from onboarding to account enabled
   - Identify verification bottlenecks

### Recommended Alerts

- Failed payout (immediate)
- Webhook delivery failure (after 3 retries)
- Connect account disabled (immediate)
- High verification rejection rate (daily)

---

## Next Steps

After completing setup:

1. Train support team on Connect issues
2. Create driver FAQ about payouts
3. Set up monitoring dashboards
4. Schedule first payout cycle
5. Communicate changes to existing drivers
6. Monitor first week closely

---

**Setup Complete! 🎉**

Drivers can now receive automatic payouts via Stripe Connect.
