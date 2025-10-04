# Surface Pro Setup Guide

**For use while traveling (2 weeks)**  
**Date Created:** October 4, 2025

---

## 📱 **Quick Setup on Surface Pro (10 minutes)**

### **Step 1: Prerequisites**

Before cloning, install these on your Surface Pro:

#### **A. Install Node.js**
1. Go to: https://nodejs.org/
2. Download **LTS version** (currently v20.x or v22.x)
3. Run installer with default settings
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

#### **B. Install Git**
1. Go to: https://git-scm.com/download/win
2. Download and install
3. Verify installation:
   ```powershell
   git --version
   ```

#### **C. Configure Git (if first time)**
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

### **Step 2: Clone the Repository**

```powershell
# Navigate to where you want the project
cd C:\Users\YourName\Projects  # or wherever you prefer

# Clone the repository (replace with your actual GitHub URL)
git clone https://github.com/yourusername/feast-planner.git

# Navigate into the project
cd feast-planner
```

---

### **Step 3: Install Dependencies**

```powershell
# Install all npm packages
npm install
```

**This will take 2-3 minutes** - downloads all dependencies from package.json

---

### **Step 4: Handle Catalyst UI Kit**

**IMPORTANT:** The Catalyst UI Kit is a **junction** on the main PC, so it won't clone.

**Two Options:**

#### **Option A: Work Without Catalyst (Recommended for Travel)**
Just skip Catalyst components for now - work on other features:
- AWS setup
- Authentication logic
- Database schema
- Backend Lambda functions
- Documentation

#### **Option B: Copy Catalyst to Surface Pro**
If you need Catalyst components:

1. **Before leaving:** Copy `C:\Dev\tailwind-ui-library\catalyst-ui-kit` to a USB drive
2. **On Surface Pro:** 
   ```powershell
   # Create directory
   New-Item -ItemType Directory -Path "C:\Dev\tailwind-ui-library" -Force
   
   # Copy from USB to C:\Dev
   # Then create junction
   cd feast-planner
   New-Item -ItemType Junction -Path "catalyst-ui-kit" -Target "C:\Dev\tailwind-ui-library\catalyst-ui-kit"
   ```

---

### **Step 5: Start Development**

```powershell
# Start the dev server
npm run dev

# Open browser
# Go to: http://localhost:5173
```

**You should see the Feast Planner landing page!**

---

## 🔄 **Daily Workflow While Traveling**

### **Morning: Pull Latest Changes**
```powershell
cd feast-planner
git pull origin main
```

### **Work on Features**
```powershell
# Start dev server
npm run dev

# Make changes to files
# Test in browser
```

### **Evening: Commit and Push**
```powershell
# Check what changed
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add authentication logic for Cognito integration"

# Push to GitHub
git push origin main
```

---

## 📋 **Recommended Work for 2-Week Travel**

### **Week 1: AWS & Backend Setup**
- [ ] Create AWS account (if not done)
- [ ] Set up Cognito user pool
- [ ] Create DynamoDB tables (schema design)
- [ ] Write Lambda function skeletons
- [ ] Document API endpoints

**No Catalyst needed** - this is all backend work!

### **Week 2: Authentication Logic**
- [ ] Implement registration flow (logic only, simple UI)
- [ ] Implement login flow
- [ ] Implement password reset
- [ ] Create protected route middleware
- [ ] Write authentication tests

**Minimal UI needed** - can use plain HTML forms for testing

---

## 🔧 **Troubleshooting on Surface Pro**

### **Issue: Port 5173 in use**
```powershell
npm run dev -- --port 3000
```

### **Issue: Node modules error**
```powershell
rm -Recurse -Force node_modules
npm install
```

### **Issue: Git push denied**
```powershell
# Make sure you're authenticated
# Use GitHub Desktop or set up SSH keys
```

### **Issue: Can't run npm commands**
```powershell
# Reinstall Node.js
# Make sure it's added to PATH
```

---

## 💾 **When You Return Home (2 minutes)**

On your main PC:

```powershell
# Navigate to project
cd F:\Projects\feast-planner

# Pull all changes from Surface Pro
git pull origin main

# Install any new dependencies
npm install

# Start dev server
npm run dev
```

**Everything syncs automatically!** 🎉

---

## ⚠️ **Important Notes**

### **DO:**
- ✅ Commit and push at least once per day
- ✅ Write descriptive commit messages
- ✅ Pull before you start working each day
- ✅ Test changes before committing

### **DON'T:**
- ❌ Work on the same file on both devices without pulling/pushing
- ❌ Commit `node_modules` (already in .gitignore)
- ❌ Forget to push - you'll lose work if Surface Pro crashes!

---

## 📱 **Mobile Development Tips**

### **On Surface Pro:**
- Use **VS Code** (same as main PC)
- Enable **touch mode** in VS Code for easier touch interaction
- Use **external keyboard** if possible (faster typing)
- Connect to **external monitor** in hotel (if available)

### **Offline Work:**
- Once `npm install` is done, you can work offline
- Dev server works without internet
- Only need internet for:
  - Git push/pull
  - Installing new packages
  - Researching documentation

---

## 🎯 **Success Metrics for 2 Weeks**

### **Minimum Goal (Basic Success):**
- AWS account created
- Cognito user pool configured
- DynamoDB tables designed
- Basic authentication logic implemented

### **Target Goal (Good Progress):**
- All of above PLUS:
- Lambda functions created
- Registration flow working
- Login flow working
- Protected routes implemented

### **Stretch Goal (Amazing Progress):**
- All of above PLUS:
- Password reset working
- User profile page
- First deployment to AWS
- Tests written

---

## 📞 **Need Help?**

If you get stuck:
1. Check **GitHub Issues** (create one if needed)
2. Review **SETUP-COMPLETE.md** (in the repo)
3. Check **Project Blueprint.md** (architecture reference)
4. Search SvelteKit docs: https://kit.svelte.dev/docs

---

**Happy coding on your travels! 🚀✈️**

**Remember:** Commit and push every day!
