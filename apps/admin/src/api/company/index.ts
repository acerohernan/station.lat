import { AxiosError } from 'axios';
import { axiosInstance as axios } from '../config';
import { Company } from './types';
import Cookies from 'js-cookie';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${Cookies.get('company_token')}`,
});

export const getInformation: () => Promise<Company | null> = () =>
  axios
    .get('/company/information', { headers: { ...authHeaders() } })
    .then((res) => res.data ?? null)
    .catch((err: AxiosError) => {
      // Unathorized
      if (err.response?.status === 403) {
        Cookies.remove('company_token');
        window.location.href = '/';
      }

      return null;
    });
