# Finding Your Cognito IAM Role - Step by Step 🔍

## The Problem
You're looking at AWS Service Roles, but we need a **Cognito Identity Pool** role.

---

## Solution: Find the Cognito Identity Pool First

### Step 1: Go to Cognito Identity Pools

Click this link:
👉 **https://ap-southeast-2.console.aws.amazon.com/cognito/v2/identity/identity-pools**

### Step 2: Find Your Identity Pool

You should see an Identity Pool with a name like:
- `ap-southeast-2:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- Or a custom name if you created one

**Don't see any Identity Pools?** 
- You might need to **create one first**!
- Go to: "Create identity pool"
- This is needed for users to access DynamoDB

---

## Alternative: Check if You Have an Identity Pool

### Option A: Via Cognito User Pool

1. Go to **Cognito User Pools**: https://ap-southeast-2.console.aws.amazon.com/cognito/v2/idp/user-pools
2. Click on your User Pool (the one with ID: `ap-southeast-2_ygAo9qN61`)
3. Look at the left sidebar → Click **"App integration"**
4. Scroll down to **"Identity pools"** section
5. If you see an Identity Pool linked → Click it
6. Look for **"Identity pool IAM roles"**
7. Copy the **"Authenticated role"** ARN

### Option B: Via IAM (Search Better)

Go back to IAM Roles: https://console.aws.amazon.com/iam/home#/roles

In the **search box**, try searching for:
1. `Cognito_Auth` (most common)
2. `Cognito_feastplanner`
3. `CognitoIdentity`
4. Just `Cognito`

**Tip:** The role name usually starts with `Cognito_` followed by your identity pool name.

---

## Don't Have an Identity Pool? Create One!

If you **don't have an Identity Pool**, you need to create one for users to access DynamoDB.

### Quick Create Identity Pool:

1. **Go to:** https://ap-southeast-2.console.aws.amazon.com/cognito/v2/identity/identity-pools
2. Click **"Create identity pool"**
3. **Configuration:**
   - Identity pool name: `feast-planner-identity-pool`
   - ✅ Enable access to unauthenticated identities: **NO** (unchecked)
   - ✅ Enable access to authenticated identities: **YES** (checked)
   
4. **Authentication providers:**
   - Click **"Cognito"** tab
   - User pool ID: `ap-southeast-2_ygAo9qN61` (your existing pool)
   - App client ID: `45c8arrc3ro16kdtvs40figkm3` (your existing client)

5. **Configure roles:**
   - Let AWS create new roles (default option)
   - Click **"Create pool"**

6. **After creation:**
   - AWS will auto-create an authenticated role
   - The role name will be like: `Cognito_feastplanneridentitypoolAuth_Role`
   - **Copy this role name** → Go to IAM → Find this role → Add the DynamoDB policy!

---

## Simpler Alternative: Use My Account

If this is too complicated, I can:
1. Create the Identity Pool for you (if you give me temporary AWS console access)
2. Or, we can use a different approach with API keys

**But the Identity Pool + IAM role is the most secure and recommended approach!**

---

## What to Do Next

### If you found the Cognito role:
1. Click on the role name
2. Go to **"Permissions"** tab
3. Click **"Add permissions"** → **"Create inline policy"**
4. Continue with the JSON policy from `QUICK_DYNAMODB_SETUP.md`

### If you need to create Identity Pool:
1. Follow the "Quick Create Identity Pool" section above
2. Come back and tell me: **"Identity Pool created!"**
3. Then we'll add the DynamoDB permissions

### If you're stuck:
Tell me which step you're on and I'll create a more detailed guide or we can try an alternative approach!

---

## Screenshot Reference

Based on your screenshot, I can see:
- ✅ You're in the right AWS account
- ✅ You're in the IAM Roles section
- ❌ You're looking at **AWS Service Roles** (wrong section)
- ❌ We need **Cognito Identity Pool roles** (different category)

**Next step:** Check if you have an Identity Pool using the links above! 🚀
