# Todo Application

A simple Todo application featuring separate frontend and backend components. The backend is built with Node.js and Express, while the frontend uses React.

---

## Table of Contents

- [Getting Started](#getting-started)
- [1. Run Backend (Node and Express)](#1-run-backend-node-and-express)
- [2. Run Frontend (React App)](#2-run-frontend-react-app)
- [3. Finished!](#3-finished)
- [Dependencies](#dependencies)
- [Notes](#notes)

---

## Getting Started

Before starting, ensure that **port 3000** (frontend) and **port 8080** (backend) are free on your machine.

---

## 1. Run Backend (Node and Express)

1. **Navigate to the backend directory:**
   ```bash
   cd path/to/backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node index.js
   ```

## 2. Run Frontend (React App)

1. Open another terminal and navigate to the frontend directory.
2. install the dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 3. Finished!

Open http://localhost:3000 in your browser to see the result.

Dependencies

Backend

- Express
- UUID
- CORS

Frontend

- React
- Axios
- FontAwesome
- Next.js (if applicable)

Notes
Ensure that you have Node.js (version 18 or higher) and npm installed on your machine.
The backend server runs on http://localhost:8080.
The frontend development server runs on http://localhost:3000.

Troubleshooting
If you encounter issues with ports being in use, ensure that no other applications are running on ports 3000 and 8080.
