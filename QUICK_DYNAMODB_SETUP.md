# Quick DynamoDB Setup - 5 Minutes! ⚡

## Step 1: Create the DynamoDB Table (2 min)

1. **Open AWS Console**
   - Go to: https://ap-southeast-2.console.aws.amazon.com/dynamodbv2/home?region=ap-southeast-2#tables
   - (This opens directly to DynamoDB in Sydney region)

2. **Click "Create table"** (orange button, top right)

3. **Enter Table Settings:**
   - **Table name:** `feast-planner-trips`
   - **Partition key:** `userId` (leave as String)
   - **Sort key - optional:** ✅ Check this box
     - Enter: `tripId` (leave as String)

4. **Table Settings:**
   - Leave everything as default
   - Scroll down and click **"Create table"** (orange button)

5. **Wait 30 seconds**
   - Table status will change from "Creating" → "Active"
   - ✅ Done!

---

## Step 2: Get Your Table ARN (1 min)

1. Click on your new table name: `feast-planner-trips`
2. Look for **"Amazon Resource Name (ARN)"**
3. Copy it - looks like: `arn:aws:dynamodb:ap-southeast-2:123456789012:table/feast-planner-trips`
4. Save this - you'll need it for the next step!

---

## Step 3: Configure IAM Permissions (2 min)

### Find Your Cognito IAM Role

1. Go to IAM Console: https://console.aws.amazon.com/iam/home#/roles
2. Search for: `Cognito_feastplanner` (or similar - it contains your User Pool name)
3. Click on the role name
4. Click **"Add permissions"** → **"Create inline policy"**
5. Click the **"JSON"** tab
6. Paste this (replace YOUR_ACCOUNT_ID with your AWS account number):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:UpdateItem",
                "dynamodb:DeleteItem",
                "dynamodb:Query"
            ],
            "Resource": "arn:aws:dynamodb:ap-southeast-2:YOUR_ACCOUNT_ID:table/feast-planner-trips",
            "Condition": {
                "ForAllValues:StringEquals": {
                    "dynamodb:LeadingKeys": ["${cognito-identity.amazonaws.com:sub}"]
                }
            }
        }
    ]
}
```

7. Click **"Review policy"**
8. Name it: `FeastPlannerDynamoDBAccess`
9. Click **"Create policy"**

**Can't find YOUR_ACCOUNT_ID?** 
- Look at the ARN you copied in Step 2
- The 12-digit number after `arn:aws:dynamodb:ap-southeast-2:` is your account ID
- Example: If ARN is `arn:aws:dynamodb:ap-southeast-2:123456789012:table/...`, then ID is `123456789012`

---

## ✅ Verification

### Test the Setup:

1. Go back to DynamoDB: https://ap-southeast-2.console.aws.amazon.com/dynamodbv2/home?region=ap-southeast-2#tables
2. Click on `feast-planner-trips`
3. Click **"Explore table items"**
4. You should see an empty table - that's perfect! ✅

---

## 🎉 You're Done!

Your DynamoDB table is ready! Here's what we accomplished:

- ✅ Created `feast-planner-trips` table in Sydney (ap-southeast-2)
- ✅ Configured with `userId` (partition key) and `tripId` (sort key)
- ✅ Set to On-Demand billing (pay only for what you use)
- ✅ Secured with IAM permissions (users can only access their own trips)

**Cost:** Likely **FREE** for first year (stays under free tier limits)

---

## Next Steps

Tell Claude: **"Table is created!"**

I'll then:
1. ✅ Update environment variables
2. ✅ Create the database service layer
3. ✅ Update the Trip Planner to use real data
4. ✅ Deploy to Vercel

---

## Troubleshooting

**Q: I can't find the Cognito IAM role**
- Go to: https://console.aws.amazon.com/cognito/v2/idp/user-pools
- Click your user pool
- Go to "App integration" tab
- Look for "Identity pool" - click it
- Find the authenticated role ARN there

**Q: The JSON policy won't save**
- Make sure you replaced `YOUR_ACCOUNT_ID` with actual numbers
- Check there are no extra spaces or line breaks
- The ARN should end with `/table/feast-planner-trips`

**Q: Do I need AWS CLI?**
- No! The AWS Console method above is easier and faster.

---

**Ready?** Create the table and let me know when done! 🚀
