@echo off
cd C:\Users\%username%\Desktop
echo "CREATE FILE"
set /p Name="File Name: "
title > %Name%.cmd