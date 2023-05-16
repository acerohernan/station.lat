import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect } from 'react';

const CompanyLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { push } = useRouter();

  useEffect(() => {
    const company_token = Cookies.get('company_token');
    const token = Cookies.get('access_token');

    if (!company_token) push('/');
  }, []);

  return <>{children}</>;
};

export default CompanyLayout;
