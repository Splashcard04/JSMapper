@echo off
:: set console size
mode con: cols=45 lines=55

:: loop the command `node script.js` which runs the file
:loop
node script.js

echo Started Reloading

goto loop

echo Changes Applied

pause
cls
