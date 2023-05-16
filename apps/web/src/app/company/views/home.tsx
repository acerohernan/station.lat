import React from 'react';
import CompanyLayout from '../components/layout';
import { useCompanyInformation } from '../hooks/useCompanyInformation';
import { Button, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const CompanyHomeView = () => {
  const { data: company } = useCompanyInformation();
  const { push } = useRouter();

  function logout() {
    Cookies.remove('company_token');
    push('/');
  }

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

        <Button onClick={logout}>Logout</Button>
      </div>
    </CompanyLayout>
  );
};

export default CompanyHomeView;
