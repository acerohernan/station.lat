import React from 'react';
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

const CompanyHeader = () => {
  const { toggleMode } = useThemeContext();

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
          <UserMenu />
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyHeader;
