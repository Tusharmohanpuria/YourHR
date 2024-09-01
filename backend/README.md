
# YourHR

<div align="center">

[![Visit Live Site](https://img.shields.io/badge/Visit_Live_Site-007bff?style=for-the-badge&logo=firefox-browser&logoColor=white)](https://yourhr-app.onrender.com)

</div>

YourHR is a comprehensive web application designed to streamline the management of resumes and professional profiles. With a multi-stage profile creation process, resume upload functionality, and secure user authentication, YourHR ensures users can present their credentials effectively and efficiently.

---

## 📋 Table of Contents
- [✨ Features](#-features)
- [🛠 Technology Stack](#-technology-stack)
- [⚙️ Installation](#-installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [🔐 Environment Variables](#-environment-variables)
- [🚀 Running the Project](#-running-the-project)
- [🔧 Backend](#-backend)
- [💻 Frontend](#-frontend)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## ✨ Features
- **🔒 User Authentication:** Secure sign-up, login, and session management with JWT tokens.
- **📝 Multi-Stage Profile Creation:** Users can enter their personal, educational, professional, project, and skill details through a multi-stage form.
- **📂 Resume Management:** Upload, view, and manage resumes with ease.
- **👤 Profile Viewing:** View and edit profiles with all information neatly organized.

---

## 🛠 Technology Stack
- **Frontend:** React, Bootstrap, Formik, Yup, React Router
- **Backend:** Node.js, Express.js, Firebase, JWT, Multer
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage for resume uploads
- **Authentication:** JWT for secure token-based authentication
- **Form Validation:** Formik and Yup

---

## ⚙️ Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- Firebase account

### Steps

#### 1. Clone the Repository:
```bash
git clone https://github.com/yourusername/yourhr.git
cd yourhr
```

#### 2. Backend Setup:
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

#### 3. Frontend Setup:
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

---

## 🔐 Environment Variables

### Backend:
Create a `.env` file in the `backend` directory and add the following:
```bash
PORT=5000
FIREBASE_API_KEY=<Your Firebase API Key>
FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
FIREBASE_PROJECT_ID=<Your Firebase Project ID>
FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket>
FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
FIREBASE_APP_ID=<Your Firebase App ID>
JWT_SECRET=<Your JWT Secret>
```

### Frontend:
Create a `.env` file in the `frontend` directory and add:
```bash
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Project

### Backend: 
Start the backend server:
```bash
cd backend
npm start
```

### Frontend: 
Start the frontend server:
```bash
cd frontend
npm start
```
The application will be accessible at `http://localhost:3000`.

---

## 🔧 Backend
The backend is built using Node.js and Express.js, with Firebase handling the database and file storage.

### API Endpoints
- `/api/auth/signup`: User registration.
- `/api/auth/login`: User login.
- `/api/user/profile`: Get user profile.
- `/api/user/upload-resume`: Upload user resume.

### Middleware
- **Auth Middleware:** Verifies JWT tokens for protected routes.
- **Error Handling Middleware:** Handles errors uniformly across the application.

### Services
- **Firebase Service:** Manages interactions with Firebase for database queries and file storage.

### Controllers
- **Auth Controller:** Handles signup and login logic.
- **User Controller:** Manages profile retrieval, updating, and resume uploading.

---

## 💻 Frontend
The frontend is built with React and utilizes React Router for navigation, Formik for form handling, and Bootstrap for styling.

### Pages
- **🏠 Home:** Landing page with options to sign up or log in.
- **🔑 Login:** Login page for existing users.
- **📝 Signup:** Multi-stage signup form for new users.
- **📊 Dashboard:** User dashboard displaying profile information.
- **👤 Profile:** Page for updating profile details and uploading resumes.

### Components
- **Header & Footer:** Common layout components.
- **PrivateRoute:** Component that protects routes by ensuring the user is authenticated.
- **MultiStageForm:** Handles the multi-step profile creation process.

---

## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

---

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
