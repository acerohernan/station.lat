import React from 'react';
import CompanyLayout from '../components/layout';
import { Card } from '@mui/material';

const ClientsView = () => (
  <CompanyLayout>
    <Card sx={{ height: '300px', padding: '16px' }}>Clients</Card>
  </CompanyLayout>
);

export default ClientsView;
