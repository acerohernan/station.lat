import React from 'react';
import CompanyLayout from '../components/layout';
import { Card } from '@mui/material';

const EmployeesView = () => (
  <CompanyLayout>
    <Card sx={{ height: '300px', padding: '16px' }}>Employees</Card>
  </CompanyLayout>
);

export default EmployeesView;
