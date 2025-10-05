# 🚀 Vercel Deployment Guide - Feast Planner

**Quick deployment guide for deploying the Feast Planner app to Vercel**

---

## **Prerequisites**

✅ GitHub account  
✅ Vercel account (free tier works)  
✅ AWS Infrastructure deployed (DynamoDB, Cognito Identity Pool)  
✅ Code pushed to GitHub repository

---

## **Step 1: Connect Repository to Vercel**

### Option A: First-Time Setup

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub account and find **`feast-planner`** repository
5. Click **"Import"**

### Option B: Already Connected

If the repository is already connected, skip to Step 2.

---

## **Step 2: Configure Build Settings**

Vercel should auto-detect SvelteKit. Verify these settings:

- **Framework Preset:** SvelteKit
- **Build Command:** `npm run build` (or `vite build`)
- **Output Directory:** `.svelte-kit` (auto-detected)
- **Install Command:** `npm install`
- **Node Version:** 18.x or later

✅ **Leave these as defaults unless you have custom requirements**

---

## **Step 3: Add Environment Variables** ⚠️ CRITICAL

Before deploying, add these environment variables in Vercel:

### 3.1 Go to Project Settings

1. In Vercel dashboard, select your project
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in left sidebar

### 3.2 Add These Variables

Copy the values from your local `.env.local` file:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `VITE_AWS_REGION` | Your AWS region | `ap-southeast-2` |
| `VITE_AWS_IDENTITY_POOL_ID` | Cognito Identity Pool ID | `ap-southeast-2:cf2f4878-4df1-4995-b8a9-3eeeb624d1fe` |
| `VITE_DYNAMODB_TABLE_NAME` | DynamoDB table name | `feast-planner-trips-v2` |
| `VITE_USER_POOL_ID` | Cognito User Pool ID | `ap-southeast-2_xxxxxxxxx` |
| `VITE_USER_POOL_CLIENT_ID` | Cognito User Pool Client ID | `xxxxxxxxxxxxxxxxxxxxxxxxxx` |

### 3.3 Get Your Values

**From CloudFormation (if you used the template):**
```bash
# In AWS Console → CloudFormation → Stacks → feast-planner-infrastructure → Outputs
- IdentityPoolId: ap-southeast-2:cf2f4878-4df1-4995-b8a9-3eeeb624d1fe
- DynamoDBTableName: feast-planner-trips-v2
- Region: ap-southeast-2
```

**From your local `.env.local` file:**
```bash
# Open: f:\Projects\feast-planner\.env.local
cat .env.local
```

### 3.4 Set Environment Scope

For each variable:
- ✅ Check **Production**
- ✅ Check **Preview** (optional, for testing)
- ✅ Check **Development** (optional, for local Vercel dev)

Click **"Add"** for each variable.

---

## **Step 4: Deploy**

### Option A: Automatic Deployment (Recommended)

1. Push your code to GitHub:
   ```bash
   git add -A
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. Vercel automatically detects the push and starts building

3. Wait 2-3 minutes for build to complete

4. You'll see: ✅ **"Deployment Ready"**

### Option B: Manual Deployment

1. In Vercel dashboard, go to **"Deployments"** tab
2. Click **"Redeploy"** on the latest deployment
3. Confirm and wait for build

---

## **Step 5: Verify Deployment**

### 5.1 Check Build Logs

1. Click on the deployment in Vercel dashboard
2. Review build logs for errors
3. Ensure no warnings about missing environment variables

### 5.2 Visit Production URL

Your app will be available at:
```
https://feast-planner.vercel.app
```
Or a custom domain if configured.

### 5.3 Test Core Features

**Quick smoke test:**

1. ✅ Home page loads
2. ✅ Sign up creates account (test with temp email)
3. ✅ Sign in works
4. ✅ Create trip saves to DynamoDB
5. ✅ My Trips page shows created trip
6. ✅ Delete trip removes from database
7. ✅ Sites page loads
8. ✅ Map loads without errors
9. ✅ Bacolod site visible

---

## **Step 6: Verify Database (AWS Console)**

### 6.1 Check DynamoDB

1. Go to AWS Console → DynamoDB
2. Select region: **ap-southeast-2** (or your region)
3. Click **Tables** → **feast-planner-trips-v2**
4. Click **"Explore table items"**
5. Verify you see trips created from production

### 6.2 Verify Item Structure

Each trip should have:
- `userId` (partition key)
- `tripId` (sort key)
- `siteName`, `siteSlug`, `location`, `organization`, `dates`
- `status`, `createdAt`, `updatedAt`
- Optional fields: `attendees`, `accommodationType`, `transportationMode`, `budgetRange`, `notes`

---

## **Step 7: Custom Domain (Optional)**

### 7.1 Add Domain

1. In Vercel project settings, go to **"Domains"**
2. Click **"Add"**
3. Enter your domain (e.g., `feastplanner.com`)
4. Follow DNS configuration instructions

### 7.2 Update DNS

Add these records to your domain provider:

**For root domain (feastplanner.com):**
```
A     @     76.76.21.21
```

**For www subdomain (www.feastplanner.com):**
```
CNAME www   cname.vercel-dns.com
```

### 7.3 Wait for Propagation

- DNS changes take 1-24 hours
- Vercel auto-provisions SSL certificate
- HTTPS enabled automatically

---

## **Troubleshooting**

### Build Fails

**Problem:** Build fails with "Cannot find module"
```
Solution: Check package.json dependencies are correct
Run locally: npm install && npm run build
```

**Problem:** Environment variables not found
```
Solution: 
1. Go to Vercel Settings → Environment Variables
2. Verify all 5 variables are added
3. Click "Redeploy" to trigger new build
```

### Authentication Doesn't Work

**Problem:** "User pool not configured" error
```
Solution: 
1. Check VITE_USER_POOL_ID and VITE_USER_POOL_CLIENT_ID are correct
2. Verify you copied the full values (no truncation)
3. Redeploy after adding variables
```

**Problem:** "IdentityPoolId is required" error
```
Solution:
1. Verify VITE_AWS_IDENTITY_POOL_ID is set
2. Format: ap-southeast-2:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
3. Get from CloudFormation stack outputs
```

### Database Writes Fail

**Problem:** Trips don't save to DynamoDB
```
Solution:
1. Check AWS Console → CloudFormation → feast-planner-infrastructure → Status
2. Ensure stack is CREATE_COMPLETE
3. Verify IAM role "FeastPlanner-Cognito-AuthRole" exists
4. Check role has DynamoDB permissions
```

**Problem:** "AccessDeniedException" in console
```
Solution:
1. Check Cognito Identity Pool authenticated role
2. Verify IAM policy allows dynamodb:PutItem, GetItem, Query, DeleteItem
3. Confirm table name matches environment variable
```

### Map Not Loading

**Problem:** Map shows blank or SSR error
```
Solution:
1. Check browser console for errors
2. Verify Leaflet imports are dynamic (inside onMount)
3. Check MultiSiteMap is imported conditionally
4. Clear browser cache and hard reload (Ctrl+Shift+R)
```

---

## **Performance Optimization**

### Enable Edge Functions (Optional)

1. In `svelte.config.js`, add:
   ```javascript
   export default {
     kit: {
       adapter: adapter({
         edge: true  // Deploy to Vercel Edge Network
       })
     }
   };
   ```

2. Redeploy for global CDN distribution

### Enable Caching

Vercel automatically caches static assets. For API routes, add cache headers if needed.

---

## **Monitoring & Analytics**

### Vercel Analytics (Free)

1. In project settings, enable **"Analytics"**
2. View real-time visitor data
3. Track Web Vitals (LCP, FID, CLS)

### Vercel Speed Insights

1. Enable **"Speed Insights"**
2. Get real user performance metrics
3. Identify slow pages

---

## **Next Steps After Deployment**

1. ✅ Test all features thoroughly
2. ✅ Invite beta testers
3. ✅ Monitor error logs in Vercel dashboard
4. ✅ Set up alerting (Vercel Notifications)
5. ✅ Configure custom domain (if desired)
6. ✅ Share production URL with users

---

## **Production Checklist**

Before going live:

- [ ] All environment variables configured
- [ ] Test authentication (sign up, sign in, sign out)
- [ ] Test trip CRUD (create, read, delete)
- [ ] Test multi-user isolation
- [ ] Verify DynamoDB writes from production
- [ ] Test on multiple devices (desktop, mobile, tablet)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] No console errors on production site
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Error monitoring set up

---

## **Support Resources**

- **Vercel Documentation:** https://vercel.com/docs
- **SvelteKit Deployment:** https://kit.svelte.dev/docs/adapter-vercel
- **AWS Cognito Docs:** https://docs.aws.amazon.com/cognito/
- **DynamoDB Docs:** https://docs.aws.amazon.com/dynamodb/

---

**Deployment Date:** ______________  
**Production URL:** ______________  
**Deployed By:** ______________  
**Status:** ✅ Live | ⏳ In Progress | ❌ Failed

---

🎉 **Congratulations! Your Feast Planner app is now live!**
