#!/bin/bash

SERV_USER=albin
SERVER=daleby.com
SERV_PATH=/var/www/daleby/

FILELISTFILE="/tmp/SyncFileList_${SERV_USER}"
FILEGITLIST="/tmp/GitStatus_${SERV_USER}"
HashOld="NOInitHACH"
find . -ls > $FILELISTFILE
while true
do
	sleep 0.3
	#cp "$FILELISTFILE" "${FILELISTFILE}_old"
	find . -ls > $FILELISTFILE
	##diff "${FILELISTFILE}_old" "$FILELISTFILE"
	Hash=`md5 < $FILELISTFILE`
	if [ "$Hash" != "$HashOld" ]
	then
		echo "A File has changed: $(date)"
		git status --porcelain|cut -b 4- > $FILEGITLIST
		rsync -rc --exclude='*.swp' --files-from="${FILEGITLIST}" . ${SERV_USER}@${SERVER}:${SERV_PATH}
		HashOld=$Hash
		echo "Synced files to server"
	fi
done
