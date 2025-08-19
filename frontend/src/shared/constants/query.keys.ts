export const QUERY_KEYS = {
  AUTH: {
    USER: ['auth', 'user'] as const,
    PROFILE: ['auth', 'profile'] as const,
  },
  QUIZ: {
    ALL: ['quizzes'] as const,
    DETAIL: (id: string) => ['quiz', id] as const,
    LIST: ['quizzes', 'list'] as const,
  },
} as const;

export const MUTATION_KEYS = {
  AUTH: {
    SIGN_IN: ['auth', 'signIn'] as const,
    SIGN_UP: ['auth', 'signUp'] as const,
    LOGOUT: ['auth', 'logout'] as const,
  },
  QUIZ: {
    CREATE: ['quiz', 'create'] as const,
    UPDATE: (id: string) => ['quiz', 'update', id] as const,
    DELETE: (id: string) => ['quiz', 'delete', id] as const,
  },
} as const;
