test:
	@node node_modules/.bin/mocha --reporter spec

API_PATH = docs/api.md
API_TMP_PATH = docs/index.md
docs:
	@rm -rf ${API_PATH}
	@echo "## API" > ${API_PATH}
	@node node_modules/.bin/jsdox --output docs lib
	@cat ${API_TMP_PATH} >> ${API_PATH}
	@rm ${API_TMP_PATH}

readme: docs
	@subtool readme

.PHONY: test docs readme
