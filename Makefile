dev:
	yarn build
	make build
	npx serve example/public
test:
	yarn build
	make build
	yarn test
build:
	cd example && node ../cli.js
