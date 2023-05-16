import { BASE_URL, authCompanyHeaders, authHeaders, baseHeaders } from '../config';
import { Company } from './types';

export function getCompanyInformation(): Promise<Company | null> {
  return fetch(`${BASE_URL}/company/information`, { headers: { ...baseHeaders(), ...authCompanyHeaders() } })
    .then((res) => res.json())
    .catch(() => null);
}
