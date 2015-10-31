@echo off
set /p Answer="Enable Admin (yes/no): "
net user administrator /active:%Answer%