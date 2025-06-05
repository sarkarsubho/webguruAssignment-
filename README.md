# MERN Stack Admin Panel & User Dashboard

A full-stack application with **JWT-based authentication**, **role-based access**, **task management**, and **user control**, built using the **MERN stack** (MongoDB, Express, React, Node.js).

---

## 🚀 Features

### 👤 User Panel

* Register/Login
* View Dashboard
* JWT-based session

### 🔐 Admin Panel

* Secure Login (role = 'admin')
* View list of users
* Change user status (active/inactive)

  * Users are force-logged out if status changes
* View paginated task list (5/page)
* Bulk selection and action on tasks (completed/pending)
* Select-all support across pages

---

## 📦 Tech Stack

* **Frontend**: React.js, React Router, Axios, TailwindCSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JWT (versioned for session invalidation)

---

## 🔧 Setup Instructions

### 📁 Clone the Repo

```bash
git clone <your-repo-url>
cd mern-admin-dashboard
```

---

### ⚙️ Backend Setup (Node.js + Express)

```bash
cd backend
npm install

# .env file (create manually)
PORT=8080
MONGO_URI=<your_mongo_connection>
JWT_SECRET=<your_jwt_secret>
```

#### Run Backend

```bash
npm run dev // local

npm run start // production
```

Server will start at `http://localhost:8080`

---

### 💻 Frontend Setup (React)

```bash
cd frontend
npm install
```

#### Run Frontend

```bash
npm run dev
```

React app will be available at `http://localhost:5173`

---

## 🧪 Dummy Admin Account (Manual Creation)

In MongoDB create a user manually with:

```json
run this script
node  src/scripts/createAdmin.js
```

---

## 📁 Folder Structure

```bash
backend/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  └── server.js

frontend/
  ├── components/
  ├── context/
  ├── pages/
  ├── utils/
  └── main.jsx
```


## 🎨 Styled with TailwindCSS
---


## ✨ Future Improvements

* Add Toast Notifications
* Edit/Delete for tasks
* Upload profile picture
* Add filters/search on tasks

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss.

---
