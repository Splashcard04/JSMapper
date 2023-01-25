@echo off
:: this will check for updates in nodemon and jsm on startup, meaning that re installing the packages with npm is unnecesary
npm i -g nodemon :: check for update
npm i splashcard_jsmapper :: check for update

:: nodemon will handel the automatic reload so that npm installs are only run when the batch is first run

echo Starting Script ReLoad
nodemon ./script.js
echo Script Saved
