@echo off
cd /d "%~dp0"
title 作品集网站 - 一键发布

set "NODE_BIN=C:\Users\28402\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin"
set "PNPM_JS=C:\Users\28402\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs"
set "PATH=%NODE_BIN%;%PATH%"

echo ================================================
echo             作品集网站 - 一键发布
echo ================================================
echo.

echo [1/4] 检查有没有改动...
git status --porcelain > "%TEMP%\pf-status.txt"
set SIZE=0
for %%A in ("%TEMP%\pf-status.txt") do set SIZE=%%~zA
if "%SIZE%"=="0" (
  echo.
  echo    没有检测到任何改动，不需要发布。
  echo    如果你刚改过文件，请确认已经保存过了。
  goto :end
)

echo [2/4] 先在本地试构建一次，确认代码没写坏...
call node "%PNPM_JS%" exec vite build --outDir dist-check --logLevel warn
if errorlevel 1 (
  echo.
  echo   --------------------------------------------------
  echo   XX  构建失败！上面那几行就是错误原因。
  echo   XX  什么都没有发布，线上网站不受影响。
  echo   XX  把上面的报错截图发给助手，让他帮你修。
  echo   --------------------------------------------------
  goto :cleanup
)
echo        OK，代码没问题
echo.

set MSG=
set /p MSG=用一句话说说这次改了什么（直接回车也行）: 
if "%MSG%"=="" set MSG=更新作品集内容

echo [3/4] 提交改动...
git add -A
git commit -m "%MSG%"
if errorlevel 1 (
  echo.
  echo    提交失败，把上面的内容截图给助手看。
  goto :cleanup
)
echo        OK
echo.

echo [4/4] 推送到 GitHub...
git push
if errorlevel 1 (
  echo.
  echo   --------------------------------------------------
  echo   XX  推送失败，多半是网络问题。
  echo   XX  关掉这个窗口，等一两分钟再双击本文件重试。
  echo   --------------------------------------------------
  goto :cleanup
)

echo.
echo ================================================
echo    发布成功！
echo.
echo    看部署进度（变成绿色对勾就是好了）：
echo    https://github.com/LittleSkyT/-/actions
echo.
echo    大约 1 分钟后，打开这个网址就是新版：
echo    https://littleskyt.github.io/-/
echo.
echo    如果看到的还是旧样子，在浏览器里按 Ctrl + F5
echo    强制刷新一下（清掉缓存）。
echo ================================================

:cleanup
if exist "dist-check" rmdir /s /q "dist-check"

:end
echo.
pause
