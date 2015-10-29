@echo off
set /p user="New Username: "
set /p pass="New Password: "
net user %user% %pass% /add
goto admin
:admin
net localgroup administrators %user% /add