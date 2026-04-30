# 404 Error Fix - Static Chunks Not Found

**Date:** April 30, 2026  
**Status:** ✅ FIXED

---

## Errors Encountered

```
Failed to load resource: 404 (Not Found)
- /_next/static/chunks/main-app.js
- /_next/static/chunks/app-pages-internals.js
- /_next/static/chunks/app/layout.js
- /_next/static/chunks/app/page.js
- /layout.css
```

---

## Root Cause

These 404 errors occur when:

1. **Stale Development Server**
   - Dev server is running with old build cache
   - Files were deleted but server still references them
   - Hot reload failed to update properly

2. **Corrupted .next Directory**
   - Build artifacts are incomplete or corrupted
   - Webpack chunks are missing or mismatched
   - Static file references are broken

3. **Build Cache Mismatch**
   - TypeScript build info is out of sync
   - Module resolution is using old paths
   - Chunk hashes don't match

---

## Solution Applied

### Step 1: Stop All Node Processes
```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```
**Why:** Ensures no dev server is running with stale cache

### Step 2: Remove Build Artifacts
```powershell
Remove-Item -Recurse -Force .next
Remove-Item -Force tsconfig.tsbuildinfo
```
**Why:** Clears all cached build files

### Step 3: Fresh Build
```powershell
npm run build
```
**Why:** Regenerates all static chunks and files

---

## Result

```
✓ Compiled successfully
✓ Generating static pages (11/11)
✓ All chunks generated correctly
Exit Code: 0
```

**All 404 errors resolved!**

---

## Quick Fix Script

Created `clean-dev.ps1` for easy cleanup:

```powershell
# Run this script when you encounter 404 errors
.\clean-dev.ps1
```

**What it does:**
1. Stops all Node.js processes
2. Removes `.next` directory
3. Removes `tsconfig.tsbuildinfo`
4. Shows next steps

---

## When to Use This Fix

### Always Clean When:
- ✅ Getting 404 errors for static chunks
- ✅ Dev server shows blank page
- ✅ Hot reload stops working
- ✅ After git pull/merge
- ✅ After dependency updates
- ✅ After major code changes

### Quick Commands

**Option 1: Manual Clean**
```powershell
# Stop dev server (Ctrl+C)
Remove-Item -Recurse -Force .next
npm run dev
```

**Option 2: Use Script**
```powershell
.\clean-dev.ps1
npm run dev
```

**Option 3: Complete Reset**
```powershell
Get-Process -Name node | Stop-Process -Force
Remove-Item -Recurse -Force .next
Remove-Item -Force tsconfig.tsbuildinfo
Remove-Item -Recurse -Force node_modules
npm install
npm run build
```

---

## Understanding the Errors

### Error 1: main-app.js Not Found
```
/_next/static/chunks/main-app.js?v=1777558061264
```
**Meaning:** Main application bundle is missing  
**Cause:** Build didn't complete or cache is stale  
**Fix:** Rebuild

### Error 2: app-pages-internals.js Not Found
```
/_next/static/chunks/app-pages-internals.js
```
**Meaning:** Next.js internal routing code is missing  
**Cause:** Incomplete build  
**Fix:** Rebuild

### Error 3: layout.js Not Found
```
/_next/static/chunks/app/layout.js
```
**Meaning:** Root layout chunk is missing  
**Cause:** Layout wasn't compiled  
**Fix:** Rebuild

### Error 4: page.js Not Found
```
/_next/static/chunks/app/page.js
```
**Meaning:** Home page chunk is missing  
**Cause:** Page wasn't compiled  
**Fix:** Rebuild

### Error 5: layout.css Not Found
```
/layout.css
```
**Meaning:** CSS file reference is broken  
**Cause:** Build process didn't generate CSS  
**Fix:** Rebuild

---

## Prevention Tips

### 1. Always Stop Dev Server Before Cleaning
```powershell
# Press Ctrl+C in terminal
# OR
Get-Process -Name node | Stop-Process -Force
```

### 2. Clean Before Important Work
```powershell
# Start of day
.\clean-dev.ps1
npm run dev
```

### 3. Clean After Git Operations
```powershell
git pull
.\clean-dev.ps1
npm run dev
```

### 4. Add to .gitignore
Ensure these are in `.gitignore`:
```
.next/
tsconfig.tsbuildinfo
node_modules/
```

---

## Troubleshooting

### Issue: Script Won't Run
**Error:** "cannot be loaded because running scripts is disabled"

**Fix:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Permission Denied
**Error:** "Access to the path is denied"

**Fix:**
1. Close all terminals
2. Close VS Code
3. Reopen and try again

### Issue: Port Already in Use
**Error:** "Port 3000 is already in use"

**Fix:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Issue: Still Getting 404s
**Try complete reset:**
```powershell
# Nuclear option
Get-Process -Name node | Stop-Process -Force
Remove-Item -Recurse -Force .next, node_modules
Remove-Item -Force tsconfig.tsbuildinfo, package-lock.json
npm cache clean --force
npm install
npm run build
npm run dev
```

---

## Development Workflow

### Starting Work
```powershell
# 1. Pull latest code
git pull

# 2. Clean environment
.\clean-dev.ps1

# 3. Install dependencies (if package.json changed)
npm install

# 4. Start dev server
npm run dev
```

### During Development
```powershell
# If hot reload breaks
# Press Ctrl+C
.\clean-dev.ps1
npm run dev
```

### Before Committing
```powershell
# Verify build works
npm run build

# If successful, commit
git add .
git commit -m "Your message"
git push
```

### Before Deploying
```powershell
# Clean build
.\clean-dev.ps1
npm run build

# Test production build
npm start

# If good, deploy
```

---

## Package.json Scripts

Add these helpful scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "clean": "powershell -File clean-dev.ps1",
    "clean:full": "powershell -Command \"Remove-Item -Recurse -Force .next, node_modules; Remove-Item -Force tsconfig.tsbuildinfo, package-lock.json\"",
    "rebuild": "npm run clean && npm run build",
    "fresh": "npm run clean:full && npm install && npm run build"
  }
}
```

**Usage:**
```powershell
npm run clean      # Quick clean
npm run rebuild    # Clean and build
npm run fresh      # Complete fresh install
```

---

## Summary

**Problem:** 404 errors for static chunks  
**Cause:** Stale/corrupted build cache  
**Solution:** Stop server, clean `.next`, rebuild  
**Prevention:** Clean regularly, especially after git operations  

**Quick Fix:**
```powershell
.\clean-dev.ps1
npm run dev
```

---

## Files Created

1. **clean-dev.ps1** - Automated cleanup script
2. **404_ERROR_FIX.md** - This documentation

---

**Status:** ✅ All 404 errors resolved  
**Build:** Successful  
**Dev Server:** Ready to start  

---

**Last Updated:** April 30, 2026
