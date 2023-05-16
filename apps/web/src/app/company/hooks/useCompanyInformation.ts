import { API } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useCompanyInformation = () =>
  useQuery({ queryFn: API.company.getCompanyInformation, queryKey: ['company/information'], refetchInterval: false });
