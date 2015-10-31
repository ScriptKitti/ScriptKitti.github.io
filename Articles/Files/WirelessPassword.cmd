@echo off
net start Wlansvc
wmic quit
echo "WIRELESS NETWORK"
netsh wlan show profiles
set /p Name="Network Name: "
%Name%
set key=clear
msg * %key%
net stop Wlansvc