import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import {
  WbSunny as SunIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  Notifications as BellIcon,
} from '@mui/icons-material';
import { useThemeContext } from '@/theme/hooks';
import UserMenu from './user-menu';
import UserDrawerButton from './drawer';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import CompanyModal from '../modal';

const CompanyHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { toggleMode } = useThemeContext();
  const { push } = useRouter();

  const logout = () => {
    Cookies.remove('company_token');
    push('/');
  };

  return (
    <Box padding="16px 0">
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Box>
          <UserDrawerButton />
          <IconButton aria-label="menu icon">
            <SearchIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton aria-label="bell icon">
            <BellIcon />
          </IconButton>
          <IconButton aria-label="sun icon" color="warning" onClick={toggleMode}>
            <SunIcon />
          </IconButton>
          <UserMenu logoutFn={() => setModalOpen(true)} />
          <CompanyModal
            title="Confirm Log Out"
            setOpen={setModalOpen}
            open={modalOpen}
            description="Are you sure you want to log out?"
            onSuccess={logout}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyHeader;
