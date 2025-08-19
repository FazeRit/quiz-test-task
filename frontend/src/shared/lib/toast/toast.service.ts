import toast from 'react-hot-toast';
import { IToastOptions } from './types/toast.types';

class ToastService {
  success(message: string, options?: IToastOptions) {
    return toast.success(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      style: options?.style,
      className: options?.className,
      icon: options?.icon,
      id: options?.id,
    });
  }

  error(message: string, options?: IToastOptions) {
    return toast.error(message, {
      duration: options?.duration || 6000,
      position: options?.position || 'top-right',
      style: options?.style,
      className: options?.className,
      icon: options?.icon,
      id: options?.id,
    });
  }

  warning(message: string, options?: IToastOptions) {
    return toast(message, {
      duration: options?.duration || 5000,
      position: options?.position || 'top-right',
      style: options?.style,
      className: options?.className,
      icon: '⚠️',
      id: options?.id,
    });
  }

  info(message: string, options?: IToastOptions) {
    return toast(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      style: options?.style,
      className: options?.className,
      icon: 'ℹ️',
      id: options?.id,
    });
  }

  loading(message: string, options?: IToastOptions) {
    return toast.loading(message, {
      position: options?.position || 'top-right',
      style: options?.style,
      className: options?.className,
      id: options?.id,
    });
  }

  dismiss(toastId?: string) {
    return toast.dismiss(toastId);
  }

  remove(toastId: string) {
    return toast.remove(toastId);
  }

  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: IToastOptions
  ) {
    return toast.promise(promise, messages, {
      position: options?.position || 'top-right',
      style: options?.style,
      className: options?.className,
      id: options?.id,
    });
  }
}

export const toastService = new ToastService();
