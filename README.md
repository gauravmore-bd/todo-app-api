# 📝 RelooMate - Todo App API

RelooMate Todo App is a feature-rich backend service built with **Node.js**, **Express**, and **MongoDB**, designed to manage daily tasks with JWT authentication, ratings, progress tracking, and due dates.

---

## 🚀 Features

- 🔐 JWT-based user authentication (register/login)
- ➕ Create, Read, Update, Delete (CRUD) tasks
- 🌟 Rate completed tasks (1-5 stars)
- 📊 View average rating across tasks
- 📅 Add due dates to tasks
- 📈 Track progress with completion stats

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT
- **Environment Management**: dotenv

---

## 📁 Project Structure

```
├── controllers/
├── middlewares/
├── models/
├── routes/
├── .env
├── server.js
```

---

## 🔑 Environment Variables (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## 📦 Installation

```bash
git clone https://github.com/your-repo/reloomate-todo-api.git
cd reloomate-todo-api
npm install
npm run dev
```

---

## 📮 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint     | Description         |
|--------|--------------|---------------------|
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user         |

### ✅ Task Routes (Protected with JWT)

| Method | Endpoint                     | Description               |
|--------|------------------------------|---------------------------|
| POST   | /api/tasks                   | Create a new task         |
| GET    | /api/tasks                   | Get all tasks             |
| PUT    | /api/tasks/:id               | Update a task             |
| DELETE | /api/tasks/:id               | Delete a task             |
| POST   | /api/tasks/:id/rate          | Rate a completed task     |
| GET    | /api/tasks/stats/average-rating | Get average task rating |
| GET    | /api/tasks/progress          | Get task progress summary |

---

## 🧠 Bonus Features

- ⏰ Due Date field for task reminders
- 📊 Progress analytics (completed vs total tasks)

---

## 🧪 API Testing with Postman

All API endpoints have been tested using [Postman](https://www.postman.com/).

### ✅ Tested Endpoints

#### Authentication
- `POST /api/auth/register` – Register new users
- `POST /api/auth/login` – User login and token generation

#### Task Management
- `POST /api/tasks` – Create new task
- `GET /api/tasks` – Get all tasks of the user
- `PUT /api/tasks/:id` – Update a task
- `DELETE /api/tasks/:id` – Delete a task
- `POST /api/tasks/:id/rate` – Rate a completed task
- `GET /api/tasks/stats/average-rating` – Get average rating of tasks
- `GET /api/tasks/progress` – Get task completion progress

---

### 📥 Postman Collection

You can import this Postman collection to test all endpoints manually:

👉 [Download todo-app-api.postman_collection.json](./todo-app-api.postman_collection.json)

To use:
1. Open Postman.
2. Click **Import** > **Upload Files**.
3. Select `todo-app-api.postman_collection.json` from the project root.
4. Set up environment variable `token` to use the protected routes.

---

### 🔐 Authorization Notes

Most routes are protected. You need to:
- First call `POST /api/auth/login`
- Copy the token from the response
- Use it as a **Bearer Token** in the `Authorization` header of your requests

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests.

---

## 📝 License

This project is licensed under MIT.

---

