import React from 'react';
import CompanyLayout from '../components/layout';
import { useCompanyInformation } from '../hooks/useCompanyInformation';
import { Button, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useThemeContext } from '@/theme/hooks';

const CompanyHomeView = () => {
  const { data: company } = useCompanyInformation();
  const { push } = useRouter();
  const { toggleMode } = useThemeContext();

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
        <Button onClick={toggleMode}>Toggle Theme</Button>
      </div>
    </CompanyLayout>
  );
};

export default CompanyHomeView;
