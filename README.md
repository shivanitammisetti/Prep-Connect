# PrepConnect 

PrepConnect is a MERN stack web application designed to help unplaced students and interview aspirants prepare effectively with structured guidance, resources, and mentorship support from seniors and alumni.

---

##  Problem Statement

Many students struggle with career direction, interview preparation, and lack of proper mentorship. PrepConnect aims to bridge this gap by providing a single platform for learning roadmaps, doubt-solving, and guidance from experienced seniors.

---

##  Key Features

* User Authentication (Login & Signup)
* Student Dashboard
* Ask Doubts feature
* View Doubts posted by students
* Guidance from seniors / alumni (conceptual)
* Structured preparation support for interviews

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* HTML5, CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Tools & Platforms

* VS Code
* MongoDB Atlas / Local MongoDB
* Git & GitHub

---

## Project Structure

```
prepconnect/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── .gitignore
```

---

## Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/23wh1a0552/prepconnect.git
cd prepconnect
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGODB_URI=mongodb://localhost:27017/prepconnect
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## Future Enhancements

* Role-based access (Student / Alumni)
* Answer doubts feature
* Roadmap & resource recommendations
* Profile & progress tracking
* UI/UX improvements

---
