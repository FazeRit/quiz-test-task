import React from 'react';
import { Toaster } from 'react-hot-toast';

interface IToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<IToastProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '8px',
            padding: '12px 16px',
            maxWidth: '400px',
          },
          // Default options for specific types
          success: {
            duration: 4000,
            style: {
              background: '#4caf50',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#4caf50',
            },
          },
          error: {
            duration: 6000,
            style: {
              background: '#f44336',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#f44336',
            },
          },
        }}
      />
    </>
  );
};
