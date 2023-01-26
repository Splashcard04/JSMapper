@echo off
mode con: cols=65 lines=50

echo Starting ReLoad

:loop
echo [96mStarting Script ReLoad[0m
node script.js
echo [32mScript ReLoad Finished [0m

pause
goto loop
