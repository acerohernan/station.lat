import Cookies from 'js-cookie';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect } from 'react';
import CompanyHeader from './header';

const CompanyLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { push } = useRouter();

  useEffect(() => {
    const company_token = Cookies.get('company_token');
    const token = Cookies.get('access_token');

    if (!company_token) push('/');
  }, []);

  return (
    <Box maxWidth="1200px" margin="0 auto" padding="0 32px">
      <CompanyHeader />
      <Box>{children}</Box>
    </Box>
  );
};

export default CompanyLayout;
