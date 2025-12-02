# Документация по API

## Базовый URL
/api

---
# Аутентификация

## POST /auth/register
Регистрация нового пользователя.
```json
{
  "email": "user@example.com",
  "password": "123456",
  "username": "JohnDoe",
  "avatarUrl": "https://..."
}
```

## POST /auth/login
Авторизация, получение JWT.
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

---
# Курсы (Courses)
Маршруты определены в `/courses`.

## GET /courses
Получить все курсы.

## GET /courses/:courseId
Получить курс по ID.

---
# Записи на курсы (Enrollments)
Интегрированы в `/courses/:courseId/enrollments`.

## GET /courses/:courseId/enrollments
Получить всех записанных.

## POST /courses/:courseId/enrollments
Создать запись.
```json
{
  "userId": 1
}
```

## DELETE /courses/:courseId/enrollments/:enrollmentId
Удалить запись.

---
# Разделы (Sections)
Маршруты: `/courses/:courseId/sections`.

## GET /courses/:courseId/sections
Все разделы курса.

## GET /courses/:courseId/sections/:sectionId
Раздел по ID.



---
# Уроки (Lessons)
Маршруты: `/courses/:courseId/sections/:sectionId/lessons`.

## GET /courses/:courseId/sections/:sectionId/lessons
Все уроки.

## GET /courses/:courseId/sections/:sectionId/lessons/:lessonId
Урок по ID.



---
# Прогресс (Progress)
Маршруты: `/courses/:courseId/sections/:sectionId/lessons/:lessonId/progress`.

## GET /courses/:courseId/sections/:sectionId/lessons/:lessonId/progress
Получить прогресс.

## PUT /courses/:courseId/sections/:sectionId/lessons/:lessonId/progress
Создать/обновить прогресс.
```json
{
  "userId": 1,
  "status": "completed"
}
```

---
# Викторины (Quizzes)
Маршруты: `/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes`.

## GET /courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes
Получить все викторины.

## GET /courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId
Получить викторину.

---
# Вопросы (Questions)
Маршруты:
`/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions`

## GET .../questions
Все вопросы.

## GET .../questions/:questionId
Вопрос по ID.



---
# Ответы (Answers)
Маршрут:
`/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers`

## GET .../answers
Получить ответы.

## GET .../answers/:answerId
Ответ по ID.

---
# Shortener
Маршруты: `/shorten`.

## POST /shorten
Создать короткую ссылку.
```json
{
  "originalUrl": "https://example.com"
}
```

## GET /shorten/:short
Перенаправление.


# Админские маршруты
---


# Пользователи (Users)
Маршруты определены в `/users`.

## GET /users
Список всех пользователей.

## GET /users/:id
Пользователь по ID.

## POST /users
Создать пользователя.

## PUT /users/:id
Обновить пользователя.

## DELETE /users/:id
Удалить пользователя.

---
# Курсы (Courses)
Маршруты определены в `/courses`.

## POST /courses
Создать курс.
```json
{
  "title": "JS Basics",
  "description": "intro",
  "category": "programming"
}
```

## PUT /courses/:courseId
Обновить курс.

## DELETE /courses/:courseId
Удалить курс.

---
# Разделы (Sections)
Маршруты: `/courses/:courseId/sections`.

## POST /courses/:courseId/sections
Создать раздел.
```json
{
  "title": "Введение",
  "orderIndex": 0
}
```

## PUT /courses/:courseId/sections/:sectionId
Обновить раздел.

## DELETE /courses/:courseId/sections/:sectionId
Удалить раздел.

---
# Уроки (Lessons)
Маршруты: `/courses/:courseId/sections/:sectionId/lessons`.

## POST /courses/:courseId/sections/:sectionId/lessons
Создать урок.
```json
{
  "title": "Что такое JS",
  "contentType": "text",
  "videoUrl": null,
  "textContent": "# Markdown lesson",
  "orderIndex": 0
}
```

## PUT /courses/:courseId/sections/:sectionId/lessons/:lessonId
Обновить урок.

## DELETE /courses/:courseId/sections/:sectionId/lessons/:lessonId
Удалить урок.


---
# Викторины (Quizzes)
Маршруты: `/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes`.

## POST /courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes
Создать викторину.
```json
{
  "lessonId": 1,
  "title": "Основы JS"
}
```

## PUT /courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId
Обновить викторину.

## DELETE /courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId
Удалить викторину.


---
# Вопросы (Questions)
Маршруты:
`/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions`

## POST .../questions
Создать вопрос.
```json
{
  "questionText": "Что такое переменная?",
  "questionType": "single"
}
```

## PUT .../questions/:questionId
Обновить вопрос.

## DELETE .../questions/:questionId
Удалить вопрос.

---
# Ответы (Answers)
Маршрут:
`/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers`

## POST .../answers
Создать ответ.
```json
{
  "answerText": "Контейнер для данных",
  "isCorrect": true
}
```

## PUT .../answers/:answerId
Обновить ответ.

## DELETE .../answers/:answerId
Удалить.