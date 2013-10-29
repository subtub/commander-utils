###
# commander-utils Makefile
###


include node_modules/common-makefiles/node.make
include node_modules/common-makefiles/subtool.make

MOCHA_TIMEOUT = 30000

test: jshint mocha

docs: jsdox

readme: jsdox subtool-readme

readme-git: jsdox subtool-readme-git

.PHONY: docs readme readme-git
