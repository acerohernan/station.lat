import React from 'react';
import CompanyLayout from '../components/layout';
import { useCompanyInformation } from '../hooks/useCompanyInformation';
import { Box, Card } from '@mui/material';

const CompanyHomeView = () => {
  const { data: company } = useCompanyInformation();

  return (
    <CompanyLayout>
      <Box display="grid" gap="24px">
        {company && <Card sx={{ padding: '16px' }}>Comapany: {company.name}</Card>}
        <Card sx={{ height: '300px' }}></Card>
      </Box>
    </CompanyLayout>
  );
};

export default CompanyHomeView;
