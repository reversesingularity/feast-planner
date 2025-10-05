# AWS Cognito Setup Guide

## 🚀 Quick Setup (15 minutes)

### Step 1: Create AWS Account
1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Sign up for free tier (includes 50,000 active users/month for Cognito)

### Step 2: Create User Pool

1. Navigate to **AWS Cognito** service
2. Click **Create user pool**

#### Configure sign-in experience:
- ✅ Email
- ❌ Phone number (optional)
- ❌ Username (we're using email only)

#### Configure security requirements:
- Password policy: **Cognito defaults** (8 chars, upper, lower, number)
- MFA: **Optional** (or "No MFA" for MVP)
- User account recovery: **Email only**

#### Configure sign-up experience:
- Self-service sign-up: **Enabled**
- Required attributes:
  - ✅ email (verified)
  - ✅ name
- Email verification: **Send email verification code**

#### Configure message delivery:
- Email provider: **Send email with Cognito** (free tier OK)
- FROM email: Use Cognito default
- (Later: Use SES for custom domain emails)

#### Integrate your app:
- User pool name: `feast-planner-users`
- App client name: `feast-planner-web`
- ❌ Don't generate a client secret
- ✅ Enable username/password auth (ALLOW_USER_PASSWORD_AUTH)
- OAuth flows: Leave defaults

### Step 3: Get Your Credentials

After creating the pool, copy these values:

1. **User Pool ID**: 
   - Found in User Pool overview (looks like: us-east-1_abc123xyz)
   
2. **App Client ID**:
   - Go to "App integration" tab
   - Find your app client
   - Copy the Client ID (looks like: 1a2b3c4d5e6f7g8h9i0j)

3. **Region**:
   - Part of your User Pool ID (e.g., us-east-1)

### Step 4: Configure Your App

1. Create `.env.local` in project root:

```env
VITE_AWS_USER_POOL_ID=us-east-1_YourPoolID
VITE_AWS_USER_POOL_CLIENT_ID=YourAppClientID
VITE_AWS_REGION=us-east-1
```

2. **IMPORTANT**: Add to `.gitignore`:

```
.env.local
```

### Step 5: Deploy to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the same 3 variables:
   - `VITE_AWS_USER_POOL_ID`
   - `VITE_AWS_USER_POOL_CLIENT_ID`
   - `VITE_AWS_REGION`
3. Redeploy your app

---

## ✅ Testing Authentication

### Local Testing (without AWS setup):

The app will still work in "demo mode" with mock data until you configure AWS Cognito.

### With AWS Cognito:

1. **Sign Up**: Create a test account
2. **Verify Email**: Check your email for verification code
3. **Sign In**: Use your credentials
4. **Access Protected Routes**: Visit `/my-trips`

---

## 🔒 Security Best Practices

✅ **Never commit `.env.local` to Git**  
✅ **Use different User Pools for dev/staging/production**  
✅ **Enable MFA for production**  
✅ **Set up AWS SES for custom email domain**  
✅ **Monitor Cognito usage in AWS CloudWatch**

---

## 💰 Cost Estimate

- **Free Tier**: 50,000 monthly active users (MAUs)
- **After free tier**: $0.0055 per MAU
- **Example**: 1,000 users = $5.50/month

Your Feast Planner app will likely stay in free tier for years!

---

## 🆘 Troubleshooting

### "User pool not found" error:
- Check User Pool ID is correct
- Verify region matches your pool's region

### Verification email not arriving:
- Check spam folder
- Verify email in Cognito is not in "sandbox mode"
- Consider setting up AWS SES for production

### Sign in fails with valid credentials:
- Check User Pool Client ID
- Verify "ALLOW_USER_PASSWORD_AUTH" is enabled in app client settings
- Check user is confirmed (not pending verification)

---

## 📚 Next Steps

After auth is working:

1. ✅ Create AWS DynamoDB table for trips
2. ✅ Connect trips to user accounts
3. ✅ Add user profile page
4. ✅ Enable social login (Google/Facebook) - optional

---

Need help? Check the [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
