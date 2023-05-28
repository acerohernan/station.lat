import { Link, createBrowserRouter } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { lazy } from 'react';

/* Lazy imports */
const HomePage = lazy(() => import('./app/user/views/home'));
const LoginPage = lazy(() => import('./app/auth/views/signin'));
const SignUpPage = lazy(() => import('./app/auth/views/signup'));
const CompanyHomePage = lazy(() => import('./app/company/views/home'));
const CompanySettingsPage = lazy(() => import('./app/company/views/settings'));
const CompanyEmployeesPage = lazy(() => import('./app/company/views/employees'));
const CompanyClientsPage = lazy(() => import('./app/company/views/clients'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/company',
    element: <CompanyHomePage />,
  },
  {
    path: '/company/clients',
    element: <CompanyClientsPage />,
  },
  {
    path: '/company/employees',
    element: <CompanyEmployeesPage />,
  },
  {
    path: '/company/settings',
    element: <CompanySettingsPage />,
  },
  {
    path: '/signin',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '*',
    element: (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h2">Are you lose?</Typography>
        <Typography component="span" marginTop="10px">
          Try going back to the home! <Link to="/">Go back</Link>
        </Typography>
      </Box>
    ),
  },
]);
