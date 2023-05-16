import { API } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useUserInformation = () =>
  useQuery({ queryFn: API.user.getUserInformation, queryKey: ['user/information'], refetchInterval: false });
