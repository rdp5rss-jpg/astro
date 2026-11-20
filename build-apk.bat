@echo off
echo ==============================================
echo   Building BHAVISHYAA Android APK
echo ==============================================

set "JAVA_HOME=C:\Users\USER\.jdks\jbr-21.0.11"
set "ANDROID_HOME=C:\Users\USER\AppData\Local\Android\Sdk"
set "ANDROID_SDK_ROOT=C:\Users\USER\AppData\Local\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo 1. Building Vite web distribution...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Web build failed.
    exit /b %ERRORLEVEL%
)

echo 2. Syncing Capacitor assets with Android...
call npx cap sync android
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Capacitor sync failed.
    exit /b %ERRORLEVEL%
)

echo 3. Building Android APK via Gradle...
cd android
call gradlew.bat assembleDebug
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Gradle build failed.
    cd ..
    exit /b %ERRORLEVEL%
)
cd ..

echo.
echo ==============================================
echo [SUCCESS] APK built successfully!
echo Location: android\app\build\outputs\apk\debug\app-debug.apk
echo ==============================================
pause
