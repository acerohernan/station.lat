import { createBrowserRouter } from 'react-router-dom';

import HomePage from './app/user/views/home';
import LoginPage from './app/auth/views/signin';
import SignUpPage from './app/auth/views/signup';
import CompanyHomePage from './app/company/views/home';
import CompanySettingsPage from './app/company/views/settings';
import CompanyEmployeesPage from './app/company/views/employees';
import CompanyClientsPage from './app/company/views/clients';

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
    element: <div>NotFound</div>,
  },
]);
