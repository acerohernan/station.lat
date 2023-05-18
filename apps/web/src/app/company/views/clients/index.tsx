import React from 'react';
import CompanyLayout from '../../components/layout';
import { Card, Box } from '@mui/material';
import EnhancedTable from './datatable';

const ClientsView = () => (
  <CompanyLayout>
    <Card sx={{}}>
      <Box padding="16px">Clients</Box>
      <EnhancedTable />
    </Card>
  </CompanyLayout>
);

export default ClientsView;
