import { createBrowserRouter } from 'react-router-dom';
import HomePage from './app/user/views/home';
import LoginPage from './app/auth/views/signin';
import SignUpPage from './app/auth/views/signup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
