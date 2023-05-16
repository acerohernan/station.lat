import Cookies from 'js-cookie';
import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';

const UserLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { push } = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token');
    const company_token = Cookies.get('company_token');

    if (!token) push('/login');

    if (company_token) push('/company');
  }, []);

  return <>{children}</>;
};

export default UserLayout;
