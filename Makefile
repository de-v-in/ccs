.PHONY: docker-build docker-run
docker-build:
	docker build -t ccs .
docker-run:
	docker run -d --restart unless-stopped --name ccs -p 3000:3000 ccs