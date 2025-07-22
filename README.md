# 📝 Blog Post App – Capstone Project

A modern full-stack blog platform where users can create, update, and delete blog posts after logging in via **GitHub OAuth2**.  
This project showcases a production-ready architecture using **Java 22**, **Spring Boot**, **React**, **MongoDB**, and **CI/CD pipelines**.

🔗 **Live Demo:**  
👉 [https://blog-post-app-capstone.onrender.com](https://blog-post-app-capstone.onrender.com)

---

## 📦 Project Structure

```
blog-post-app-capstone/
│
├── backend/        # Java Spring Boot (REST API + GitHub OAuth2)
├── frontend/       # React + TypeScript + Vite
├── .github/        # GitHub Actions workflows for CI/CD
├── Dockerfile      # Optional Docker setup
└── sonar-project.properties
```

---

## 🚀 Technologies Used

### Backend
- Java 22
- Spring Boot
- Spring Web
- Spring Data MongoDB
- Spring Security with GitHub OAuth2
- Lombok
- Maven

### Frontend
- React 
- TypeScript
- Vite
- Axios

### DevOps & Deployment
- **CI/CD:** GitHub Actions
- **Code Quality:** SonarCloud
- **Deployment:** Render.com
- **Database:** MongoDB Atlas

---

## 🔐 Authentication

Authentication is implemented using **GitHub OAuth 2.0**.

- Only authenticated users can create, edit, or delete posts
- Uses Spring Security for token-based session management
- GitHub login is integrated in the frontend and backend

---

## ✨ Features

### ✅ General:
- Full-stack blog management app
- Clean and modular codebase
- End-to-end type safety with DTOs and TypeScript

### 🔧 Backend:
- RESTful API for managing blog posts
- MongoDB-based data persistence
- OAuth2 authentication with GitHub
- DTO & service-layer architecture
- SonarCloud integration
- Deployed on Render

### 🎨 Frontend:
- View, create, update, and delete blog posts
- GitHub login via OAuth2
- React hooks and functional components
- Dynamic routing with React Router
- Type-safe API handling with Axios
- Vite-powered fast development build

---

## 🧪 Getting Started Locally

### Prerequisites
- Java 22
- Node.js (v16+ recommended)
- MongoDB URI (e.g., from MongoDB Atlas)
- GitHub OAuth credentials (client ID & secret)

### 1. Clone the Repository
```bash
git clone https://github.com/Pourya-Nejadensan/blog-post-app-capstone.git
cd blog-post-app-capstone
```

### 2. Start Backend
```bash
cd backend
./mvnw spring-boot:run
```

You will need the following properties in your `application.properties`:

```properties
spring.data.mongodb.uri=YOUR_MONGODB_URI
spring.security.oauth2.client.registration.github.client-id=YOUR_CLIENT_ID
spring.security.oauth2.client.registration.github.client-secret=YOUR_CLIENT_SECRET
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Update your `.env` or config to point to the local or deployed backend API.

---

## 🚀 Deployment

The app is fully deployed and available at:

🌐 **Frontend + Backend (Render):**  
[https://blog-post-app-capstone.onrender.com](https://blog-post-app-capstone.onrender.com)

You can fork this repo and deploy to [Render](https://render.com) using their Git integration.

---

## ⚙️ CI/CD & Code Quality

- ✅ **GitHub Actions**: Automated workflows for build, test, and deploy
- 🧠 **SonarCloud**: Static analysis for both frontend and backend

---

## 📬 Author

Made with ❤️ by **Pourya Nejadensan**  
🔗 [GitHub Profile](https://github.com/Pourya-Nejadensan)

---

## 📝 License

This project is licensed under the MIT License. Feel free to use, fork, or contribute!
