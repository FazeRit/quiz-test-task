# Quiz Builder

A full-stack quiz creation and management application with a modern React frontend and Node.js backend.

## 🌟 Overview

Quiz Builder allows users to create, manage, and take quizzes with multiple question types. The application features user authentication, real-time updates, and a responsive design.

### Key Features

- **📝 Quiz Creation**: Create quizzes with multiple question types (Multiple Choice, True/False, Text Input)
- **👥 User Authentication**: Secure sign-up and sign-in functionality  
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Real-time Updates**: Efficient data fetching and caching
- **🗂️ Quiz Management**: View, edit, and delete quizzes
- **🔍 Quiz Details**: Detailed view of quiz structure and questions

## 🏗️ Architecture

```
quiz-task/
├── frontend/           # React TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── backend/            # Node.js TypeScript backend
│   ├── src/
│   ├── prisma/         # Database schema and migrations
│   ├── package.json
│   └── README.md
└── README.md          # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **Zustand** for state management
- **React Query** for data fetching
- **React Hook Form + Zod** for form validation
- **React Router DOM** for routing

### Backend
- **Node.js** with TypeScript
- **NestJS** framework
- **Prisma ORM** for database management
- **PostgreSQL** database
- **JWT** for authentication
- **Bcrypt** for password hashing

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (version 12 or higher)
- **Git**

### 1. Clone the Repository

```bash
git clone <repository-url>
cd quiz-task
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up database
npm run db:setup

# Start the backend server
npm run start:dev
```

The backend will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env if needed (default backend URL is http://localhost:5000)

# Start the frontend development server
npm start
```

The frontend will be available at `http://localhost:3000`

## 📊 Database Setup

### Using PostgreSQL

1. **Install PostgreSQL** on your system
2. **Create a database** for the application:
   ```sql
   CREATE DATABASE quiz_builder;
   ```
3. **Update backend .env** with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/quiz_builder"
   ```
4. **Run migrations**:
   ```bash
   cd backend
   npm run db:migrate
   ```

### Using Docker (Alternative)

```bash
# Start PostgreSQL with Docker
docker run --name quiz-postgres \
  -e POSTGRES_DB=quiz_builder \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:13

# Update backend .env
DATABASE_URL="postgresql://admin:password@localhost:5432/quiz_builder"
```

## 🎯 Creating a Sample Quiz

Follow these steps to create your first quiz:

### 1. Start Both Servers

```bash
# Terminal 1 - Backend
cd backend && npm run start:dev

# Terminal 2 - Frontend  
cd frontend && npm start
```

### 2. Create an Account

1. Navigate to `http://localhost:3000`
2. Click "Sign Up" 
3. Fill in your details:
   - Email: `demo@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
4. Click "Sign Up"

### 3. Create a Sample Quiz

1. Click "CREATE QUIZ" on the dashboard
2. Fill in quiz details:
   - **Title**: "General Knowledge Quiz"
   - **Description**: "Test your general knowledge"

3. Add questions:

   **Question 1 (Multiple Choice):**
   - Text: "What is the capital of France?"
   - Type: Multiple Choice
   - Options:
     - "London" 
     - "Paris" ✓ (mark as correct)
     - "Berlin"
     - "Rome"

   **Question 2 (True/False):**
   - Click "ADD QUESTION"
   - Text: "The Earth is the third planet from the Sun"
   - Type: True/False
   - Select "True" as correct

   **Question 3 (Text Input):**
   - Click "ADD QUESTION"
   - Text: "What is 10 + 15?"
   - Type: Text Input

4. Click "CREATE QUIZ" to save

### 4. View and Manage Quizzes

- **View all quizzes**: Navigate to the quiz list
- **View quiz details**: Click on any quiz card
- **Delete quiz**: Click the delete icon (🗑️) on a quiz card

## 🔧 Development

### Backend Development

```bash
cd backend

# Start in development mode
npm run start:dev

# Run tests
npm run test

# Build for production
npm run build

# Database operations
npm run db:migrate      # Run migrations
npm run db:seed         # Seed database
npm run db:reset        # Reset database
```

### Frontend Development

```bash
cd frontend

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint
```

## 📡 API Endpoints

### Authentication
- `POST /auth/sign-up` - Register new user
- `POST /auth/sign-in` - Authenticate user

### Quizzes
- `GET /quizzes` - Get all quizzes
- `GET /quizzes/:id` - Get quiz by ID
- `POST /quizzes` - Create new quiz
- `PUT /quizzes/:id` - Update quiz
- `DELETE /quizzes/:id` - Delete quiz

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

## 🔐 Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/quiz_builder"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:3000"
```

### Frontend (.env)
```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000

# Other configurations
REACT_APP_ENVIRONMENT=development
```

## 🚀 Deployment

### Backend Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Deploy to your preferred platform** (Heroku, AWS, etc.)

### Frontend Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your static hosting service (Netlify, Vercel, etc.)

## 🐛 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Check PostgreSQL is running
   - Verify DATABASE_URL in backend .env
   - Ensure database exists

2. **CORS issues**
   - Check CORS_ORIGIN in backend .env
   - Ensure frontend URL matches

3. **Authentication problems**
   - Check JWT_SECRET is set
   - Clear browser localStorage
   - Verify token expiration

4. **Port conflicts**
   - Backend default: 5000
   - Frontend default: 3000
   - Change ports if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- React team for the amazing framework
- NestJS team for the backend framework
- Material-UI team for the component library
- All open-source contributors 