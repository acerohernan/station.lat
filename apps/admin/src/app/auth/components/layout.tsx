import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const isLoggedInComapany = Boolean(Number(Cookies.get('isLoggedInCompany')));
    const isLoggedIn = Boolean(Number(Cookies.get('isLoggedIn')));

    if (isLoggedInComapany) return navigate('/company');

    if (isLoggedIn) navigate('/');
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthLayout;
