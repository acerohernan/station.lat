import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    /* If is a callback from the server */
    const access_token = searchParams.get('access_token');

    if (access_token) {
      Cookies.set('access_token', access_token);
      navigate('/');
    }

    /* If is already loggedIn */
    const access_token_from_cookies = Cookies.get('access_token');
    const company_token = Cookies.get('company_token');

    if (company_token) return navigate('/company');

    if (access_token_from_cookies) navigate('/');
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthLayout;
