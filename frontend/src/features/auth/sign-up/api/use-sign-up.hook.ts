import { authService } from '../../../../entities/user/api/auth.service';
import { ISignUpDto, ISignUpResponse } from '../../../../entities/user/model';
import { useAuthStore } from '../../../../app/store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../../shared/hooks/useToast';

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const { setUser, setToken, setIsAuthenticated, setLoading, setError, clearError } = useAuthStore();
  const toast = useToast();

  const signUp = (user: ISignUpResponse['user'], token: string) => {
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);

    localStorage.setItem('authToken', token);

    queryClient.setQueryData(['auth', 'user'], user);

    queryClient.invalidateQueries({ queryKey: ['auth'] });
  };

  return useMutation({
    mutationFn: (userData: ISignUpDto) => {
      return authService.signUp(userData);
    },
    onMutate: () => {
      setLoading(true);
      clearError();
    },
    onSuccess: (data: ISignUpResponse) => {
      signUp(data.user, data.token);
      setLoading(false);

      toast.success(`Account created successfully! Welcome, ${data.user.username}!`, {
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);

      toast.error(`Sign up failed: ${error.message}`, {
        duration: 6000,
      });
    },
  });
};
