# Git Setup & Upload Instructions

## Problem: Git is not recognized

You're seeing this error because Git is either:
1. Not installed on your system
2. Installed but not added to PATH

## Solution Options

### Option 1: Install Git (Recommended)

1. **Download Git for Windows:**
   - Visit: https://git-scm.com/download/win
   - Download the installer
   - Run the installer
   - **Important:** During installation, select "Add Git to PATH" option

2. **After installation:**
   - Close and reopen your terminal/PowerShell
   - Run: `git --version` to verify installation

3. **Then run the upload commands:**
   ```powershell
   git init
   git remote add origin https://github.com/Suryansh9142/Ignite-Project.git
   git add .
   git commit -m "Initial commit: IgniteBuddy MERN Stack Application"
   git branch -M main
   git push -u origin main
   ```

### Option 2: Use GitHub Desktop (Easiest - No Command Line)

1. **Download GitHub Desktop:**
   - Visit: https://desktop.github.com/
   - Install the application

2. **Sign in with your GitHub account**

3. **Add your repository:**
   - Click "File" → "Add Local Repository"
   - Browse to: `E:\Games\Ignite-Buddy-master\Ignite-Buddy-master\Ignite Buddy\MERN`
   - Click "Add Repository"

4. **Publish to GitHub:**
   - Click "Publish repository" button
   - Repository name: `Ignite-Project`
   - Make sure "Keep this code private" is unchecked (or checked if you want it private)
   - Click "Publish Repository"

### Option 3: Use GitHub Web Interface

1. Go to: https://github.com/Suryansh9142/Ignite-Project
2. Click "uploading an existing file"
3. Drag and drop your project folder contents
4. Commit the changes

### Option 4: Check if Git is Installed but Not in PATH

If Git might already be installed, try these locations:

```powershell
# Check common Git installation paths
& "C:\Program Files\Git\bin\git.exe" --version
& "C:\Program Files (x86)\Git\bin\git.exe" --version
```

If one of these works, you can either:
- Add Git to PATH manually
- Use the full path: `& "C:\Program Files\Git\bin\git.exe" init`

## Quick Fix: Add Git to PATH (If Already Installed)

1. Find where Git is installed (usually `C:\Program Files\Git\bin`)
2. Open System Properties → Environment Variables
3. Edit "Path" variable
4. Add: `C:\Program Files\Git\bin`
5. Restart PowerShell

## Recommended: Use GitHub Desktop

For beginners, **GitHub Desktop is the easiest option** - no command line needed!

