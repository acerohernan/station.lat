import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UserHeader from './header';
import Box from '@mui/material/Box';

const UserLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const isLoggedIn = Boolean(Number(Cookies.get('isLoggedIn')));
    const isLoggedInCompany = Boolean(Number(Cookies.get('isLoggedInCompany')));

    if (isLoggedInCompany) return navigate('/company');

    if (!isLoggedIn) navigate('/signin');
  }, []);
  return (
    <Box maxWidth="1200px" margin="0 auto" padding="0 24px 24px">
      <UserHeader />
      <Box>{children}</Box>
    </Box>
  );
};

export default UserLayout;
