import { AxiosError } from 'axios';
import { BASE_URL, axiosInstance as axios } from '../config';
import Cookies from 'js-cookie';
import { CreateUserMemberTokenParam, User, UserMembership } from './types';
import { ApiError, ApiMutation } from '../types';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${Cookies.get('access_token')}`,
});

export const getInformation = async (): Promise<User | null> =>
  axios
    .get(`${BASE_URL}/user/information`, { headers: { ...authHeaders() } })
    .then((res) => res.data ?? null)
    .catch((err: AxiosError) => {
      if (err.response?.status === 403) {
        Cookies.remove('access_token');
        window.location.href = '/signin';
      }

      return null;
    });

export const createMemberToken = async (
  params: CreateUserMemberTokenParam
): Promise<ApiMutation<{ company_token: string }>> =>
  new Promise((resolve) =>
    axios
      .post(`${BASE_URL}/user/company/member/token/create`, params, {
        headers: { ...authHeaders() },
      })
      .then((res) => {
        resolve({ failed: false, data: res.data, error: null });
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
    headers: { ...authHeaders() },
  }).then((res) => {
    if (!res.ok) return null;

    return res.json();
  });
