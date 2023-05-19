import { AxiosError } from 'axios';
import { BASE_URL, axiosInstance as axios } from '../config';
import Cookies from 'js-cookie';
import { CreateUserMemberTokenParam, User, UserMembership } from './types';
import { ApiError, ApiMutation } from '../types';

const headers = {
  'Content-Type': 'application/json',
};

export const getInformation = async (): Promise<User | null> =>
  axios
    .get(`${BASE_URL}/user/information`, { withCredentials: true })
    .then((res) => res.data ?? null)
    .catch((err: AxiosError) => {
      if (err.response?.status === 403) {
        Cookies.remove('isLoggedIn');
        window.location.href = '/signin';
      }

      return null;
    });

export const createMemberToken = async (params: CreateUserMemberTokenParam): Promise<ApiMutation<null>> =>
  new Promise((resolve) =>
    axios
      .post(`${BASE_URL}/user/company/member/token/create`, params, {
        withCredentials: true,
      })
      .then(() => {
        resolve({ failed: false, data: null, error: null });
      })
      .catch((err: AxiosError<ApiError>) => {
        let errors: string[] = [];

        if (err.response && err.response.data && err.response.data.message) {
          errors =
            typeof err.response.data.message === 'string' ? [err.response.data.message] : err.response.data.message;
        }

        resolve({ failed: true, data: null, error: { statusCode: err.response?.status ?? 500, errors } });
      })
  );

export const getMemberships = async (): Promise<Array<UserMembership> | null> =>
  fetch(`${BASE_URL}/user/membership`, {
    credentials: 'include',
    headers,
  }).then((res) => {
    if (!res.ok) return null;

    return res.json();
  });
