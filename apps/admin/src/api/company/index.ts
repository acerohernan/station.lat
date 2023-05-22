import { AxiosError } from 'axios';
import { axiosInstance as axios } from '../config';
import { Company } from './types';
import Cookies from 'js-cookie';

export const getInformation: () => Promise<Company | null> = () =>
  axios
    .get('/company/information', { withCredentials: true })
    .then((res) => res.data ?? null)
    .catch((err: AxiosError) => {
      // Unathorized
      if (err.response?.status === 403) {
        Cookies.remove('isLoggedInCompany');
        window.location.href = '/';
      }

      return null;
    });
