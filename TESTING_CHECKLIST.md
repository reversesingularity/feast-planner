# Testing Checklist - Feast Planner App

**Date:** October 5, 2025  
**Phase:** Pre-Production Deployment Testing

---

## **Local Testing (Development Server)**

### ✅ **1. Authentication Flow**
- [ ] Sign up with new account works
- [ ] Sign in with existing account works
- [ ] Sign out works
- [ ] Protected routes redirect to login when not authenticated
- [ ] Auth state persists across page refreshes

### ✅ **2. Trip Management (CRUD Operations)**
- [ ] **Create:** Can create new trip from `/my-trips/new`
  - [ ] All form fields save correctly (site, dates, attendees, accommodation, etc.)
  - [ ] Success toast appears
  - [ ] Redirects to trips list after creation
  - [ ] Trip appears in database (DynamoDB)
  
- [ ] **Read:** Can view trips at `/my-trips`
  - [ ] All trips load from DynamoDB
  - [ ] Loading state shows spinner
  - [ ] Empty state shows when no trips
  - [ ] Trip details display correctly
  
- [ ] **Update:** Can edit existing trip *(Not yet implemented - see Phase 2)*
  
- [ ] **Delete:** Can delete trip
  - [ ] Confirmation dialog appears
  - [ ] Trip removed from UI
  - [ ] Trip deleted from DynamoDB
  - [ ] Success toast appears

### ✅ **3. Feast Sites**
- [ ] Sites list loads at `/sites`
- [ ] Search functionality works
- [ ] Filter by location works
- [ ] Filter by organization works
- [ ] Filter by status works
- [ ] Map view loads without SSR errors
- [ ] Map shows all site markers correctly
- [ ] Clicking marker shows popup
- [ ] Bacolod site appears in list
- [ ] Bacolod appears on map at correct coordinates (10.72609, 122.96410)

### ✅ **4. Site Detail Pages**
- [ ] Daytona Beach detail page loads (`/sites/daytona-beach-fl`)
- [ ] Bacolod detail page loads (`/sites/bacolod-philippines`)
- [ ] All sections display correctly:
  - [ ] Hero image and title
  - [ ] Description and highlights
  - [ ] Services schedule
  - [ ] Weather information
  - [ ] Accommodations list
  - [ ] Dining options
  - [ ] Activities
  - [ ] Reviews
  - [ ] Cost estimates
  - [ ] Map shows correct location
  - [ ] "Plan Trip" button works

### ✅ **5. User Isolation**
- [ ] Create account #1, create some trips
- [ ] Sign out
- [ ] Create account #2, create different trips
- [ ] Verify account #2 doesn't see account #1's trips
- [ ] Sign back in to account #1
- [ ] Verify trips are still there and isolated

### ✅ **6. Error Handling**
- [ ] Network error handling (test with offline mode)
- [ ] Invalid data handling
- [ ] AWS credential expiration handling
- [ ] Form validation works
- [ ] Error toasts display correctly

---

## **Production Deployment (Vercel)**

### 🚀 **1. Pre-Deployment Setup**
- [ ] Environment variables configured in Vercel:
  - [ ] `VITE_AWS_IDENTITY_POOL_ID` = `ap-southeast-2:cf2f4878-4df1-4995-b8a9-3eeeb624d1fe`
  - [ ] `VITE_DYNAMODB_TABLE_NAME` = `feast-planner-trips-v2`
  - [ ] `VITE_AWS_REGION` = `ap-southeast-2`
  - [ ] `VITE_USER_POOL_ID` = (from .env.local)
  - [ ] `VITE_USER_POOL_CLIENT_ID` = (from .env.local)
  
- [ ] Latest code pushed to GitHub
- [ ] Vercel connected to GitHub repository
- [ ] Build settings configured (SvelteKit)

### 🚀 **2. Deployment**
- [ ] Trigger deployment (automatic on push or manual)
- [ ] Build completes successfully
- [ ] No build errors
- [ ] Production URL accessible

### 🚀 **3. Production Testing**
- [ ] **Authentication:**
  - [ ] Sign up works on production
  - [ ] Sign in works on production
  - [ ] Auth cookies persist
  
- [ ] **Trip Management:**
  - [ ] Create trip saves to DynamoDB from production
  - [ ] View trips loads from DynamoDB
  - [ ] Delete trip removes from DynamoDB
  
- [ ] **Sites:**
  - [ ] Sites list loads
  - [ ] Map loads without errors
  - [ ] Bacolod site visible
  - [ ] Detail pages load
  
- [ ] **Performance:**
  - [ ] Page load times acceptable
  - [ ] No console errors
  - [ ] SSR working correctly (view page source)
  
- [ ] **Cross-Browser Testing:**
  - [ ] Chrome/Edge
  - [ ] Firefox
  - [ ] Safari (if available)
  - [ ] Mobile browsers

### 🚀 **4. Database Verification**
- [ ] Open AWS Console → DynamoDB
- [ ] Check `feast-planner-trips-v2` table
- [ ] Verify production trips are writing correctly
- [ ] Verify userId partition key isolation
- [ ] Check item structure matches schema

---

## **Known Issues / Future Enhancements**

### ⏳ **Phase 2 Features (Post-Launch)**
- [ ] Trip update/edit functionality (UI not yet implemented)
- [ ] Trip detail page (individual trip view)
- [ ] Trip sharing with other users
- [ ] Export trip to calendar (iCal)
- [ ] Email notifications
- [ ] Mobile app (PWA improvements)

### 🐛 **Known Warnings (Non-Breaking)**
- Svelte accessibility warnings (labels) - cosmetic only
- `<svelte:component>` deprecation - will fix in Svelte 6
- Card component state reference - does not affect functionality

---

## **Sign-Off Criteria**

The app is ready for beta testing when:
- ✅ All authentication flows work in production
- ✅ Users can create and delete trips successfully
- ✅ Data persists in DynamoDB correctly
- ✅ User isolation is enforced
- ✅ No critical errors in console
- ✅ Site pages load correctly
- ✅ Map functionality works without SSR errors

---

## **Testing Notes**

### Test Accounts
- **Account 1:** (your main account)
- **Account 2:** (create for multi-user testing)

### Test Data
- Create at least 2-3 trips per account
- Test different feast sites (Daytona, Bacolod, etc.)
- Test different dates and statuses

### Performance Baseline
- Time to First Byte (TTFB): < 500ms
- First Contentful Paint (FCP): < 1.5s
- Time to Interactive (TTI): < 3s

---

**Tester:** _____________  
**Date Completed:** _____________  
**Status:** ⏳ In Progress | ✅ Passed | ❌ Failed  
**Notes:** _____________________________________________
