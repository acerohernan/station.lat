import { BASE_URL } from '../config';
import { CreateUserMemberTokenParam, User, UserMembership } from './types';

export const getInformation = async (): Promise<User | null> =>
  fetch(`${BASE_URL}/user/information`, { credentials: 'include' }).then((res) => {
    if (!res.ok) return null;

    return res.json();
  });

export const createMemberToken = async (params: CreateUserMemberTokenParam): Promise<string | null> =>
  fetch(`${BASE_URL}/user/company/member/token/create`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(params),
  }).then((res) => {
    if (!res.ok) return null;

    return res.json();
  });

export const getMemberships = async (): Promise<Array<UserMembership> | null> =>
  fetch(`${BASE_URL}/user/membership`, {
    credentials: 'include',
  }).then((res) => {
    if (!res.ok) return null;

    return res.json();
  });
