run: up init_frontend init_backend init_back_office init_private_api logs

up:
	docker compose up --detach

init_frontend:

init_backend:

init_back_office:
	docker compose exec back-office composer install
	docker compose exec back-office npm install --verbose
	docker compose exec back-office npm run dev

init_private_api:
	docker compose exec private-api composer install

logs:
	docker compose logs --follow

watch_bo:
	docker compose exec back-office npm run watch

down:
	docker compose down
