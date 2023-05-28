import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UserHeader from './header';
import Box from '@mui/material/Box';

const UserLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const access_token = Cookies.get('access_token');
    const company_token = Cookies.get('company_token');

    if (company_token) return navigate('/company');

    if (!access_token) navigate('/signin');
  }, []);

  return (
    <Box maxWidth="1200px" margin="0 auto" padding="0 24px 24px">
      <UserHeader />
      <Box>{children}</Box>
    </Box>
  );
};

export default UserLayout;
