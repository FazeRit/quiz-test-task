export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
  endpoints: {
    auth: {
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
    },
    quizzes: '/quizzes',
  },
};
