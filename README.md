# Todo Application

A React todo application built with Next.js, Node and Express.
Backend is a simple REST-api with the basic CRUD functions and stores an array with todos.

---

## Table of Contents

- [Getting Started](#getting-started)
- [1. Run Backend (Node and Express)](#1-run-backend-node-and-express)
- [2. Run Frontend (React App)](#2-run-frontend-react-app)
- [3. Finished!](#3-finished)
- [Dependencies](#dependencies)
- [Notes](#notes)

---

# Getting Started

Before starting, ensure that **port 3000** (frontend) and **port 8080** (backend) are free on your machine.

---

## 1. Run Backend (Node and Express)

1. **Open a terminal and navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```
3. **Start the backend server:**
   ```bash
   node index.js
   ```

## 2. Run Frontend (React App)

1. **Open another terminal and navigate to the frontend directory.**

   ```bash
   cd frontend


   ```

2. **install the dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

## 3. Finished!

Open http://localhost:3000 in your browser to see the Todo application.

---

# Dependencies

## Backend

- Express
- UUID
- CORS
- Node (version 18 or higher)

## Frontend

- React
- Axios
- FontAwesome
- Next.js

## Notes

API-documentation: [Todo API](https://app.swaggerhub.com/apis/HannahLindback/TodoApi/1.0.0#/)

Ensure that you have Node.js (version 18 or higher) and npm installed on your machine.
The backend server runs on http://localhost:8080.
The frontend development server runs on http://localhost:3000.

Troubleshooting
If you encounter issues with ports being in use, ensure that no other applications are running on ports 3000 and 8080.
