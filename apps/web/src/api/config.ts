import Cookies from 'js-cookie';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authHeaders = () => {
  const token = Cookies.get('access_token');
  return { Authorization: `Bearer ${token}` };
};

export const authCompanyHeaders = () => {
  const token = Cookies.get('company_token');
  return { Authorization: `Bearer ${token}` };
};

export const baseHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});
