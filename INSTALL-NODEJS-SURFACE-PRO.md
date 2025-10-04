# Installing Node.js on Surface Pro

**Quick Setup Guide for Travel Development**  
**Estimated Time:** 10 minutes

---

## 📥 **Step-by-Step Installation**

### **Step 1: Download Node.js**

1. **Open Microsoft Edge or Chrome** on your Surface Pro

2. **Go to the official Node.js website:**
   ```
   https://nodejs.org
   ```

3. **Download the LTS (Long Term Support) version:**
   - You'll see two big download buttons
   - Choose **LTS** (recommended for most users)
   - Current LTS version (as of Oct 2025): **v22.x** or **v20.x**
   - Click the button that says **"Windows Installer (.msi)"** for **64-bit**

4. **Wait for download to complete**
   - File will be named something like: `node-v22.x.x-x64.msi`
   - Should be ~30-40 MB

---

### **Step 2: Run the Installer**

1. **Open Downloads folder** (or click the downloaded file in your browser)

2. **Double-click the installer file** (`node-v22.x.x-x64.msi`)

3. **Follow the installation wizard:**

   **Welcome Screen:**
   - Click **"Next"**

   **License Agreement:**
   - Read (or not 😉)
   - Check **"I accept the terms in the License Agreement"**
   - Click **"Next"**

   **Destination Folder:**
   - **Leave as default:** `C:\Program Files\nodejs\`
   - Click **"Next"**

   **Custom Setup:**
   - **Leave all defaults selected** (this includes):
     - ✅ Node.js runtime
     - ✅ npm package manager
     - ✅ Online documentation shortcuts
     - ✅ Add to PATH ← **IMPORTANT!**
   - Click **"Next"**

   **Tools for Native Modules (Optional):**
   - You'll see a checkbox: **"Automatically install the necessary tools..."**
   - **Leave it UNCHECKED** (we don't need Python/C++ tools for this project)
   - Click **"Next"**

   **Ready to Install:**
   - Click **"Install"**
   - **UAC prompt will appear** - Click **"Yes"** to allow

4. **Wait for installation** (1-2 minutes)

5. **Completion Screen:**
   - Click **"Finish"**

---

### **Step 3: Verify Installation**

1. **Open PowerShell:**
   - Press **Windows Key + X**
   - Select **"Windows PowerShell"** or **"Terminal"**

2. **Check Node.js version:**
   ```powershell
   node --version
   ```
   **Expected output:** `v22.x.x` or `v20.x.x`

3. **Check npm version:**
   ```powershell
   npm --version
   ```
   **Expected output:** `10.x.x` or similar

4. **✅ If both commands show version numbers, you're done!**

---

### **Step 4: (Optional) Configure npm**

These commands optimize npm for Windows:

```powershell
# Set npm to use Windows-friendly path length
npm config set scripts-prepend-node-path auto

# Enable npm global installs without admin
npm config set prefix "C:\Users\$env:USERNAME\AppData\Roaming\npm"
```

---

## 🎯 **What You Just Installed**

| Component | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | v22.x or v20.x | JavaScript runtime (runs your code) |
| **npm** | v10.x | Package manager (installs dependencies) |
| **npx** | Included | Package runner (runs packages without installing) |

---

## ✅ **Test Installation**

Let's make sure everything works:

```powershell
# Create a test directory
cd ~
mkdir node-test
cd node-test

# Create a simple test file
echo "console.log('Node.js is working!');" > test.js

# Run it
node test.js
```

**Expected output:** `Node.js is working!`

If you see that, **you're ready to clone Feast Planner!**

---

## 🚀 **Next Steps: Clone Feast Planner**

Now that Node.js is installed, you can clone your project:

```powershell
# Navigate to where you want your project
cd C:\Users\$env:USERNAME\Projects
# Or: cd ~\Documents\Projects
# Or wherever you prefer

# Clone the repository
git clone https://github.com/reversesingularity/feast-planner.git

# Navigate into the project
cd feast-planner

# Install all dependencies (this takes 2-3 minutes)
npm install

# Start the development server
npm run dev
```

**Then open:** http://localhost:5173

**You should see your Feast Planner landing page!** 🎉

---

## 🔧 **Troubleshooting**

### **Issue: "node is not recognized as a command"**

**Solution:**
1. Close and reopen PowerShell (PATH needs to refresh)
2. If still not working, restart Surface Pro
3. If STILL not working:
   ```powershell
   # Manually add to PATH for current session
   $env:Path += ";C:\Program Files\nodejs"
   ```

### **Issue: npm install fails with permission errors**

**Solution:**
```powershell
# Run PowerShell as Administrator
# Right-click PowerShell → "Run as Administrator"
# Then retry: npm install
```

### **Issue: npm install is very slow**

**Solution:**
- This is normal on first install (downloading ~150 packages)
- On hotel/airport WiFi, it may take 5-10 minutes
- Wait patiently ☕

### **Issue: Port 5173 already in use**

**Solution:**
```powershell
# Use a different port
npm run dev -- --port 3000
```

---

## 📱 **Surface Pro Specific Tips**

### **Touch Mode in VS Code**

After installing VS Code:

1. Open VS Code
2. Press **Ctrl + Shift + P**
3. Type: **"Toggle Touch Mode"**
4. Press Enter

This makes VS Code easier to use with touch!

### **Recommended Surface Pro Setup**

- **External keyboard** (if traveling light, fold-out keyboard works fine)
- **Mouse or Surface Pen** (easier than trackpad for coding)
- **External monitor** (if available in hotel/Airbnb)
- **Power bank** (for working on flights)

---

## 💾 **Disk Space Check**

Node.js installation uses:
- **Node.js itself:** ~50 MB
- **Global packages:** ~100 MB
- **Feast Planner project:** ~200 MB (after `npm install`)

**Total:** ~350 MB

**Make sure you have at least 1 GB free** on your Surface Pro C: drive.

---

## 🎯 **Installation Checklist**

- [ ] Downloaded Node.js LTS from nodejs.org
- [ ] Ran installer with default settings
- [ ] Verified `node --version` works
- [ ] Verified `npm --version` works
- [ ] (Optional) Configured npm settings
- [ ] Tested with simple script
- [ ] Ready to clone Feast Planner!

---

## ⏱️ **When to Install**

**Option 1: Before you leave (Recommended)**
- Install Node.js now on Surface Pro
- Test that it works
- Clone the repo before travel
- Run `npm install` while on home WiFi (faster!)

**Option 2: On Monday morning**
- Install everything fresh on travel day
- Might take longer on slower WiFi

**I recommend Option 1** - set it up before you leave so you can start coding immediately when you arrive!

---

## 📞 **Need Help?**

If you run into issues:

1. **Check Node.js official docs:** https://nodejs.org/en/docs
2. **Common issues:** https://docs.npmjs.com/common-errors
3. **GitHub discussions:** https://github.com/nodejs/node/discussions

---

**Happy installing! You're one step closer to coding on your Surface Pro!** 🚀💻
