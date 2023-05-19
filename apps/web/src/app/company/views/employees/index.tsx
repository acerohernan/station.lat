import React from 'react';
import CompanyLayout from '../../components/layout';
import { Card, Box } from '@mui/material';
import EnhancedTable from './datatable';

const EmployeesView = () => (
  <CompanyLayout>
    <Card sx={{}}>
      <Box padding="16px">Employees</Box>
      <EnhancedTable />
    </Card>
  </CompanyLayout>
);

export default EmployeesView;
