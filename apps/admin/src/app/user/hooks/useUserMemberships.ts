import { API } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useUserMemberships = () => useQuery({ queryKey: ['user/membership'], queryFn: API.user.getMemberships });
