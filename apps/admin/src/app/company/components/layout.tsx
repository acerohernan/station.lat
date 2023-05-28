import { Box } from '@mui/material';
import React from 'react';
import CompanyHeader from './header';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CompanyLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const access_token = Cookies.get('access_token');
    const company_token = Cookies.get('company_token');

    if (!company_token && access_token) return navigate('/');

    if (!company_token && !access_token) navigate('/signin');
  }, []);

  return (
    <Box maxWidth="1200px" margin="0 auto" padding="0 24px 24px">
      <CompanyHeader />
      <Box>{children}</Box>
    </Box>
  );
};

export default CompanyLayout;
