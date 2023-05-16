import { Company } from '../company/types';

export interface User {
  id: string;
  email: string;
  image_url: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  welcome_flow_completed: boolean;
}

export interface UserMembership {
  id: string;
  user_id: string;
  company_id: string;
  role: 'ADMIN' | 'READER' | 'EDITOR';
  company: Company;
}
