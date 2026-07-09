
# 📋 Task Manager App

A full-stack Task Manager application built with the **MERN Stack** that allows users to register, log in, and manage their daily tasks efficiently.

## 🚀 Features

- 🔐 User Authentication (Register & Login)
- ✅ Create Tasks
- ✏️ Edit Tasks
- 🗑️ Delete Tasks
- 🔍 Search Tasks
- 📄 Pagination
- 🎯 Task Priority (Low, Medium, High)
- 🔒 JWT Authentication
- 📱 Responsive Design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router DOM
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv

---

## 📁 Project Structure

```
TASK-MANAGER/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Ayesha-tabasum/TASK-MANAGER.git
```

```bash
cd TASK-MANAGER
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the **server** folder.

Example:

```env
PORT=5000
MONGO_URI=*****************************
JWT_SECRET=*******************
```

Start the backend:

```bash
npm run dev
```

---

## Frontend Setup

Open a new terminal.

```bash
cd client
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5000
```

Run the frontend.

```bash
npm run dev
```

---



---

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

### Tasks

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/tasks | Get All Tasks |
| POST | /api/tasks | Create Task |
| PUT | /api/tasks/:id | Update Task |
| DELETE | /api/tasks/:id | Delete Task |
| GET | /api/tasks/search | Search Tasks |

---

## 👨‍💻 Author
Ayesha-tabasum
****

GitHub: https://github.com/Ayesha-tabasum

---



This project is licensed under the MIT License.
