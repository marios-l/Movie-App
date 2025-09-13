import React from 'react';
import ReactDOM from 'react-dom/client';
import ThemeProvider from './providers/theme';
import QueryProvider from './providers/query';
import AppRouter from './providers/router';
import { AuthProvider } from './auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
