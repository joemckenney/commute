#
# A ghetto interface to the bart etd api
#

PROJECT = "a ghetto interface to the bart etd api"

install: ;@echo "Installing ${PROJECT}........"
	npm install

server: ;@echo "Starting server"
	node server.js 

clean: ;
	rm -rf ./node_modules

symlink: ;       
	ln -s ./commute /usr/local/bin/commute 
