###
# commander-utils Makefile
###


COMMON_MAKEFILES_PATH=node_modules/CommonMakefiles
include $(COMMON_MAKEFILES_PATH)/index.make
include $(COMMON_MAKEFILES_PATH)/node/all.make

MOCHA_TIMEOUT = 30000


API_PATH = docs/api.md
API_TMP_PATH = docs/index.md
docs:
	@rm -rf ${API_PATH}
	@echo "## API\n \
	" > ${API_PATH}
	@node node_modules/.bin/jsdox --output docs lib
	@cat ${API_TMP_PATH} >> ${API_PATH}
	@rm ${API_TMP_PATH}

readme: docs
	@node node_modules/subtool/bin/subtool readme

readme-git: docs
	@node node_modules/subtool/bin/subtool readme -g

report:
	@node node_modules/.bin/plato -r --title "commander-utils" --dir report lib

.PHONY: docs readme report readme-git
