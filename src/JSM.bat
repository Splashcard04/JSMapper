@echo off
:: set console size
mode con: cols=45 lines=55

:: this will check for updates in nodemon and jsm on startup, meaning that re installing the packages with npm is unnecesary
npm i -g nodemon 
:: check for update
npm i splashcard_jsmapper

:loop
nodemon script.js

echo Started Reloading

goto loop

echo Changes Applied

cls
