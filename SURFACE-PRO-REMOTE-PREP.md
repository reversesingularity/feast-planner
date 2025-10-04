# Surface Pro Remote Preparation Checklist

**Status**: Ready for Monday setup from main PC  
**Date**: October 4, 2025  
**Estimated Surface Pro Setup Time**: 10-15 minutes

## ✅ Already Complete (On GitHub)

All code and documentation is synced to GitHub:
- [x] SvelteKit project with Tailwind CSS v4
- [x] Catalyst UI Kit reference structure
- [x] 4 comprehensive setup guides
- [x] Working landing page
- [x] 4 commits, 226 files, 31,811 lines of code

**Repository**: https://github.com/reversesingularity/feast-planner.git

---

## 🎯 Surface Pro Setup Actions (Monday Morning)

### Action 1: Install Node.js (10 minutes)
**Guide**: `INSTALL-NODEJS-SURFACE-PRO.md` on GitHub

```powershell
# Steps to perform ON SURFACE PRO:
1. Open Edge browser
2. Go to https://nodejs.org/
3. Download "20.x LTS" (Recommended)
4. Run installer (default settings)
5. Verify in new PowerShell window:
   node --version    # Should show v20.x.x
   npm --version     # Should show 10.x.x
```

**Why we can't do this remotely**: Node.js must be installed directly on the Surface Pro. No way to pre-install from your main PC.

---

### Action 2: Clone Repository in VS Code (2 minutes)
**Guide**: `SURFACE-PRO-QUICK-START.md` on GitHub

```powershell
# Steps to perform ON SURFACE PRO:
1. Open VS Code (already installed ✅)
2. Ctrl+Shift+P → "Git: Clone"
3. Enter: https://github.com/reversesingularity/feast-planner.git
4. Choose location: C:\Users\[your-username]\Projects\feast-planner
5. Click "Open" when prompted
```

**Why we can't do this remotely**: Repository must be cloned to Surface Pro's local storage. GitHub doesn't allow remote cloning to other devices.

---

### Action 3: Install Dependencies (3 minutes)
**Automatic via VS Code Terminal**

```powershell
# VS Code will detect package.json and offer to install
# Or run manually in VS Code terminal:
npm install
```

This will install all 56 packages (SvelteKit, Svelte, Tailwind, TypeScript, Vite, etc.)

---

### Action 4: Start Development (30 seconds)

```powershell
npm run dev
```

Then open: http://localhost:5173

You'll see the same gradient landing page currently running on your main PC! 🎉

---

## 🔧 Pre-Flight Checks (Do These NOW on Main PC)

### ✅ Check 1: GitHub Authentication
Verify your GitHub credentials work:

```powershell
# On main PC - Run this command:
git ls-remote https://github.com/reversesingularity/feast-planner.git
```

**Expected**: Should list branches without asking for credentials  
**If it asks for credentials**: You'll need to set up GitHub authentication on Surface Pro

---

### ✅ Check 2: Verify All Files Are Pushed

```powershell
# On main PC - Check if everything is synced:
git status
```

**Expected**: "nothing to commit, working tree clean"  
**If there are changes**: Run `git add .` → `git commit -m "..."` → `git push`

---

### ✅ Check 3: Catalyst UI Kit Access Plan

**Current Setup on Main PC**:
- Location: `C:\Dev\tailwind-ui-library\catalyst-ui-kit\`
- Junction: `F:\Projects\feast-planner\catalyst-ui-kit\` → points to C:\Dev

**Surface Pro Options**:

**Option A - Download Fresh Copy** (Recommended for travel):
1. Log in to https://tailwindui.com
2. Download Catalyst UI Kit
3. Extract to: `C:\Dev\tailwind-ui-library\catalyst-ui-kit\`
4. Reference components when needed (not imported into project)

**Option B - Work Without Catalyst**:
- Just reference the online docs at tailwindui.com
- Components aren't required for dev server to run
- Only needed when converting React → Svelte

**Option C - Copy via Cloud**:
- Zip `C:\Dev\tailwind-ui-library\` on main PC
- Upload to OneDrive/Google Drive
- Download on Surface Pro

---

## 📱 Surface Pro Specific Optimizations

### Already Installed ✅
- VS Code with GitHub Copilot
- Windows 11 with touch support

### Recommended Extensions (Install after cloning):
Open in VS Code on Surface Pro:
- Ctrl+Shift+X → Search and install:
  - "Svelte for VS Code" (svelte.svelte-vscode)
  - "Tailwind CSS IntelliSense" (bradlc.vscode-tailwindcss)
  - "GitHub Copilot" (already installed ✅)

### Touch-Friendly VS Code Settings:
Add to VS Code settings (Ctrl+,):
```json
{
  "workbench.editor.enablePreview": false,
  "editor.minimap.enabled": true,
  "editor.minimap.side": "right",
  "editor.fontSize": 14,
  "terminal.integrated.fontSize": 13,
  "editor.mouseWheelZoom": true
}
```

---

## 🚀 Monday Morning Timeline

| Time | Action | Duration |
|------|--------|----------|
| **Step 1** | Install Node.js from nodejs.org | 10 min |
| **Step 2** | Clone repo in VS Code (Ctrl+Shift+P → Git: Clone) | 2 min |
| **Step 3** | npm install (automatic) | 3 min |
| **Step 4** | npm run dev → localhost:5173 | 30 sec |
| **TOTAL** | **Ready to code** | **~15 min** |

---

## 🎯 Quick Reference Links (Bookmark These)

1. **GitHub Repo**: https://github.com/reversesingularity/feast-planner
2. **Node.js Download**: https://nodejs.org/
3. **Tailwind UI Login**: https://tailwindui.com/login
4. **Project Blueprint**: In repo as `Project Blueprint The Feast Planner.md`
5. **6-Month Plan**: In repo as `The 6-Month Solo Launch Plan.md`

---

## 🆘 Troubleshooting (If Something Goes Wrong)

### Issue: "node: command not found"
**Fix**: Restart VS Code after Node.js installation

### Issue: "npm install fails"
**Fix**: Delete `node_modules` and `package-lock.json`, run `npm install` again

### Issue: "Port 5173 already in use"
**Fix**: Change port in `vite.config.ts` or kill existing process

### Issue: "Can't access GitHub repo"
**Fix**: Set up GitHub authentication:
- Install GitHub CLI: https://cli.github.com/
- Run: `gh auth login`
- Or use VS Code built-in authentication

---

## 📝 Notes for Surface Pro Session

- **Internet Required**: For initial npm install (~150MB download)
- **Disk Space**: ~500MB for node_modules + project files
- **Battery Life**: Dev server is lightweight, expect 6-8 hours coding
- **Offline Work**: After initial setup, can code offline (except npm installs)

---

## ✨ Tips for Productive Travel Coding

1. **Commit Often**: Every feature/fix, commit and push
2. **Pull First**: Always `git pull` before starting work
3. **Use Copilot**: Ctrl+I for inline chat, great for Catalyst→Svelte conversions
4. **Save Bandwidth**: Only install packages when on WiFi
5. **Keep It Simple**: Focus on one component at a time

---

**You're 100% ready for Monday! All the hard setup work is done on this PC and synced to GitHub.** 🎉
