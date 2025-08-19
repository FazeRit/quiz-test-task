export const QUERY_CONFIG = {
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
  mutations: {
    retry: 1,
  },
};
