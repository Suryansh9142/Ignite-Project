@echo off
echo ========================================
echo Uploading IgniteBuddy to GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding remote repository...
git remote add origin https://github.com/Suryansh9142/Ignite-Project.git

echo.
echo Step 3: Adding all files...
git add .

echo.
echo Step 4: Committing changes...
git commit -m "Initial commit: IgniteBuddy MERN Stack Application"

echo.
echo Step 5: Setting main branch...
git branch -M main

echo.
echo Step 6: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Done! Your code has been uploaded.
echo ========================================
pause

