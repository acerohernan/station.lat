import { API } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useUserMemberships = () =>
  useQuery({ queryFn: API.user.getMemberships, queryKey: ['user/membership'], refetchInterval: false });
