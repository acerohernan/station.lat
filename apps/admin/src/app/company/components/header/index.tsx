import React from 'react';
import Cookies from 'js-cookie';
import { Box, IconButton, Tooltip } from '@mui/material';
import { WbSunny as SunIcon, Search as SearchIcon, Notifications as BellIcon } from '@mui/icons-material';
import { useThemeContext } from '@/theme/hooks';
import CompanyMenu from './company-menu';
import CompanyDrawerButton from './drawer';
import CompanyModal from '../modal';
import { useNavigate } from 'react-router-dom';
import { useCompanyInformation } from '../../hooks/useCompanyInformation';
import CompanyNotifications from './notifications';

const CompanyHeader = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { toggleMode } = useThemeContext();

  const navigate = useNavigate();
  const { data: company } = useCompanyInformation();

  const logout = () => {
    Cookies.remove('isLoggedInCompany');
    navigate('/');
  };

  return (
    <Box padding="16px 0">
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Box>
          <CompanyDrawerButton />
          <Tooltip title="Seach">
            <IconButton aria-label="menu icon">
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <CompanyNotifications />
          <Tooltip title="Switch mode">
            <IconButton aria-label="sun icon" color="warning" onClick={toggleMode}>
              <SunIcon />
            </IconButton>
          </Tooltip>
          <CompanyMenu logoutFn={() => setModalOpen(true)} />
          <CompanyModal
            title="Confirm Log Out"
            setOpen={setModalOpen}
            open={modalOpen}
            description={`Are you sure you want to log out from ${company?.name}?`}
            onSuccess={logout}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyHeader;
