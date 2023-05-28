import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from './theme/provider';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
