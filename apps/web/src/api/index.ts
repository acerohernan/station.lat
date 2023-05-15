import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authHeaders = () => {
  const token = Cookies.get('access_token');
  return { Authorization: `Bearer ${token}` };
};

export const API = {
  user: {
    async getMemberships() {
      return fetch(`${BASE_URL}/user/membership`, { headers: { ...authHeaders() } })
        .then((res) => res.json())
        .catch(() => null);
    },
  },
};
