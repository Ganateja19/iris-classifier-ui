@echo off
echo ===================================
echo   Iris Classifier Setup & Run
echo ===================================
echo.

python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is NOT installed or not in your PATH.
    echo.
    echo Please install Python from https://www.python.org/downloads/
    echo and make sure to check "Add Python to PATH" during installation.
    echo.
    echo Once installed, restart this script.
    pause
    exit /b
)

echo [INFO] Python found. Checking dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies.
    pause
    exit /b
)

echo.
echo [INFO] Starting Backend Server...
echo [INFO] Don't close this window!
echo.
python app.py
