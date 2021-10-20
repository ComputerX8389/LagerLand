# frontend

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Docker build

```
docker build -t computerx/lagerlandbackend .
```

### Docker run

```
docker run -d --name LagerLandBackend -p 3000:3000 -e DB_HOST=192.168.10.10 -e DB_USER=lagerland -e DB_PASSWORD=123123123 -e TOKEN_KEY=secure computerx/lagerlandbackend
```
