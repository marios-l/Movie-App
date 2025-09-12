import React from 'react';
import ReactDOM from 'react-dom/client';
import ThemeProvider from './providers/theme';
import QueryProvider from './providers/query';
import AppRouter from './providers/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
