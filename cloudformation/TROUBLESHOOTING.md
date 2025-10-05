# 🔧 CloudFormation Deployment Failed - Fix Guide

## What Happened

Your CloudFormation stack deployment **failed** with status: `ROLLBACK_COMPLETE`

**Error:** 
```
Resource of type 'AWS::DynamoDB::Table' with identifier 'feast-planner-trips' 
already exists.
```

## Why This Happened

You (or AWS) already created a DynamoDB table named `feast-planner-trips`. CloudFormation can't create a resource that already exists, so it rolled back all changes.

---

## ✅ Solution: Choose One Option

### Option 1: Delete Existing Table & Redeploy (Recommended)

**Step 1: Delete the existing DynamoDB table**

1. Go to DynamoDB: https://ap-southeast-2.console.aws.amazon.com/dynamodbv2/home?region=ap-southeast-2#tables
2. Find table: `feast-planner-trips`
3. Select it (checkbox)
4. Click "Delete"
5. Type "delete" to confirm
6. Click "Delete table"

**Step 2: Delete the failed CloudFormation stack**

1. Go to CloudFormation: https://ap-southeast-2.console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks
2. Select: `feast-planner-infrastructure`
3. Click "Delete"
4. Confirm deletion

**Step 3: Re-deploy the stack**

1. Go to: https://ap-southeast-2.console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/template
2. Upload `feast-planner-infrastructure.yaml` again
3. Follow the same deployment steps
4. ✅ Should work now!

---

### Option 2: Use the Updated Template (Faster)

I've already updated your template to use a new table name: `feast-planner-trips-v2`

**Step 1: Delete the failed stack**

1. Go to CloudFormation: https://ap-southeast-2.console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks
2. Select: `feast-planner-infrastructure`
3. Click "Delete"
4. Wait for deletion to complete

**Step 2: Deploy with new table name**

1. The template now uses: `feast-planner-trips-v2` (won't conflict!)
2. Upload the **updated** template
3. Deploy as normal
4. ✅ Will create a fresh table with no conflicts

**Step 3: Update .env.local**

Already done! I've updated:
```env
VITE_DYNAMODB_TABLE_NAME=feast-planner-trips-v2
```

---

## 🎯 Recommended: Option 2

Option 2 is **faster** because:
- ✅ No need to delete the old table
- ✅ Uses a new table name (`feast-planner-trips-v2`)
- ✅ No conflicts
- ✅ Can deploy immediately

---

## Step-by-Step: Option 2 (Do This!)

### 1. Delete the Failed Stack

1. **Go to CloudFormation:**
   👉 https://ap-southeast-2.console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks

2. **Select your stack:** `feast-planner-infrastructure`

3. **Click "Delete"** button (top right)

4. **Confirm deletion**

5. **Wait ~1 minute** for status to change to: (stack disappears from list)

### 2. Commit the Updated Template

Run in terminal:
```powershell
git add .
git commit -m "fix: Change DynamoDB table name to avoid conflict"
git push origin main
```

### 3. Re-Deploy with Updated Template

1. **Go to create stack:**
   👉 https://ap-southeast-2.console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/template

2. **Upload template file:**
   - Click "Upload a template file"
   - Choose: `cloudformation/feast-planner-infrastructure.yaml` (the updated one)
   - Click "Next"

3. **Stack name:** `feast-planner-infrastructure`

4. **Parameters:** (notice the new table name!)
   - DynamoDBTableName: `feast-planner-trips-v2` ✅ (new!)
   - UserPoolId: `ap-southeast-2_ygAo9qN61` ✅
   - UserPoolClientId: `45c8arrc3ro16kdtvs40figkm3` ✅

5. **Click "Next"** (twice)

6. **✅ Check:** "I acknowledge that AWS CloudFormation might create IAM resources"

7. **Click "Submit"**

8. **Wait ~2-3 minutes** for: `CREATE_COMPLETE` ✅

### 4. Get the Identity Pool ID

1. **Click "Outputs" tab**
2. **Copy:** `IdentityPoolId` value
3. **Tell me:** "Stack deployed! Identity Pool ID is: [paste ID]"

---

## 🔍 Verify the Fix

After re-deployment, verify:

1. **Stack Status:** `CREATE_COMPLETE` ✅
2. **DynamoDB Table:** `feast-planner-trips-v2` exists
3. **Identity Pool:** `feast-planner-identity-pool` exists
4. **IAM Role:** `FeastPlanner-Cognito-AuthRole` exists

All should be green! 🎉

---

## 📊 What's Different Now

**Old table name:** `feast-planner-trips` (already exists - conflict!)
**New table name:** `feast-planner-trips-v2` (fresh - no conflict!)

Your app will use the new table name automatically (I updated `.env.local`).

---

## 🆘 Still Having Issues?

If you get another error:
1. Screenshot the error from CloudFormation Events tab
2. Tell me what the error says
3. I'll help you fix it immediately!

---

## ✅ Next Steps After Successful Deployment

Once you see `CREATE_COMPLETE`:
1. Get the Identity Pool ID from Outputs
2. Tell me the ID
3. I'll update your code to use it
4. We'll continue with the database service layer!

---

**Ready?** Delete the failed stack and re-deploy with the updated template! 🚀
