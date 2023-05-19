import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const isLoggedIn = Boolean(Number(Cookies.get('isLoggedIn')));

    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthLayout;
