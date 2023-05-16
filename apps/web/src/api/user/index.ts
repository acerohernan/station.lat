import { BASE_URL, authHeaders, baseHeaders } from '../config';
import { User, UserMembership } from './types';

export async function getMemberships(): Promise<UserMembership[] | null> {
  return fetch(`${BASE_URL}/user/membership`, { headers: { ...authHeaders() } }).then((res) =>
    res.ok ? res.json() : null
  );
}

export async function getUserInformation(): Promise<User | null> {
  return fetch(`${BASE_URL}/user/information`, { headers: { ...authHeaders() } }).then((res) =>
    res.ok ? res.json() : null
  );
}

interface CreateCompanyAccessTokenParams {
  company_id: string;
}

export async function createCompanyAccessToken({ company_id }: CreateCompanyAccessTokenParams): Promise<string | null> {
  const res = await fetch(`${BASE_URL}/user/company/member/token/create`, {
    headers: { ...baseHeaders(), ...authHeaders() },
    method: 'POST',
    body: JSON.stringify({ company_id }),
  }).then((res) => (res.ok ? res.json() : null));

  if (!res) return null;

  return res.access_token as string;
}
