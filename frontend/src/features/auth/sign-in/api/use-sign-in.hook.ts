import { authService } from '../../../../entities/user/api/auth.service';
import { ISignInDto, ISignInResponse } from '../../../../entities/user/model';
import { useAuthStore } from '../../../../app/store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../../shared/hooks/useToast';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const { setUser, setToken, setIsAuthenticated, setLoading, setError, clearError } = useAuthStore();
  const toast = useToast();

  const signIn = (user: ISignInResponse['user'], token: string) => {
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);

    localStorage.setItem('authToken', token);
    queryClient.setQueryData(['auth', 'user'], user);
    queryClient.invalidateQueries({ queryKey: ['auth'] });
  };

  return useMutation({
    mutationFn: (credentials: ISignInDto) => authService.signIn(credentials),
    onMutate: () => {
      setLoading(true);
      clearError();
    },
    onSuccess: (data: ISignInResponse) => {
      signIn(data.user, data.token);
      setLoading(false);

      toast.success(`Welcome back, ${data.user.username}!`, {
        duration: 4000,
      });
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);

      toast.error(`Sign in failed: ${error.message}`, {
        duration: 6000,
      });
    },
  });
};
