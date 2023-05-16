export interface Company {
  id: string;
  user_id: string;
  time_zone_id: string;
  domain: string;
  image_url: string | null;
  name: string;
  is_pro: boolean;
  last_month_payment_failed: boolean;
  free_trial_finished: boolean;
}
