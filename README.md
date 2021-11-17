LagerLand

### Backup Database schema

docker exec -i mariadb_lager sh -c "exec mysqldump -d --database lagerland -uroot -pt5gE4zmRsUF9S9YTG11U" schema.sql

### Restore Database schema

docker exec -i mariadb_lager sh -c "exec mysql -uroot -pt5gE4zmRsUF9S9YTG11U" < schema.sql

### How to run debug

cd frontend

npm run development

### Envs

DB_HOST=localhost
DB_USER=lagerland
DB_PASSWORD=91gSn2CF83cySuuS5doQ
TOKEN_KEY=lagerland
