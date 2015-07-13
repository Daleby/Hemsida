#!/bin/bash

SERV_USER=albin
SERVER=daleby.com
SERV_PATH=/var/www/Hemsida/

# HashOld="NOInitHACH"
# find . -ls > $FILELISTFILE
while true
do
	sleep 0.3
	# FILELISTFILE="/tmp/SyncFileList_${SERV_USER}"
	FILEGITLIST="/tmp/GitStatus_${SERV_USER}"
	#cp "$FILELISTFILE" "${FILELISTFILE}_old"
	# find . -ls > $FILELISTFILE
	##diff "${FILELISTFILE}_old" "$FILELISTFILE"
	# Hash=`md5 < $FILELISTFILE`
	# if [ "$Hash" != "$HashOld" ]
	# then
		# echo "A File has changed: $(date)"
		# git status --porcelain|cut -b 4- > $FILEGITLIST
		# rsync -av source/ destination/
		rsync -ar --exclude='*.swp' --files-from="${FILEGITLIST}" . ${SERV_USER}@${SERVER}:${SERV_PATH}
		# HashOld=$Hash
		# echo Synced modified file to server
	# fi
done
