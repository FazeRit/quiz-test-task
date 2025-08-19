export const QUIZ_LIST_PAGE_CONFIG = {
  title: 'Quiz Builder',
  createButtonText: 'Create Quiz',
  emptyState: {
    title: 'No quizzes found',
    description: 'Create your first quiz to get started!',
    buttonText: 'Create Your First Quiz',
  },
  grid: {
    spacing: 3,
    breakpoints: {
      xs: 12,
      sm: 6,
      md: 4,
    },
  },
} as const;
