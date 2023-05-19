/* Entities */

import { Company } from '../company/types';

export interface User {
  id: string;
  email: string;
  image_url: string;
  first_name: string;
  last_name: string;
  phone: string;
  welcome_flow_completed: boolean;
}

export interface UserMembership {
  id: string;
  user_id: string;
  company_id: string;
  role: 'ADMIN' | 'READER' | 'EDITOR';
  company: Company;
}

/* Form Params */
export interface CreateUserMemberTokenParam {
  company_id: string;
}
