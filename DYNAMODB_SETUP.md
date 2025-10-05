# DynamoDB Setup Guide - Feast Planner Trips

## Overview
This guide will help you set up a DynamoDB table to store user trip data for the Feast Planner application.

## Table Design

**Table Name:** `feast-planner-trips`

**Primary Key:**
- Partition Key: `userId` (String) - The Cognito user ID
- Sort Key: `tripId` (String) - Unique identifier for each trip (UUID)

**Attributes:**
- `userId` (String) - Cognito user sub ID
- `tripId` (String) - Unique trip identifier (UUID v4)
- `siteName` (String) - Name of the feast site
- `siteSlug` (String) - URL slug for the site
- `location` (String) - Site location (e.g., "Daytona Beach, FL")
- `dates` (String) - Trip dates (e.g., "October 15-22, 2025")
- `attendees` (Number) - Number of attendees
- `accommodationType` (String) - Type of lodging
- `transportationMode` (String) - How traveling
- `budgetRange` (String) - Budget category
- `notes` (String) - User notes
- `status` (String) - Trip status: "planned" | "confirmed" | "cancelled"
- `createdAt` (String) - ISO 8601 timestamp
- `updatedAt` (String) - ISO 8601 timestamp

**Indexes:**
- None required initially (queries will be done by userId)

**Billing Mode:** On-Demand (pay per request - great for starting)

---

## Option 1: Create Table Using AWS Console (Easiest)

1. **Sign in to AWS Console**
   - Go to: https://console.aws.amazon.com/
   - Navigate to DynamoDB service

2. **Create Table**
   - Click "Create table"
   - **Table name:** `feast-planner-trips`
   - **Partition key:** `userId` (String)
   - **Sort key:** `tripId` (String)
   - **Table settings:** Default settings
   - **Capacity mode:** On-demand
   - Click "Create table"

3. **Wait for Creation**
   - Table should be created in 30-60 seconds
   - Status will change from "Creating" to "Active"

4. **Note the ARN**
   - Click on the table name
   - Copy the Amazon Resource Name (ARN) - you'll need this for IAM permissions

---

## Option 2: Create Table Using AWS CLI (Faster)

### Prerequisites
- AWS CLI installed and configured
- AWS credentials with DynamoDB permissions

### Command to Create Table

```bash
aws dynamodb create-table \
    --table-name feast-planner-trips \
    --attribute-definitions \
        AttributeName=userId,AttributeType=S \
        AttributeName=tripId,AttributeType=S \
    --key-schema \
        AttributeName=userId,KeyType=HASH \
        AttributeName=tripId,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST \
    --region ap-southeast-2 \
    --tags Key=Project,Value=FeastPlanner Key=Environment,Value=Production
```

### PowerShell Version (for Windows)

```powershell
aws dynamodb create-table `
    --table-name feast-planner-trips `
    --attribute-definitions `
        AttributeName=userId,AttributeType=S `
        AttributeName=tripId,AttributeType=S `
    --key-schema `
        AttributeName=userId,KeyType=HASH `
        AttributeName=tripId,KeyType=RANGE `
    --billing-mode PAY_PER_REQUEST `
    --region ap-southeast-2 `
    --tags Key=Project,Value=FeastPlanner Key=Environment,Value=Production
```

### Verify Table Creation

```bash
aws dynamodb describe-table --table-name feast-planner-trips --region ap-southeast-2
```

---

## Step 2: Configure IAM Permissions

Your Cognito Identity Pool needs permissions to access this DynamoDB table.

### Option A: Update Existing IAM Role

1. Go to IAM Console: https://console.aws.amazon.com/iam/
2. Find the role used by your Cognito Identity Pool (usually contains "Cognito_" in the name)
3. Add this inline policy:

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
                "dynamodb:Query",
                "dynamodb:Scan"
            ],
            "Resource": [
                "arn:aws:dynamodb:ap-southeast-2:YOUR_ACCOUNT_ID:table/feast-planner-trips"
            ],
            "Condition": {
                "ForAllValues:StringEquals": {
                    "dynamodb:LeadingKeys": [
                        "${cognito-identity.amazonaws.com:sub}"
                    ]
                }
            }
        }
    ]
}
```

**Important:** Replace `YOUR_ACCOUNT_ID` with your AWS account ID.

### Option B: Create New IAM Policy

1. Create a new policy named `FeastPlannerDynamoDBAccess`
2. Use the JSON above
3. Attach to your Cognito authenticated role

---

## Step 3: Add Environment Variables

Add to your `.env.local` file:

```env
VITE_DYNAMODB_TABLE_NAME=feast-planner-trips
VITE_AWS_REGION=ap-southeast-2
```

Add to Vercel environment variables:
- `VITE_DYNAMODB_TABLE_NAME` = `feast-planner-trips`

---

## Step 4: Test Table Access

After setup, we'll create a test script to verify:
1. ✅ Table exists
2. ✅ IAM permissions are correct
3. ✅ Can write/read/delete items

---

## Cost Estimate

**DynamoDB On-Demand Pricing (ap-southeast-2):**
- Write requests: $1.4625 per million
- Read requests: $0.2925 per million
- Storage: $0.35 per GB-month

**Expected Usage (100 users):**
- ~500 writes/month (creating/updating trips)
- ~2,000 reads/month (viewing trips)
- Storage: <0.01 GB

**Estimated Monthly Cost:** ~$0.50 - $1.00

**Free Tier (first 12 months):**
- 25 GB storage
- 25 write capacity units
- 25 read capacity units

Your usage will likely be **FREE** for the first year! 🎉

---

## Security Features

1. **User Isolation:** Users can only access their own trips (enforced by IAM condition)
2. **Cognito Integration:** userId is the Cognito sub (unique, permanent)
3. **Encrypted at Rest:** DynamoDB encryption enabled by default
4. **Encrypted in Transit:** All API calls use HTTPS

---

## Next Steps After Table Creation

1. ✅ Create table (this step)
2. ⏳ Configure IAM permissions
3. ⏳ Create DynamoDB service layer (`src/lib/services/tripDb.ts`)
4. ⏳ Update Trip Planner page to use real data
5. ⏳ Test CRUD operations
6. ⏳ Deploy to Vercel

---

## Troubleshooting

### Error: "User is not authorized to perform: dynamodb:PutItem"
- Check IAM role has DynamoDB permissions
- Verify the resource ARN in the policy matches your table
- Ensure Cognito user is authenticated

### Error: "Requested resource not found"
- Verify table name is correct (`feast-planner-trips`)
- Check region is `ap-southeast-2`
- Confirm table status is "Active"

### Error: "The security token included in the request is invalid"
- AWS credentials expired
- Cognito session expired - user needs to sign in again

---

## Data Model Example

```typescript
interface Trip {
  userId: string;        // "us-east-1:abc123..." (Cognito sub)
  tripId: string;        // "550e8400-e29b-41d4-a716-446655440000" (UUID)
  siteName: string;      // "Daytona Beach, FL"
  siteSlug: string;      // "daytona-beach-fl"
  location: string;      // "United States"
  dates: string;         // "October 15-22, 2025"
  attendees: number;     // 4
  accommodationType: string;  // "Hotel"
  transportationMode: string; // "Flying"
  budgetRange: string;        // "$2000-$3000"
  notes: string;              // "Staying at Hilton..."
  status: string;             // "planned" | "confirmed" | "cancelled"
  createdAt: string;          // "2025-10-05T18:45:00.000Z"
  updatedAt: string;          // "2025-10-05T18:45:00.000Z"
}
```

---

**Ready to create the table?** Let me know when you've completed this step, and I'll proceed with creating the database service layer!
