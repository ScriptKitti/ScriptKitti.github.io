@echo off
net view
set /p Name="Server Name: "
tracert %Name%
echo ""
pause