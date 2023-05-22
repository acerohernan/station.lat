import React from 'react';
import { Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, Divider, Box, Skeleton } from '@mui/material';
import { useUserInformation } from '@/app/user/hooks/useUserInformation';
import { useCompanyInformation } from '../../hooks/useCompanyInformation';
import { useNavigate } from 'react-router-dom';
import { companyRoutes } from '../../constants/menuItems';

const CompanyMenu = ({ logoutFn }: { logoutFn: () => void }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data: user } = useUserInformation();
  const { data: company } = useCompanyInformation();
  const navigate = useNavigate();

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Tooltip title="Company Menu">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {company ? (
            <Avatar sx={{ width: 30, height: 30 }}>{company.name ? company.name.slice(0, 1) : 'C'}</Avatar>
          ) : (
            <Skeleton variant="circular" width={30} height={30} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box padding={'8px 20px 12px'}>
          <Typography fontWeight={'700'}>{user ? user.first_name : <Skeleton />}</Typography>
          <Typography fontSize={'0.8rem'}>{company ? `Logged in: ${company.name}` : <Skeleton />}</Typography>
        </Box>

        <Divider />

        {companyRoutes.map((route) => (
          <CompanyMenuItem
            key={route.label}
            onClick={() => {
              handleClose();
              navigate(route.path);
            }}
            label={route.label}
          />
        ))}
        <Divider />
        <CompanyMenuItem label="LogOut" onClick={logoutFn} />
      </Menu>
    </>
  );
};

interface ItemProps {
  label: string;
  onClick: () => void;
}

const CompanyMenuItem: React.FC<ItemProps> = ({ label, onClick }) => {
  return (
    <MenuItem onClick={onClick}>
      <Typography fontSize={'13px'} marginLeft={'4px'}>
        {label}
      </Typography>
    </MenuItem>
  );
};

export default CompanyMenu;
