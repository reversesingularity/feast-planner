# 🚀 Deploy Feast Planner to Vercel

**Quick deployment guide for your SvelteKit app**  
**Date**: October 4, 2025  
**Estimated Time**: 5-10 minutes

---

## 📋 Prerequisites

✅ GitHub account (you have this)  
✅ Code pushed to GitHub (just completed)  
✅ Vercel account (we'll create one)

---

## Step 1: Create Vercel Account (2 minutes)

### Option A: Sign Up with GitHub (Recommended)

1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. Choose your username
5. ✅ Done! You're logged in

### Option B: Sign Up with Email

1. Go to: **https://vercel.com/signup**
2. Enter your email
3. Verify your email
4. Connect GitHub account later

---

## Step 2: Import Your Project (3 minutes)

### A. From Vercel Dashboard

1. Click **"Add New..."** → **"Project"**
2. Find **"feast-planner"** in the repository list
   - If you don't see it, click **"Adjust GitHub App Permissions"**
   - Grant access to the `feast-planner` repository
3. Click **"Import"**

### B. Configure Build Settings

Vercel should auto-detect SvelteKit! You'll see:

```
Framework Preset: SvelteKit
Build Command: npm run build
Output Directory: .svelte-kit/output
Install Command: npm install
```

**✅ These are perfect - don't change them!**

### C. Environment Variables (Optional for MVP)

For now, skip this. We'll add environment variables later when we integrate:
- AWS credentials
- Cognito configuration
- API keys

### D. Deploy!

1. Click **"Deploy"**
2. Wait 1-2 minutes while Vercel:
   - Clones your repo
   - Runs `npm install`
   - Runs `npm run build`
   - Deploys to their edge network
3. 🎉 **You'll see a success screen!**

---

## Step 3: View Your Live Site! (30 seconds)

You'll get a URL like:

```
https://feast-planner.vercel.app
```

Or a random name like:

```
https://feast-planner-abc123.vercel.app
```

**Click "Visit"** to see your app live on the internet! 🌍

---

## Step 4: Test Your Deployment

### A. Test the Landing Page

Visit: `https://your-app.vercel.app/`

You should see:
- ✅ Gradient background
- ✅ "Feast Planner" heading
- ✅ Status cards
- ✅ Two buttons (now using your Svelte Button component!)

### B. Test the Button Gallery

Visit: `https://your-app.vercel.app/buttons`

You should see:
- ✅ All 12 button color variants
- ✅ Click counter working
- ✅ Outline and plain variants
- ✅ Link buttons
- ✅ Disabled states

### C. Test on Mobile

1. Open the URL on your phone
2. Test the touch-optimized buttons
3. Verify responsive design works

---

## Step 5: Custom Domain (Optional)

### Free Subdomain

Vercel gives you a free `.vercel.app` subdomain. To customize it:

1. Go to **Project Settings** → **Domains**
2. Edit the domain name
3. Example: `feast-planner.vercel.app`

### Custom Domain (Later)

When you buy a domain (e.g., `feastplanner.com`):

1. Go to **Project Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain
4. Follow DNS configuration instructions
5. Vercel automatically provisions SSL certificate

**💡 Tip**: Wait until Month 3-4 to buy a domain. Focus on building features first!

---

## ⚡ Continuous Deployment (Auto-Deployed!)

**The best part**: Every time you push to GitHub, Vercel automatically:

1. Detects the push
2. Builds your app
3. Deploys the new version
4. Updates the live site

**You never have to manually deploy again!** 🎉

### How It Works

```powershell
# On your PC or Surface Pro:
git add .
git commit -m "Add new feature"
git push

# Vercel automatically:
# - Builds: npm run build
# - Tests: (optional, we'll add later)
# - Deploys: Live in ~2 minutes
```

---

## 📊 Monitor Your Deployment

### A. Deployment Dashboard

1. Go to: **https://vercel.com/dashboard**
2. Click on **"feast-planner"**
3. See:
   - 📊 **Analytics** (page views, visitors)
   - 🚀 **Deployments** (history of all deploys)
   - ⚙️ **Settings** (environment variables, domains)
   - 📈 **Speed Insights** (performance metrics)

### B. View Deployment Logs

1. Click any deployment
2. See the build logs
3. Debug any issues

---

## 🎯 Deployment Checklist

### MVP Deployment (Today)
- [x] GitHub repository created
- [x] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] First deployment successful
- [ ] Landing page accessible
- [ ] Button gallery accessible
- [ ] URL shared (optional)

### Future Deployments (Month 1+)
- [ ] Custom domain configured
- [ ] Environment variables for AWS
- [ ] Preview deployments for PRs
- [ ] Performance monitoring enabled
- [ ] Error tracking (Sentry) integrated

---

## 🆘 Troubleshooting

### Issue: "Build Failed"

**Check the build logs:**
1. Click the failed deployment
2. Look for errors in the logs
3. Common issues:
   - TypeScript errors → Fix in VS Code
   - Missing dependencies → Check `package.json`
   - Import errors → Verify file paths

**Fix and redeploy:**
```powershell
# Fix the error locally
npm run build  # Test locally

# Push the fix
git add .
git commit -m "Fix build error"
git push  # Auto-deploys to Vercel
```

### Issue: "Page Not Found (404)"

**Check route structure:**
- Landing page: `src/routes/+page.svelte` ✅
- Button gallery: `src/routes/buttons/+page.svelte` ✅

**Verify locally first:**
```powershell
npm run dev
# Visit http://localhost:5173
# If it works locally, it will work on Vercel
```

### Issue: "Import Failed"

**Check import paths:**
```typescript
// ✅ Correct (uses $lib alias)
import Button from '$lib/components/Button.svelte';

// ❌ Wrong (relative paths can break)
import Button from '../lib/components/Button.svelte';
```

### Issue: "Environment Variable Not Found"

**Add in Vercel dashboard:**
1. Go to **Project Settings** → **Environment Variables**
2. Add the variable
3. Trigger a redeploy

---

## 🎨 Preview Deployments

Every pull request gets its own preview URL!

### How It Works

1. Create a new branch:
   ```powershell
   git checkout -b feature/new-component
   ```

2. Make changes and push:
   ```powershell
   git add .
   git commit -m "Add new component"
   git push -u origin feature/new-component
   ```

3. Create a PR on GitHub

4. Vercel automatically:
   - Builds the PR
   - Creates a preview URL
   - Comments on the PR with the link

5. Share the preview URL with others for feedback!

---

## 📱 Mobile Preview

### Using Vercel Mobile App (Optional)

1. Download **Vercel app** on your phone
2. Log in with the same account
3. See all deployments
4. Open any deployment on your phone
5. Test mobile experience

---

## 🚀 Next Steps After Deployment

### Week 1: Core Features
- [ ] Add authentication UI (Cognito)
- [ ] Create dashboard page
- [ ] Build user profile page

### Month 1: Backend Integration
- [ ] Set up AWS Lambda functions
- [ ] Configure DynamoDB tables
- [ ] Connect Cognito to Vercel

### Month 2: Features
- [ ] Add site search component
- [ ] Build trip planning interface
- [ ] Create budget tracker

---

## 💡 Pro Tips

### 1. Use Preview URLs for Testing

```powershell
# Create feature branch
git checkout -b feature/site-search

# Develop and push
git push -u origin feature/site-search

# Get preview URL from Vercel
# Test before merging to main
```

### 2. Monitor Performance

Vercel gives you free analytics:
- **Core Web Vitals** (LCP, FID, CLS)
- **Page load times**
- **Visitor geography**

Access: **Project → Analytics**

### 3. Enable Speed Insights

```powershell
# Install Vercel Analytics
npm install @vercel/analytics

# Add to layout
# src/routes/+layout.svelte
```

We'll add this in Month 2!

### 4. Set Up Error Tracking

When ready, integrate Sentry:
- Catches runtime errors
- Tracks user sessions
- Shows stack traces
- Free tier available

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ URL loads without errors  
✅ Landing page displays correctly  
✅ Button gallery shows all variants  
✅ Buttons are clickable and interactive  
✅ Mobile responsive design works  
✅ Future pushes auto-deploy  

---

## 📊 Deployment Metrics

After first deployment, you'll see:

- **Build time**: ~1-2 minutes
- **Deploy time**: ~30 seconds
- **Total time**: ~2-3 minutes from push to live

**Global edge network**:
- Your app is deployed to 100+ cities worldwide
- Users get the fastest possible load times
- Automatic HTTPS/SSL

---

## 🔗 Important Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Deployment Docs**: https://vercel.com/docs/deployments
- **SvelteKit on Vercel**: https://vercel.com/docs/frameworks/sveltekit
- **Your Repo**: https://github.com/reversesingularity/feast-planner

---

**Ready to deploy? Let's go! 🚀**

**Time investment**: 10 minutes now → Automatic deploys forever!
