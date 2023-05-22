import React from 'react';
import Cookies from 'js-cookie';
import { Box, IconButton } from '@mui/material';
import { WbSunny as SunIcon, Search as SearchIcon, Notifications as BellIcon } from '@mui/icons-material';
import { useThemeContext } from '@/theme/hooks';
import UserMenu from './user-menu';
import UserDrawerButton from './drawer';
import CompanyModal from '../modal';
import { useNavigate } from 'react-router-dom';
import UserNotifications from './notifications';

const UserHeader = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { toggleMode } = useThemeContext();

  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('isLoggedIn');
    navigate('/signin');
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
          <UserNotifications />
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

export default UserHeader;
