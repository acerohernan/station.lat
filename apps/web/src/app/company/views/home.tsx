import React from 'react';
import CompanyLayout from '../components/layout';
import { useCompanyInformation } from '../hooks/useCompanyInformation';
import { Typography } from '@mui/material';

const CompanyHomeView = () => {
  const { data: company } = useCompanyInformation();

  return (
    <CompanyLayout>
      <div>
        <Typography>Company page</Typography>

        {company && (
          <div>
            Comapany: {company.name}
            Domain: {company.domain}
          </div>
        )}
      </div>
    </CompanyLayout>
  );
};

export default CompanyHomeView;
