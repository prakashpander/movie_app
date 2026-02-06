# 🎬 Movie Management System (Full-Stack)

A modern, responsive movie web application built with the MERN stack. This project features a sleek dark-themed interface for users to browse movies and a powerful Admin Dashboard for managing the movie catalog, with secure JWT authentication and Cloudinary integration for image storage.

---

## 🚀 Live Demo & Links
- **Frontend Live:** [Your Vercel/Netlify Link Here]
- **Backend API:** [Your Render/Railway Link Here]
- **GitHub Repo:** https://github.com/prakashpander/movie_app

---

## 📖 Project Overview
This project is a full-scale application where I handled everything from database design to UI/UX. 
- **The Data:** I curated movie information and stored it in a custom **MongoDB** database.
- **The Backend:** Built a secure REST API using **Node.js** and **Express**.
- **The Frontend:** Created a dynamic SPA using **React 19** and **Tailwind CSS**.

---

## ✨ Features

### 👤 User Side
- **Browsing:** View all movies with high-quality posters from Cloudinary.
- **Search & Sort:** Instant search by title and sorting by Rating or Release Date.
- **Authentication:** Secure Signup/Login flow for regular users.
- **Responsive:** Mobile-first design that works on all devices.

### 🔐 Admin Side (Protected)
- **Full CRUD:** Add new movies, update existing details, or delete movies.
- **Image Upload:** Integrated **Multer** and **Cloudinary** for cloud-based image hosting.
- **Secure Access:** Only admins can access the management dashboard through protected routes.

---

## 🛠️ Technologies Used

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, React Router 7, Axios, React Toastify |
| **Backend** | Node.js, Express.js, JWT, Bcrypt, Cookie-parser, Multer |
| **Database** | MongoDB, Mongoose |
| **Cloud** | Cloudinary (For Movie Posters) |

---

## 📂 Folder Structure

```text
movie_app/
├── Backend/
│   ├── src/
│   │   ├── controllers/   # Auth & Movie Logic
│   │   ├── middleware/    # Auth Guards & Image Upload
│   │   ├── models/        # MongoDB Schemas (User & Movie)
│   │   └── routes/        # API Endpoints (/api/v1)
│   └── server.js          # Server Entry Point
└── Frontend/
    ├── src/
    │   ├── context/       # AuthContext for global login state
    │   ├── pages/         # User & Admin Dashboards, Login, Signup
    │   ├── utils/         # Axios Instance with Interceptors
    │   └── components/    # Navbar, MovieCards, Skeletons
    └── main.jsx           # React Entry Point
🧠 Key Learnings & Challenges
JWT Persistence: I learned how to keep users logged in using localStorage and syncing it with React Context on page refresh.

Secure Image Flow: Implemented a workflow where images are uploaded from the frontend, processed by Multer in the backend, and stored in Cloudinary.

Axios Interceptors: Created a centralized API handler to automatically attach Bearer tokens to every admin request.

Error Handling: Built a global error-handling middleware in Express to send clean error messages to the frontend.

⚙️ Installation & Setup
1. Backend Setup
Bash
cd Backend
npm install
Create a .env file in the Backend folder:

Code snippet
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret
2. Frontend Setup
Bash
cd Frontend
npm install
Create a .env file in the Frontend folder:

Code snippet
VITE_BASE_URL=http://localhost:3000/api/v1
3. Running the App
Backend: node server.js (Runs on port 3000)

Frontend: npm run dev (Runs on port 5173)

🚀 Future Enhancements
[ ] Implement Refresh Tokens for better security.

[ ] Add User Reviews and Rating system.

[ ] Add Email Verification for new signups.

[ ] Implement Pagination for large movie lists.

🤝 Contact
Prakash Pander

LinkedIn: prakash-pander-5151a2341

GitHub: @prakashpander

Email: prakashpander704@gmail.com