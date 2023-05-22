import { Home as HomeIcon, PeopleAlt as PeopleIcon, Settings as SettingsIcon } from '@mui/icons-material';

export const companyRoutes: Array<{ icon: React.ReactNode; label: string; path: string }> = [
  {
    icon: <HomeIcon />,
    label: 'Home',
    path: '/company/',
  },
  {
    icon: <PeopleIcon />,
    label: 'Clients',
    path: '/company/clients',
  },
  {
    icon: <SettingsIcon />,
    label: 'Settings',
    path: '/company/settings',
  },
];
