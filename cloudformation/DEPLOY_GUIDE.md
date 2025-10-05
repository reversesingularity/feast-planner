# 🚀 One-Click CloudFormation Deployment

## What This Does

This CloudFormation template automatically creates:
1. ✅ **DynamoDB Table** (`feast-planner-trips`)
2. ✅ **Cognito Identity Pool** (for AWS resource access)
3. ✅ **IAM Role** with proper DynamoDB permissions
4. ✅ **Security settings** (user isolation, encryption)

**Total time: 2-3 minutes!** ⚡

---

## Step 1: Deploy the Stack

### Option A: AWS Console (Easiest)

1. **Click this link** (opens CloudFormation in Sydney):
   👉 https://ap-southeast-2.console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/template

2. **Select "Upload a template file"**
   - Click **"Choose file"**
   - Select: `cloudformation/feast-planner-infrastructure.yaml` (from your project)
   - Click **"Next"**

3. **Stack details:**
   - **Stack name:** `feast-planner-infrastructure`
   - **Parameters:** (all pre-filled, just verify)
     - UserPoolId: `ap-southeast-2_ygAo9qN61` ✅
     - UserPoolClientId: `45c8arrc3ro16kdtvs40figkm3` ✅
     - DynamoDBTableName: `feast-planner-trips` ✅
   - Click **"Next"**

4. **Configure stack options:**
   - Leave everything as default
   - Click **"Next"**

5. **Review:**
   - Scroll to bottom
   - ✅ Check the box: **"I acknowledge that AWS CloudFormation might create IAM resources"**
   - Click **"Submit"**

6. **Wait for completion** (2-3 minutes)
   - Status will change: `CREATE_IN_PROGRESS` → `CREATE_COMPLETE`
   - ✅ Done!

### Option B: AWS CLI (For Advanced Users)

If you have AWS CLI configured:

```bash
aws cloudformation create-stack \
  --stack-name feast-planner-infrastructure \
  --template-body file://cloudformation/feast-planner-infrastructure.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --region ap-southeast-2
```

---

## Step 2: Get the Output Values

1. **In CloudFormation console**, click on your stack: `feast-planner-infrastructure`
2. Click the **"Outputs"** tab
3. You'll see 4 important values:

| Key | Value | Where to Use |
|-----|-------|--------------|
| `IdentityPoolId` | `ap-southeast-2:xxx-xxx-xxx` | `.env.local` |
| `DynamoDBTableName` | `feast-planner-trips` | `.env.local` |
| `Region` | `ap-southeast-2` | `.env.local` |
| `AuthRoleArn` | `arn:aws:iam::...` | (Reference only) |

**Copy the `IdentityPoolId` value** - you'll need it next!

---

## Step 3: Update Environment Variables

I'll update your `.env.local` file automatically once you give me the Identity Pool ID!

**Or do it manually:**

Add this line to your `.env.local`:
```env
VITE_AWS_IDENTITY_POOL_ID=ap-southeast-2:YOUR-IDENTITY-POOL-ID
```

(Replace `YOUR-IDENTITY-POOL-ID` with the value from Step 2)

---

## Step 4: Update Amplify Configuration

I'll update the `amplify.ts` file to use the Identity Pool.

---

## Step 5: Deploy to Vercel

Add the Identity Pool ID to Vercel environment variables:
- Variable: `VITE_AWS_IDENTITY_POOL_ID`
- Value: (from Step 2)

---

## What Gets Created

### 1. DynamoDB Table
```
Name: feast-planner-trips
Keys: userId (partition), tripId (sort)
Billing: On-demand (pay per use)
Encryption: Enabled
Backup: Point-in-time recovery enabled
```

### 2. Identity Pool
```
Name: feast-planner-identity-pool
Type: Cognito-based authentication only
Unauthenticated access: Disabled
```

### 3. IAM Role
```
Name: FeastPlanner-Cognito-AuthRole
Permissions:
  - DynamoDB: PutItem, GetItem, UpdateItem, DeleteItem, Query
  - Condition: Users can only access their own data (userId isolation)
```

---

## Verification

### After deployment, verify:

1. **DynamoDB Table exists:**
   - Go to: https://ap-southeast-2.console.aws.amazon.com/dynamodbv2/home?region=ap-southeast-2#tables
   - You should see `feast-planner-trips` with status "Active"

2. **Identity Pool exists:**
   - Go to: https://ap-southeast-2.console.aws.amazon.com/cognito/v2/identity/identity-pools
   - You should see `feast-planner-identity-pool`

3. **IAM Role exists:**
   - Go to: https://console.aws.amazon.com/iam/home#/roles
   - Search for: `FeastPlanner-Cognito-AuthRole`
   - Check it has the DynamoDB policy attached

✅ All good? You're ready to continue!

---

## Cost Estimate

**What you're deploying:**
- DynamoDB table (on-demand): ~$0.50-$1/month
- Identity Pool: FREE
- IAM Role: FREE

**Total: ~$0.50-$1.00/month** (likely FREE for first year with AWS Free Tier)

---

## Troubleshooting

### Error: "Stack already exists"
- The stack name is already in use
- Either delete the old stack or use a different name

### Error: "User Pool ID not found"
- Verify the User Pool ID is correct: `ap-southeast-2_ygAo9qN61`
- Make sure you're in the Sydney (ap-southeast-2) region

### Error: "Insufficient permissions"
- Your AWS account needs permissions to create:
  - DynamoDB tables
  - Cognito Identity Pools
  - IAM roles
- Ask your AWS administrator for CloudFormation deployment permissions

### Stack creation failed
1. Go to CloudFormation console
2. Click on the stack
3. Click "Events" tab
4. Look for the red "CREATE_FAILED" event
5. Read the error message
6. Tell me the error and I'll help fix it!

---

## Delete Everything (If Needed)

To remove all resources created by this template:

1. Go to CloudFormation console
2. Select the stack: `feast-planner-infrastructure`
3. Click **"Delete"**
4. Confirm deletion

Everything will be cleaned up automatically! (Except the User Pool - that's separate)

---

## Ready?

### Next Steps:

1. **Deploy the CloudFormation stack** (use the console link above)
2. **Wait for CREATE_COMPLETE** (~2-3 minutes)
3. **Copy the Identity Pool ID** from Outputs
4. **Tell me:** "Stack deployed! Identity Pool ID is: ap-southeast-2:xxx-xxx-xxx"
5. **I'll update your code** to use the new Identity Pool

Let's do this! 🚀
