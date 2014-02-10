#
# A ghetto interface to the bart etd api
#

PROJECT = "a ghetto interface to the bart etd api"
CWD = `pwd`

install: ;@echo "Installing ${PROJECT}........"
	npm install

server: ;@echo "Starting server"
	node server.js > server.log 2>&1 &

clean: ;
	rm -rf ./node_modules

symlink: ;       
	ln -s $(CWD)/commute.js /usr/local/bin/commute
