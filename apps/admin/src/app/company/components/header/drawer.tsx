import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { companyRoutes } from '../../constants/menuItems';

const CompanyDrawerButton = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Tooltip title="Open drawer">
        <IconButton aria-label="menu icon" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <DrawerMenu toggleDrawer={toggleDrawer} />
      </Drawer>
    </React.Fragment>
  );
};

interface MenuProps {
  toggleDrawer: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

const DrawerMenu: React.FC<MenuProps> = ({ toggleDrawer }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '280px', height: '100%', padding: '16px', bgcolor: 'background.paper' }} role="presentation">
      <Box margin="16px 0">
        <Typography component="h4" fontWeight="700" fontSize="1.1rem" marginLeft="15px">
          Lation Station
        </Typography>
      </Box>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="span"
            id="nested-list-subheader"
            sx={{
              fontWeight: '700',
            }}
          >
            DASHBOARD
          </ListSubheader>
        }
      >
        {companyRoutes.map((route) => {
          return (
            <ListItemButton
              key={route.path}
              onClick={(event) => {
                toggleDrawer(event);
                navigate(route.path);
              }}
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default CompanyDrawerButton;
