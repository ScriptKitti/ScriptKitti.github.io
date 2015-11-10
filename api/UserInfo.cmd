@echo off
net user
set /p User="Account Name: "
net user %User%
pause