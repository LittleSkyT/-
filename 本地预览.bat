@echo off
cd /d "%~dp0"
title 作品集网站 - 本地预览

set "NODE_BIN=C:\Users\28402\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin"
set "PNPM_JS=C:\Users\28402\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs"
set "PATH=%NODE_BIN%;%PATH%"

echo ================================================
echo            作品集网站 - 本地预览
echo ================================================
echo.
echo    这一步是启动一个"只在你自己的电脑上"的网站，
echo    用来先看看效果，不会影响线上已经发布的网站。
echo.
echo    启动完成后（屏幕滚出 Local:  http://localhost:5173/
echo    就算启动好了），在浏览器里打开：
echo.
echo         http://localhost:5173/
echo.
echo    好处：你改 src 文件夹里的代码并保存之后，
echo          浏览器里的页面会自动更新，不用重启。
echo.
echo    确认满意了，就关掉这个窗口，
echo    再去双击项目文件夹里的"发布.bat"推送到线上。
echo.
echo    想停止预览：按 Ctrl + C，或者直接关掉这个窗口。
echo.
echo    （下面滚动出来的英文是运行日志，是正常的。
echo      只有出现红色的 Error 才说明代码有问题。）
echo.
pause
echo.
echo    正在启动，请稍等十几秒...
echo.
node "%PNPM_JS%" run dev
echo.
echo    预览服务已停止。
pause
