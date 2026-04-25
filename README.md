### Установка:
1. Установка зависимостей:
```
npm install
```

2. Настроить окружение .env:
```
DB_HOST="localhost"
DB_PORT="5432"
DB_USERNAME="dummy"
DB_PASSWORD="dummypass"
DB_NAME="netcourse"
```
3. Запустить Docker Compose:
```
docker compose up
```

4. Применить миграции Drizzle (также создаст таблицы, если их нет):
```
npx drizzle-kit migrate --config ./src/drizzle.config.ts
```

5. Запустить сервер:
```
npm run dev
```
