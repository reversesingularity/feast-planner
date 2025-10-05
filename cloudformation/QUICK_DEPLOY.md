# 📋 Quick Reference: CloudFormation Deployment

## 🎯 Deploy in 3 Steps

### 1️⃣ Upload Template
👉 **https://ap-southeast-2.console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/template**

- Click "Upload a template file"
- Choose: `cloudformation/feast-planner-infrastructure.yaml`
- Click "Next"

### 2️⃣ Name Your Stack
- Stack name: `feast-planner-infrastructure`
- Parameters: (pre-filled, don't change)
- Click "Next" → "Next"

### 3️⃣ Deploy
- ✅ Check: "I acknowledge that AWS CloudFormation might create IAM resources"
- Click "Submit"
- ⏱️ Wait 2-3 minutes for `CREATE_COMPLETE`

---

## 📤 After Deployment

### Get Your Identity Pool ID:
1. Click on stack: `feast-planner-infrastructure`
2. Go to **"Outputs"** tab
3. Copy the **`IdentityPoolId`** value
4. Tell me: **"Stack deployed! Identity Pool ID is: [paste the ID]"**

---

## ✅ What This Creates

- **DynamoDB Table:** `feast-planner-trips` (for storing trips)
- **Identity Pool:** `feast-planner-identity-pool` (for AWS access)
- **IAM Role:** `FeastPlanner-Cognito-AuthRole` (with permissions)

All configured and ready to use! 🎉

---

## 🆘 Problems?

See full guide: `cloudformation/DEPLOY_GUIDE.md`

Or tell me what error you got and I'll help!
