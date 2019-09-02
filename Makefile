dev:
	yarn build
	cd example && node ../cli.js
	npx serve example/public
