Установка:
1. Установка зависимостей:
``npm install``
2. Настроить окружение .env:
``DATABASE_URL="postgresql://dummy:dummypass@localhost:5433/netskills?schema=public"``
3. Синхронизировать таблицы (также создаст БД, если нету):
``npx prisma migrate dev``
4. Запустить сервер:
``npx ts-node src/server.ts``
