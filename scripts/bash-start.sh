#!/bin/bash
export DISPLAY=:0
export XAUTHORITY=/home/pi/.Xauthority
cd /home/pi/smart-timer && npm start -- --max-old-space-size=820
