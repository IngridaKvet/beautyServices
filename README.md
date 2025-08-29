# ✅ Beauty Services Management App – Full Stack Overview

This is a full-stack **beauty services Management App** built with **React (Vite)** for the frontend and **Node.js (Express)** with **PostgreSQL** for the backend. It supports **user authentication**, and uses **JWT for Authentication**.

---

## 🛠 Project Initialization

### 🔷 1. Set Up Backend

```bash
cd backend
npm install
```

**Set up `.env` file** in `backend/`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
JWT_SECRET=your_super_secret_jwt_key
```

**Start PostgreSQL and import the SQL backups** from `/sql_tables` if needed.

```bash
npm run start
```

---

### 🔷 2. Set Up Frontend

```bash
npm install
```

**Create `.env` in `frontend/`**:

```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

---

## 🚀 Tech Stack

### Frontend

- **React + Vite**
- **Routing**: React Router (with lazy loading)
- **State Management**: React Context, useState
- **HTTP Requests**: Axios
- **Notifications**: react-hot-toast
- **Styling**: Scoped CSS
- **Auth**: JWT stored in cookies
- **Error Handling**: Custom ErrorBoundary component

### Backend

- **Node.js + Express**
- **Database**: PostgreSQL
- **Authentication**: JWT + argon2 password hashing
- **RESTful API** with CRUD operations for tasks, categories, and users

---

## 🧩 Frontend Routing Overview

| Path      | Component | Lazy Loaded | Protected |
| --------- | --------- | ----------- | --------- |
| `/login`  | Login     | ✅          | ❌        |
| `/signup` | Signup    | ✅          | ❌        |

## all other protected

## 🧩 Logins

For simple user to create use registration form
For admin use:
ing1@gmail.com
pass
