import { API } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useUserInformation = () => useQuery({ queryKey: ['user/information'], queryFn: API.user.getInformation });
