hint:
	@node node_modules/.bin/jshint lib/

test: hint
	@node node_modules/.bin/mocha --reporter spec

API_PATH = docs/api.md
API_TMP_PATH = docs/index.md
docs: readme
	@rm -rf ${API_PATH}
	@echo "## API" > ${API_PATH}
	@node node_modules/.bin/jsdox --output docs lib
	@cat ${API_TMP_PATH} >> ${API_PATH}
	@rm ${API_TMP_PATH}

readme:
	@node node_modules/.bin/subtool readme

report:
	@node node_modules/.bin/plato -r --title "commander-utils" --dir report lib

.PHONY: hint test docs readme
