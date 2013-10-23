###
# commander-utils Makefile
###


COMMON_MAKEFILES_PATH=node_modules/CommonMakefiles
include $(COMMON_MAKEFILES_PATH)/index.make
include $(COMMON_MAKEFILES_PATH)/node/all.make
include $(COMMON_MAKEFILES_PATH)/subtub/subtool.make

MOCHA_TIMEOUT = 30000


docs: jsdox

readme: jsdox subtool-readme

readme-git: jsdox subtool-readme-git

report:
	@node node_modules/.bin/plato -r --title "commander-utils" --dir report lib

.PHONY: docs readme readme-git report
