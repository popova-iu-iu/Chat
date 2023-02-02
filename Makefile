
start-frontend:
	make -C frontend start

start-backend:
	npx start-server -p 5100

start:
	make start-backend & make start-frontend

deploy:
	railway up

lint-frontend:
	make -C frontend lint

install:
	npm ci