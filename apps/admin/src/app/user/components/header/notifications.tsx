import { IconButton, Tooltip } from '@mui/material';
import { Notifications as BellIcon } from '@mui/icons-material';

const UserNotifications = () => {
  return (
    <>
      <Tooltip title="Notifications">
        <IconButton aria-label="bell icon">
          <BellIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default UserNotifications;
