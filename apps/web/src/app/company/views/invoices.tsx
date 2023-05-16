import React from 'react';
import CompanyLayout from '../components/layout';
import { Card } from '@mui/material';

const InvoicesView = () => (
  <CompanyLayout>
    <Card sx={{ height: '300px', padding: '16px' }}>Invoices</Card>
  </CompanyLayout>
);

export default InvoicesView;
