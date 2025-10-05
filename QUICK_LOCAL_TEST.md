# Quick Local Testing Guide

**5-Minute Sanity Check Before Production Deployment**

---

## **Test 1: Authentication (2 min)**

### Step 1: Sign Up
1. Start dev server: `npm run dev`
2. Go to: http://localhost:5173
3. Click **"Sign Up"**
4. Use test email: `test+$(date +%s)@example.com` (or any unique email)
5. Password: `TestPass123!`
6. ✅ Verify: Redirects to home page, shows "Hi [username]"

### Step 2: Sign Out
1. Click profile/user menu
2. Click **"Sign Out"**
3. ✅ Verify: Redirects to home, shows "Sign In" button

### Step 3: Sign In
1. Click **"Sign In"**
2. Enter same credentials
3. ✅ Verify: Successfully signed in

---

## **Test 2: Trip Management (2 min)**

### Step 1: Create Trip
1. Go to: http://localhost:5173/my-trips/new
2. Fill out form:
   - **Site:** Bacolod, Philippines
   - **Dates:** October 6-15, 2025
   - **Attendees:** 3
   - **Accommodation:** On-Site
   - **Transportation:** Flight
   - **Budget:** $2000-3000
   - **Notes:** "First time to Philippines!"
3. Click **"Create Trip"**
4. ✅ Verify: 
   - Success toast appears
   - Redirects to `/my-trips`
   - Trip appears in list

### Step 2: View Trips
1. On My Trips page: http://localhost:5173/my-trips
2. ✅ Verify:
   - Trip shows correct details
   - Status badge shows "Planned"
   - All fields display correctly

### Step 3: Delete Trip
1. Find the trip you just created
2. Click **"Delete"** button
3. Confirm deletion in popup
4. ✅ Verify:
   - Success toast appears
   - Trip removed from list

---

## **Test 3: Feast Sites (1 min)**

### Step 1: Sites List
1. Go to: http://localhost:5173/sites
2. ✅ Verify:
   - Page loads without errors
   - At least 10 sites visible
   - Bacolod, Philippines appears in list

### Step 2: Search & Filter
1. Type "Bacolod" in search box
2. ✅ Verify: Only Bacolod shows
3. Clear search
4. Select **Location: Philippines**
5. ✅ Verify: Only Bacolod shows
6. Clear filter

### Step 3: Map View
1. Click **"Show Map"** button
2. ✅ Verify:
   - Map loads without errors
   - No "window is not defined" error in console
   - All site markers appear
   - Bacolod marker appears at correct location (Philippines)
3. Click Bacolod marker
4. ✅ Verify: Popup shows site info

### Step 4: Site Detail
1. Click **"View Details"** on Bacolod card (or visit: http://localhost:5173/sites/bacolod-philippines)
2. ✅ Verify:
   - Page loads without errors
   - All sections display (services, accommodations, dining, activities)
   - Map shows correct location
   - Reviews display
   - Cost estimates show

---

## **Test 4: Browser Console Check (30 sec)**

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Navigate through the app:
   - Home page
   - Sites page
   - Site detail page
   - My Trips page
   - Create Trip page

✅ **Verify: No critical errors** (warnings are okay)

**Expected warnings (safe to ignore):**
- Svelte accessibility warnings about labels
- `<svelte:component>` deprecation warning
- Card component state reference warning

**Critical errors (must fix before deployment):**
- ❌ `ReferenceError: window is not defined` (SSR error)
- ❌ `Cannot read property of undefined` (data loading error)
- ❌ Network errors when fetching data
- ❌ Authentication errors

---

## **Test 5: AWS DynamoDB Verification (1 min)**

### Check Database
1. Go to AWS Console: https://console.aws.amazon.com/dynamodb
2. Select region: **ap-southeast-2** (or your region)
3. Click **Tables** → **feast-planner-trips-v2**
4. Click **"Explore table items"**

✅ **Verify:**
- Table exists
- If you created a trip, it should appear here
- Item structure looks correct (userId, tripId, siteName, etc.)

---

## **Quick Checklist Summary**

Before deploying to production, ensure:

- [x] ✅ Sign up, sign in, sign out all work
- [x] ✅ Can create trip successfully
- [x] ✅ Trip appears in My Trips list
- [x] ✅ Can delete trip successfully
- [x] ✅ Sites page loads all sites
- [x] ✅ Bacolod site appears in list
- [x] ✅ Search and filters work
- [x] ✅ Map loads without SSR errors
- [x] ✅ Bacolod detail page loads correctly
- [x] ✅ No critical console errors
- [x] ✅ DynamoDB table accessible and working

---

## **If Everything Passes ✅**

**You're ready to deploy to production!**

Follow these steps:
1. Review `.env.local` file
2. Copy environment variables
3. Go to Vercel dashboard
4. Add environment variables
5. Deploy!

See: `VERCEL_DEPLOYMENT_GUIDE.md` for detailed deployment steps.

---

## **If Issues Found ❌**

**Document the issue:**
- What page/feature
- What you expected
- What actually happened
- Console errors (screenshot)

**Common fixes:**
- Clear browser cache: `Ctrl+Shift+Delete`
- Restart dev server: `Ctrl+C`, then `npm run dev`
- Reinstall dependencies: `npm install`
- Check `.env.local` file has all variables

---

**Testing Date:** ______________  
**Tested By:** ______________  
**Status:** ✅ Passed | ❌ Failed  
**Notes:** _____________________
