import { IToastOptions } from '../lib/toast/types/toast.types';
import { toastService } from '../lib/toast/toast.service';
import { useCallback } from 'react';

export const useToast = () => {
  const showSuccess = useCallback((message: string, options?: IToastOptions) => {
    return toastService.success(message, options);
  }, []);

  const showError = useCallback((message: string, options?: IToastOptions) => {
    return toastService.error(message, options);
  }, []);

  const showWarning = useCallback((message: string, options?: IToastOptions) => {
    return toastService.warning(message, options);
  }, []);

  const showInfo = useCallback((message: string, options?: IToastOptions) => {
    return toastService.info(message, options);
  }, []);

  const showLoading = useCallback((message: string, options?: IToastOptions) => {
    return toastService.loading(message, options);
  }, []);

  const dismiss = useCallback((toastId?: string) => {
    return toastService.dismiss(toastId);
  }, []);

  const remove = useCallback((toastId: string) => {
    return toastService.remove(toastId);
  }, []);

  const promise = useCallback(
    <T>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: any) => string);
      },
      options?: IToastOptions
    ) => {
      return toastService.promise(promise, messages, options);
    },
    []
  );

  return {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    loading: showLoading,
    dismiss,
    remove,
    promise,
  };
};
