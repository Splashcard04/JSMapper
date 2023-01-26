@echo off
mode con: cols=65 lines=50

echo Starting ReLoad

::logs for starting script, and ending script
:loop
echo [96m[JSMapper]: Starting Script ReLoad[0m
node script.js
echo [32m[JSMapper]:Script ReLoad Finished [0m

:: pause the loop (makes the user press a key)
pause
:: loop again after key is pressed
goto loop
