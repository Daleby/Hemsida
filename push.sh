#!/bin/bash
while true
do
	sleep 0.3
	rsync -pair --chmod=+rw /f/Hemsida/ albin@daleby.com:/var/www/hemsida/
done