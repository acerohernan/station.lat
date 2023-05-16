import React from 'react';
import { Tooltip, IconButton, Avatar } from '@mui/material';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick() {}

  return (
    <>
      <Tooltip title="User settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar>M</Avatar>
        </IconButton>
      </Tooltip>
    </>
  );
};

export default UserMenu;
