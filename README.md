LagerLand

### Backup Database schema

docker exec -i mariadb_lager sh -c "exec mysqldump -d --database lagerland -uroot -pt5gE4zmRsUF9S9YTG11U" dump.sql

### Restore Database schema

docker exec -i mariadb_lager sh -c "exec mysql -uroot -pt5gE4zmRsUF9S9YTG11U" < dump.sql

### How to run debug

npm i -g nodemon
npm run debug

### Envs

DB_HOST=localhost
DB_USER=lagerland
DB_PASSWORD=91gSn2CF83cySuuS5doQ
TOKEN_KEY=lagerland
