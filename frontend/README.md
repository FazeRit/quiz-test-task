# Quiz Builder - Frontend

A modern React-based quiz creation and management application built with TypeScript, Material-UI, and React Query.

## 🚀 Features

- **Quiz Creation**: Create quizzes with multiple question types
  - Multiple Choice questions
  - True/False questions  
  - Text Input questions
- **Quiz Management**: View, list, and delete quizzes
- **User Authentication**: Sign up and sign in functionality
- **Responsive Design**: Mobile-friendly interface with Material-UI
- **Real-time Updates**: React Query for efficient data fetching and caching
- **Form Validation**: Zod schema validation with React Hook Form

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand with persistence
- **Data Fetching**: React Query (@tanstack/react-query)
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Styling**: Emotion (CSS-in-JS)
- **Architecture**: Feature-Sliced Design (FSD)

## 📋 Prerequisites

Before running the application, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Backend server** running on `http://localhost:5000`

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd quiz-task/frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the frontend root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

### 4. Start the Development Server

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## 🗄️ Backend Setup

The frontend requires a backend server running on port 5000. Please refer to the backend README for setup instructions.

**Backend endpoints used:**
- `POST /auth/sign-up` - User registration
- `POST /auth/sign-in` - User authentication
- `GET /quizzes` - Get all quizzes
- `GET /quizzes/:id` - Get quiz by ID
- `POST /quizzes` - Create new quiz
- `DELETE /quizzes/:id` - Delete quiz

## 📖 Usage

### Creating a Sample Quiz

1. **Start the Application**
   - Ensure both frontend and backend are running
   - Navigate to `http://localhost:3000`

2. **Sign Up/Sign In**
   - Create a new account or sign in with existing credentials
   - Fill in email, password, and confirm password (for sign up)

3. **Create a New Quiz**
   - Click "CREATE QUIZ" button on the quiz list page
   - Fill in quiz details:
     - **Title**: "Sample Knowledge Quiz"
     - **Description**: "A quiz to test general knowledge"

4. **Add Questions**
   
   **Multiple Choice Question:**
   - Question Text: "What is the capital of France?"
   - Type: Multiple Choice
   - Options:
     - "London" (incorrect)
     - "Paris" (correct ✓)
     - "Berlin" (incorrect)
     - "Madrid" (incorrect)

   **True/False Question:**
   - Click "ADD QUESTION"
   - Question Text: "The Earth is flat"
   - Type: True/False
   - Select "False" as correct answer

   **Text Input Question:**
   - Click "ADD QUESTION"
   - Question Text: "What is 2 + 2?"
   - Type: Text Input
   - (No options needed for text input)

5. **Save the Quiz**
   - Click "CREATE QUIZ" button
   - The quiz will be saved and you'll be redirected to the quiz list

### Managing Quizzes

- **View All Quizzes**: Navigate to `/quizzes` to see all created quizzes
- **View Quiz Details**: Click on any quiz card to view its details
- **Delete Quiz**: Click the delete icon on any quiz card (confirmation required)

## 🏗️ Project Structure

```
src/
├── app/                    # App-level configuration
│   ├── providers/          # Global providers (Router, Theme, Query, Toast)
│   └── store/             # Zustand stores (Auth, Quiz)
├── entities/              # Business entities
│   ├── quiz/              # Quiz models and API
│   └── user/              # User models and API
├── features/              # Feature-specific code
│   ├── auth/              # Authentication features
│   ├── create-quiz/       # Quiz creation
│   ├── delete-quiz/       # Quiz deletion
│   ├── quiz-detail/       # Quiz details view
│   └── quiz-list/         # Quiz listing
├── pages/                 # Page components
│   ├── auth/              # Auth pages (Sign In/Up)
│   ├── quiz-create/       # Quiz creation page
│   ├── quiz-detail/       # Quiz detail page
│   └── quiz-list/         # Quiz list page
└── shared/                # Shared utilities
    ├── api/               # API client configuration
    ├── components/        # Reusable components
    ├── constants/         # App constants
    ├── hooks/             # Custom hooks
    └── ui/                # UI components
```

## 🧪 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

## 🔧 Configuration

### API Configuration

The API base URL can be configured in the `.env` file:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

### Authentication

The app uses JWT tokens for authentication:
- Tokens are stored in localStorage
- Automatic token refresh on API errors
- Protected routes redirect to sign-in when unauthenticated

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Issues**
   - Ensure backend is running on port 5000
   - Check CORS configuration on backend
   - Verify API base URL in .env file

2. **Authentication Problems**
   - Clear localStorage and try signing in again
   - Check backend authentication endpoints

3. **Quiz Creation Issues**
   - Ensure all required fields are filled
   - Check that at least one question is added
   - Verify question options are properly configured

## 🤝 Contributing

1. Follow the Feature-Sliced Design architecture
2. Use TypeScript for all new code
3. Add proper type definitions
4. Write meaningful commit messages
5. Test your changes thoroughly

## 📝 License

This project is licensed under the MIT License.
