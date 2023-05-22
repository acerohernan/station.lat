import { Box } from '@mui/material';
import React from 'react';
import CompanyHeader from './header';

const CompanyLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box maxWidth="1200px" margin="0 auto" padding="0 24px 24px">
      <CompanyHeader />
      <Box>{children}</Box>
    </Box>
  );
};

export default CompanyLayout;
