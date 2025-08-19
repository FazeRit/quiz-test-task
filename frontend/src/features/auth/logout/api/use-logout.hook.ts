import { authService } from '../../../../entities/user/api/auth.service';
import { RouterKeys } from '../../../../shared/constants/router-keys.const';
import { useAuthStore } from '../../../../app/store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../../shared/hooks/useToast';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { clearAuth } = useAuthStore();
  const toast = useToast();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();

      toast.success('Logged out successfully', {
        duration: 3000,
      });

      window.location.href = RouterKeys.AUTH.SIGN_IN;
    },
    onError: (error: Error) => {
      clearAuth();
      queryClient.clear();

      toast.error(`Logout failed: ${error.message}`, {
        duration: 4000,
      });

      window.location.href = RouterKeys.AUTH.SIGN_IN;
    },
  });
};
