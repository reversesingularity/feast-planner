# Quick Start Guide for Surface Pro

**You already have:** ✅ VS Code + GitHub Copilot  
**Estimated setup time:** 5-10 minutes

---

## 🚀 **Super Quick Setup (3 Steps)**

Since you already have VS Code with Copilot, setup is incredibly simple:

### **Step 1: Install Node.js (10 minutes)**

Follow: `INSTALL-NODEJS-SURFACE-PRO.md` in this repo

**Quick version:**
1. Go to https://nodejs.org
2. Download LTS version (Windows 64-bit .msi)
3. Run installer with all defaults
4. Verify in PowerShell:
   ```powershell
   node --version
   npm --version
   ```

### **Step 2: Clone in VS Code (2 minutes)**

1. **Open VS Code** on Surface Pro
2. **Press:** `Ctrl + Shift + P`
3. **Type:** `Git: Clone`
4. **Paste:** `https://github.com/reversesingularity/feast-planner.git`
5. **Choose location:** (e.g., `C:\Users\YourName\Projects\`)
6. **Click:** "Open" when prompted

### **Step 3: Install Dependencies (3 minutes)**

VS Code will open your project. In the integrated terminal:

```powershell
npm install
```

**That's it! You're ready to code!** 🎉

---

## ✨ **VS Code + Copilot Advantages**

You're in the perfect setup! Here's why:

### **GitHub Copilot Benefits**

✅ **Code completion** - Copilot will help write Svelte components  
✅ **Pattern learning** - It will learn from your Catalyst→Svelte conversions  
✅ **Documentation** - Ask Copilot to explain code in chat  
✅ **Refactoring** - Copilot can suggest improvements  
✅ **Testing** - Generate test cases automatically  

### **VS Code Features to Use**

✅ **Integrated terminal** - No need to switch windows  
✅ **Git integration** - See changes, commit, push all in VS Code  
✅ **IntelliSense** - TypeScript autocomplete  
✅ **Svelte extension** - Syntax highlighting for `.svelte` files  
✅ **Live reload** - Changes appear instantly in browser  

---

## 🎯 **Recommended VS Code Extensions**

You probably have most of these, but double-check:

### **Essential (Must Have):**

```
✅ GitHub Copilot (you have this!)
✅ Svelte for VS Code (svelte.svelte-vscode)
✅ Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
✅ ESLint (dbaeumer.vscode-eslint)
```

### **Very Useful:**

```
- Prettier - Code formatter (esbenp.prettier-vscode)
- GitLens (eamodio.gitlens)
- Error Lens (usernamehw.errorlens)
- Auto Rename Tag (formulahendry.auto-rename-tag)
```

**To install missing extensions:**
1. Press `Ctrl + Shift + X`
2. Search for extension name
3. Click "Install"

---

## 💡 **Using Copilot for This Project**

### **Converting Catalyst Components**

When you need to convert a React component to Svelte:

1. **Open Catalyst component** (e.g., `catalyst-ui-kit/typescript/button.tsx`)
2. **Select the code**
3. **Right-click** → "Copilot: Generate"
4. **In chat, ask:**
   ```
   Convert this React component to Svelte 5 with TypeScript
   ```

Copilot will generate the Svelte equivalent! 🎉

### **Writing New Features**

Just start typing comments describing what you want:

```svelte
<!-- Component for displaying feast site card with image, title, and description -->
```

Copilot will suggest the entire component!

### **Debugging**

When you encounter an error:
1. **Select the error** in the Problems panel
2. **Right-click** → "Copilot: Explain This"
3. Copilot will explain what's wrong and suggest fixes

---

## 🔄 **Daily Workflow on Surface Pro**

### **Morning Routine (30 seconds)**

```powershell
# Open VS Code to your project
# It should already be open from yesterday

# Pull latest changes
git pull
```

Or use VS Code UI:
- Click **Source Control** icon (left sidebar)
- Click **"..."** menu → **"Pull"**

### **During Development**

```powershell
# Start dev server (in VS Code terminal)
npm run dev
```

**Open browser:** http://localhost:5173

**Make changes → Save → See instant reload!**

### **Evening Routine (1 minute)**

**Option A: VS Code UI (Recommended)**
1. Click **Source Control** icon
2. Review changes
3. Type commit message
4. Click **✓ Commit**
5. Click **"Sync Changes"** (pushes to GitHub)

**Option B: Terminal**
```powershell
git add .
git commit -m "Your message"
git push
```

---

## 🎨 **VS Code Settings for Surface Pro**

### **Enable Touch Mode**

1. Press `Ctrl + Shift + P`
2. Type: `Toggle Touch Mode`
3. Press Enter

This makes buttons larger for touch interaction!

### **Optimize for Surface Pro**

Add to your `settings.json` (press `Ctrl + ,` → click `{}` icon):

```json
{
  "window.zoomLevel": 0.5,
  "editor.fontSize": 14,
  "terminal.integrated.fontSize": 12,
  "editor.minimap.enabled": true,
  "editor.wordWrap": "on",
  "files.autoSave": "afterDelay",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## 🚀 **Start Coding in 30 Seconds**

Once setup is complete, you can start coding in literally 30 seconds:

```powershell
# Open VS Code (pin it to taskbar!)
# Press Ctrl + ` to open terminal

npm run dev

# That's it! Start coding!
```

---

## 💾 **Recommended: Install Before Travel**

**Do this now (before Monday):**

1. ✅ Install Node.js (10 min) - use `INSTALL-NODEJS-SURFACE-PRO.md`
2. ✅ Clone repo in VS Code (2 min) - follow Step 2 above
3. ✅ Run `npm install` (3 min) - this downloads dependencies
4. ✅ Test `npm run dev` (30 sec) - verify it works
5. ✅ Install Svelte + Tailwind extensions (2 min)

**Total: 15-20 minutes**

Then on Monday morning, you just:
```powershell
npm run dev
```

And you're coding immediately! 🎉

---

## 🎯 **GitHub Copilot Tips for Feast Planner**

### **Tip 1: Use Comments as Prompts**

```svelte
<script lang="ts">
  // TODO: Fetch feast sites from API and display in a grid
  // Each site should show: name, location, dates, image
  // Add loading state and error handling
</script>
```

Copilot will generate the code!

### **Tip 2: Ask for Examples**

In Copilot Chat:
```
Show me how to create a Svelte 5 component that fetches data from an API using fetch()
```

### **Tip 3: Convert Between Languages**

```
Convert this React TypeScript component to Svelte 5 TypeScript:
[paste React code]
```

### **Tip 4: Generate Tests**

```
Generate unit tests for this Svelte component using Vitest
```

### **Tip 5: Explain Complex Code**

Select any confusing code → Right-click → "Copilot: Explain This"

---

## 📊 **Your Optimized Setup**

You have the **perfect** development environment:

| Tool | Purpose | Status |
|------|---------|--------|
| **Surface Pro** | Portable dev machine | ✅ You have it |
| **VS Code** | Code editor | ✅ Installed |
| **GitHub Copilot** | AI pair programmer | ✅ Active |
| **Node.js** | Runtime environment | ⏳ Install next |
| **Git** | Version control | ✅ (comes with VS Code) |
| **Feast Planner** | Your project | ⏳ Clone next |

---

## 🎊 **You're in Great Shape!**

With VS Code + Copilot already set up, you have:

✅ **Professional IDE** - Best-in-class editor  
✅ **AI Assistant** - Copilot will accelerate your coding  
✅ **Git Integration** - Seamless GitHub workflow  
✅ **Touch Support** - Works great on Surface Pro  
✅ **Extensions** - Endless customization  

**Just install Node.js and clone the repo - you're ready to build!** 🚀

---

## 📞 **Quick Help**

**VS Code shortcuts:**
- `Ctrl + Shift + P` - Command palette
- `Ctrl + `` - Toggle terminal
- `Ctrl + B` - Toggle sidebar
- `Ctrl + Shift + G` - Git panel
- `Ctrl + Shift + E` - File explorer
- `Ctrl + /` - Toggle comment

**Copilot shortcuts:**
- `Ctrl + I` - Open inline Copilot
- `Alt + ]` - Next suggestion
- `Alt + [` - Previous suggestion
- `Tab` - Accept suggestion

---

**You're all set! Install Node.js and start coding!** 💻✨
