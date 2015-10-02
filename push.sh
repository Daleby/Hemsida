#!/bin/bash
printf "\n----- Started Push Script -----\n\n"
while true
do
	sleep 2.0
	if [ -n "$(rsync -trinl --exclude='*_tmp*' --exclude='config.codekit' --exclude='/node_modules' --exclude='push.sh' --delete-before --chmod=+rw --chown=www-data:www-data /f/Hemsida/ albin@daleby.com:/var/www/hemsida/)" ]; then
		date +"%a %d %b %H:%M:%S"
		printf "\e[32m"
		rsync -tril --exclude='*_tmp*' --exclude='config.codekit' --exclude='/node_modules' --exclude='push.sh' --delete-before --chmod=+rw --chown=www-data:www-data /f/Hemsida/ albin@daleby.com:/var/www/hemsida/
		echo -e "\033[0m"
	fi
done