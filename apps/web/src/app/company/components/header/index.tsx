import React from 'react';
import { Box, IconButton } from '@mui/material';
import { WbSunny as SunIcon, Menu as MenuIcon, Person as PersonIcon, Search as SearchIcon } from '@mui/icons-material';
import { useThemeContext } from '@/theme/hooks';

const CompanyHeader = () => {
  const { toggleMode } = useThemeContext();

  return (
    <Box border="1px solid red">
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Box>
          <IconButton aria-label="menu icon" size="large">
            <MenuIcon />
          </IconButton>
          <IconButton aria-label="menu icon" size="large">
            <SearchIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton aria-label="sun icon" size="large" color="warning">
            <SunIcon onClick={toggleMode} />
          </IconButton>
          <IconButton aria-label="menu icon" size="large">
            <PersonIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyHeader;
