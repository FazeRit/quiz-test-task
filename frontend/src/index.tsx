import AppRouter from './app/providers/router/components/app-router/app-router.component';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './app/providers/query/query.provider';
import { ThemeProvider } from './app/providers/theme/theme.provider';
import { ToastProvider } from './app/providers/toast/toast.provider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <QueryProvider>
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  </QueryProvider>
);
