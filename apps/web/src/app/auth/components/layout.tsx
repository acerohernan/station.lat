import Cookies from 'js-cookie';
import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { push } = useRouter();

  useEffect(() => {
    const company_token = Cookies.get('company_token');
    const token = Cookies.get('access_token');

    if (company_token) push('/company');

    if (token) push('/');
  }, []);

  return <>{children}</>;
};

export default AuthLayout;
