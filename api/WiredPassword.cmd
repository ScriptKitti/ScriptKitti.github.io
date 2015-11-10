@echo off
net start dot3svc
wmic quit
echo "WIRELESS NETWORK"
netsh lan show profiles
set /p Name="Network Name: "
%Name%
set key=clear
msg * %key%
net stop dot3svc