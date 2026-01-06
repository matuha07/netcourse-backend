# Документация по API

## Базовый URL

/api

---

# Аутентификация

## POST /auth/register

Регистрация нового пользователя.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "123456",
  "username": "JohnDoe",
  "avatarUrl": "https://..."
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "JohnDoe",
    "role": "USER"
  }
}
```

## POST /auth/login

Авторизация, получение JWT.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "JohnDoe",
    "role": "USER"
  }
}
```

---

# Публичные маршруты

## Пользователи (Users)

Маршруты определены в `/users`. Требуется аутентификация.

### GET /users/:id

Получить пользователя по ID.

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "JohnDoe",
  "avatarUrl": "https://...",
  "role": "USER",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "enrollments": [],
  "progress": []
}
```

### PUT /users/:id

Обновить данные пользователя.

**Request Body:**
```json
{
  "username": "NewUsername",
  "avatarUrl": "https://..."
}
```

### DELETE /users/:id

Удалить пользователя.

---

## Курсы (Courses)

Маршруты определены в `/courses`.

### GET /courses

Получить все курсы.

**Response:**
```json
[
  {
    "id": 1,
    "title": "JS Basics",
    "description": "intro",
    "category": "programming",
    "enrollments": [],
    "sections": []
  }
]
```

### GET /courses/:courseId

Получить курс по ID.

**Response:**
```json
{
  "id": 1,
  "title": "JS Basics",
  "description": "intro",
  "category": "programming",
  "enrollments": [],
  "sections": []
}
```

---

## Записи на курсы (Enrollments)

Интегрированы в `/courses/:courseId/enrollments`.

### GET /courses/:courseId/enrollments

Получить всех записанных пользователей на курс.

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "courseId": 1,
    "enrolledAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "username": "JohnDoe",
      "avatarUrl": "https://...",
      "role": "USER"
    }
  }
]
```

**Примечание:** Для обычных пользователей возвращаются только их собственные записи. Для администраторов - все записи на курс.

### POST /courses/:courseId/enrollments

Создать запись на курс.

**Request Body:**
```json
{
  "userId": 1
}
```

### DELETE /courses/:courseId/enrollments/:enrollmentId

Удалить запись с курса.

---

## Разделы (Sections)

Маршруты: `/courses/:courseId/sections`.

### GET /courses/:courseId/sections

Получить все разделы курса.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Введение",
    "orderIndex": 0,
    "courseId": 1
  }
]
```

### GET /courses/:courseId/sections/:sectionId

Получить раздел по ID.

**Response:**
```json
{
  "id": 1,
  "title": "Введение",
  "orderIndex": 0,
  "courseId": 1,
  "lessons": [],
  "course": {
    "id": 1,
    "title": "JS Basics",
    "description": "intro",
    "category": "programming"
  }
}
```

---

## Уроки (Lessons)

Маршруты: `/courses/:courseId/sections/:sectionId/lessons`.

### GET /courses/:courseId/sections/:sectionId/lessons

Получить все уроки раздела.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Что такое JS",
    "contentType": "text",
    "videoUrl": null,
    "textContent": "# Markdown lesson",
    "orderIndex": 0,
    "sectionId": 1,
    "section": {
      "id": 1,
      "title": "Введение",
      "courseId": 1
    },
    "quizzes": []
  }
]
```

### GET /courses/:courseId/sections/:sectionId/lessons/:lessonId

Получить урок по ID.

**Response:**
```json
{
  "id": 1,
  "title": "Что такое JS",
  "contentType": "text",
  "videoUrl": null,
  "textContent": "# Markdown lesson",
  "orderIndex": 0,
  "sectionId": 1,
  "section": {
    "id": 1,
    "title": "Введение",
    "courseId": 1
  },
  "quizzes": []
}
```

---

## Прогресс (Progress)

Маршруты: `/courses/:courseId/progress`.

### GET /courses/:courseId/progress

Получить прогресс пользователя по курсу.

**Response (если прогресс существует):**
```json
{
  "id": 1,
  "userId": 1,
  "courseId": 1,
  "status": "in_progress",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Response (если прогресс не найден):**
```json
{
  "status": "not_started"
}
```

### PUT /courses/:courseId/progress

Создать или обновить прогресс.

**Request Body:**
```json
{
  "status": "completed"
}
```

**Допустимые значения status:**
- `"not_started"`
- `"in_progress"`
- `"completed"`

---

## Викторины (Quizzes)

Маршруты: `/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes`.

### GET /courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes

Получить все викторины урока.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Основы JS",
    "lessonId": 1,
    "lesson": {
      "id": 1,
      "title": "Что такое JS",
      "sectionId": 1
    },
    "questions": []
  }
]
```

### GET /courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId

Получить викторину по ID.

**Response:**
```json
{
  "id": 1,
  "title": "Основы JS",
  "lessonId": 1,
  "lesson": {
    "id": 1,
    "title": "Что такое JS",
    "sectionId": 1
  },
  "questions": [
    {
      "id": 1,
      "questionText": "Что такое переменная?",
      "questionType": "single",
      "quizId": 1,
      "answers": []
    }
  ]
}
```

---

## Вопросы (Questions)

Маршруты:
`/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions`

### GET /courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions

Получить все вопросы викторины.

**Response:**
```json
[
  {
    "id": 1,
    "questionText": "Что такое переменная?",
    "questionType": "single",
    "quizId": 1,
    "answers": []
  }
]
```

### GET /courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId

Получить вопрос по ID.

**Response:**
```json
{
  "id": 1,
  "questionText": "Что такое переменная?",
  "questionType": "single",
  "quizId": 1,
  "answers": [],
  "quiz": {
    "id": 1,
    "title": "Основы JS",
    "lessonId": 1
  }
}
```

---

## Ответы (Answers)

Маршрут:
`/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers`

### GET /courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers

Получить все ответы на вопрос.

**Response:**
```json
[
  {
    "id": 1,
    "answerText": "Контейнер для данных",
    "isCorrect": true,
    "questionId": 1,
    "question": {
      "id": 1,
      "questionText": "Что такое переменная?",
      "questionType": "single",
      "quizId": 1
    }
  }
]
```

### GET /courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers/:answerId

Получить ответ по ID.

**Response:**
```json
{
  "id": 1,
  "answerText": "Контейнер для данных",
  "isCorrect": true,
  "questionId": 1,
  "question": {
    "id": 1,
    "questionText": "Что такое переменная?",
    "questionType": "single",
    "quizId": 1
  }
}
```

---

## Сокращение ссылок (Shortener)

Маршруты: `/shorten`.

### POST /shorten

Создать короткую ссылку.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "short_url": "http://localhost/abc123",
  "original_url": "https://example.com"
}
```

### GET /shorten/:short

Перенаправление по короткой ссылке.

**Response:** HTTP 302 Redirect

---

# Админские маршруты

Все админские маршруты требуют аутентификацию и роль `ADMIN`.

## Пользователи (Users)

Маршруты определены в `/admin/users`.

### GET /admin/users

Получить список всех пользователей.

**Response:**
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "username": "JohnDoe",
    "avatarUrl": "https://...",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "enrollments": [],
    "progress": []
  }
]
```

### GET /admin/users/:id

Получить пользователя по ID.

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "JohnDoe",
  "avatarUrl": "https://...",
  "role": "USER",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "enrollments": [],
  "progress": []
}
```

### POST /admin/users

Создать нового пользователя.

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "123456",
  "username": "NewUser",
  "avatarUrl": "https://...",
  "role": "USER"
}
```

### PUT /admin/users/:id

Обновить пользователя.

**Request Body:**
```json
{
  "username": "UpdatedUsername",
  "role": "ADMIN"
}
```

### DELETE /admin/users/:id

Удалить пользователя.

---

## Курсы (Courses)

Маршруты определены в `/admin/courses`.

### GET /admin/courses

Получить все курсы.

**Response:**
```json
[
  {
    "id": 1,
    "title": "JS Basics",
    "description": "intro",
    "category": "programming",
    "enrollments": [],
    "sections": []
  }
]
```

### GET /admin/courses/:courseId

Получить курс по ID.

**Response:**
```json
{
  "id": 1,
  "title": "JS Basics",
  "description": "intro",
  "category": "programming",
  "enrollments": [],
  "sections": []
}
```

### POST /admin/courses

Создать новый курс.

**Request Body:**
```json
{
  "title": "JS Basics",
  "description": "intro",
  "category": "programming"
}
```

### PUT /admin/courses/:courseId

Обновить курс.

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "category": "web-development"
}
```

### DELETE /admin/courses/:courseId

Удалить курс.

---

## Разделы (Sections)

Маршруты: `/admin/courses/:courseId/sections`.

### GET /admin/courses/:courseId/sections

Получить все разделы курса.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Введение",
    "orderIndex": 0,
    "courseId": 1,
    "lessons": []
  }
]
```

### GET /admin/courses/:courseId/sections/:sectionId

Получить раздел по ID.

**Response:**
```json
{
  "id": 1,
  "title": "Введение",
  "orderIndex": 0,
  "courseId": 1,
  "lessons": [],
  "course": {
    "id": 1,
    "title": "JS Basics",
    "description": "intro",
    "category": "programming"
  }
}
```

### POST /admin/courses/:courseId/sections

Создать новый раздел.

**Request Body:**
```json
{
  "title": "Введение",
  "orderIndex": 0
}
```

### PUT /admin/courses/:courseId/sections/:sectionId

Обновить раздел.

**Request Body:**
```json
{
  "title": "Обновленное название",
  "orderIndex": 1
}
```

### DELETE /admin/courses/:courseId/sections/:sectionId

Удалить раздел.

---

## Уроки (Lessons)

Маршруты: `/admin/courses/:courseId/sections/:sectionId/lessons`.

### GET /admin/courses/:courseId/sections/:sectionId/lessons

Получить все уроки раздела.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Что такое JS",
    "contentType": "text",
    "videoUrl": null,
    "textContent": "# Markdown lesson",
    "orderIndex": 0,
    "sectionId": 1,
    "section": {
      "id": 1,
      "title": "Введение",
      "courseId": 1
    },
    "quizzes": []
  }
]
```

### GET /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId

Получить урок по ID.

**Response:**
```json
{
  "id": 1,
  "title": "Что такое JS",
  "contentType": "text",
  "videoUrl": null,
  "textContent": "# Markdown lesson",
  "orderIndex": 0,
  "sectionId": 1,
  "section": {
    "id": 1,
    "title": "Введение",
    "courseId": 1
  },
  "quizzes": []
}
```

### POST /admin/courses/:courseId/sections/:sectionId/lessons

Создать новый урок.

**Request Body:**
```json
{
  "title": "Что такое JS",
  "contentType": "text",
  "videoUrl": null,
  "textContent": "# Markdown lesson",
  "orderIndex": 0
}
```

**Допустимые значения contentType:**
- `"text"` - текстовый урок (Markdown)
- `"video"` - видео урок
- `"quiz"` - урок-викторина

### PUT /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId

Обновить урок.

**Request Body:**
```json
{
  "title": "Обновленное название",
  "textContent": "# Обновленный контент"
}
```

### DELETE /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId

Удалить урок.

---

## Прогресс (Progress)

Маршруты: `/admin/courses/:courseId/progress`.

### GET /admin/courses/:courseId/progress

Получить прогресс всех пользователей по курсу (только для администраторов).

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "courseId": 1,
    "status": "in_progress",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "username": "JohnDoe",
      "role": "USER"
    }
  }
]
```

### GET /admin/courses/:courseId/progress/:userId

Получить прогресс конкретного пользователя по курсу (только для администраторов).

**Response (если прогресс существует):**
```json
{
  "id": 1,
  "userId": 1,
  "courseId": 1,
  "status": "in_progress",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Response (если прогресс не найден):**
```json
{
  "status": "not_started"
}
```

### PUT /admin/courses/:courseId/progress/:userId

Создать или обновить прогресс пользователя (только для администраторов).

**Request Body:**
```json
{
  "status": "completed"
}
```

**Допустимые значения status:**
- `"not_started"`
- `"in_progress"`
- `"completed"`

---

## Викторины (Quizzes)

Маршруты: `/admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes`.

### GET /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes

Получить все викторины урока.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Основы JS",
    "lessonId": 1,
    "lesson": {
      "id": 1,
      "title": "Что такое JS",
      "sectionId": 1
    },
    "questions": []
  }
]
```

### GET /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId

Получить викторину по ID.

**Response:**
```json
{
  "id": 1,
  "title": "Основы JS",
  "lessonId": 1,
  "lesson": {
    "id": 1,
    "title": "Что такое JS",
    "sectionId": 1
  },
  "questions": [
    {
      "id": 1,
      "questionText": "Что такое переменная?",
      "questionType": "single",
      "quizId": 1,
      "answers": []
    }
  ]
}
```

### POST /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes

Создать новую викторину.

**Request Body:**
```json
{
  "title": "Основы JS"
}
```

### PUT /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId

Обновить викторину.

**Request Body:**
```json
{
  "title": "Обновленное название викторины"
}
```

### DELETE /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId

Удалить викторину.

---

## Вопросы (Questions)

Маршруты:
`/admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions`

### GET /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions

Получить все вопросы викторины.

**Response:**
```json
[
  {
    "id": 1,
    "questionText": "Что такое переменная?",
    "questionType": "single",
    "quizId": 1,
    "answers": []
  }
]
```

### GET /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId

Получить вопрос по ID.

**Response:**
```json
{
  "id": 1,
  "questionText": "Что такое переменная?",
  "questionType": "single",
  "quizId": 1,
  "answers": [],
  "quiz": {
    "id": 1,
    "title": "Основы JS",
    "lessonId": 1
  }
}
```

### POST /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions

Создать новый вопрос.

**Request Body:**
```json
{
  "questionText": "Что такое переменная?",
  "questionType": "single"
}
```

**Допустимые значения questionType:**
- `"single"` - один правильный ответ
- `"multiple"` - несколько правильных ответов
- `"text"` - текстовый ответ

### PUT /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId

Обновить вопрос.

**Request Body:**
```json
{
  "questionText": "Обновленный текст вопроса?",
  "questionType": "multiple"
}
```

### DELETE /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId

Удалить вопрос.

---

## Ответы (Answers)

Маршрут:
`/admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers`

### GET /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers

Получить все ответы на вопрос.

**Response:**
```json
[
  {
    "id": 1,
    "answerText": "Контейнер для данных",
    "isCorrect": true,
    "questionId": 1,
    "question": {
      "id": 1,
      "questionText": "Что такое переменная?",
      "questionType": "single",
      "quizId": 1
    }
  }
]
```

### GET /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers/:answerId

Получить ответ по ID.

**Response:**
```json
{
  "id": 1,
  "answerText": "Контейнер для данных",
  "isCorrect": true,
  "questionId": 1,
  "question": {
    "id": 1,
    "questionText": "Что такое переменная?",
    "questionType": "single",
    "quizId": 1
  }
}
```

### POST /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers

Создать новый ответ.

**Request Body:**
```json
{
  "answerText": "Контейнер для данных",
  "isCorrect": true
}
```

### PUT /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers/:answerId

Обновить ответ.

**Request Body:**
```json
{
  "answerText": "Обновленный текст ответа",
  "isCorrect": false
}
```

### DELETE /admin/courses/:courseId/sections/:sectionId/lessons/:lessonId/quizzes/:quizId/questions/:questionId/answers/:answerId

Удалить ответ.

---

## Общие замечания

### Аутентификация

Для доступа к защищенным маршрутам необходимо передавать JWT токен в заголовке:

```
Authorization: Bearer <your_jwt_token>
```

### Коды ответов

- `200` - успешный запрос
- `201` - ресурс создан
- `204` - успешное удаление (без тела ответа)
- `400` - ошибка валидации
- `401` - не авторизован
- `403` - доступ запрещен
- `404` - ресурс не найден
- `500` - внутренняя ошибка сервера

### Формат ошибок

```json
{
  "error": "Описание ошибки"
}
```