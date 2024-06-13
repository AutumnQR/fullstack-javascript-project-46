run:
	bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

test:
	NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest

lint:
	npx eslint .
