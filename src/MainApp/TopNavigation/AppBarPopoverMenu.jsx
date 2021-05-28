import React from 'react';

import Popover from '@material-ui/core/Popover';
import CardHeader from '@material-ui/core/CardHeader';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import AddAdminIcon from '@material-ui/icons/PersonAddOutlined';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import AddAdminDialog from './AddAdminDialog';

export default ({
  anchorEl, handlePopoverClose, firebaseHandler,
}) => {
  const user = firebaseHandler.getUser();
  const [open, toggleOpen] = React.useReducer((val) => !val, false);
  return (
    <>
      <Popover
        id="mouse-over-popover"
        open={anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >

        <CardHeader
          avatar={
            <Avatar aria-label="image" src={user.avatarUrl} />
      }
          title={user.name}
          subheader={user.email}
        />

        <MenuItem onClick={() => { handlePopoverClose(); toggleOpen(); }}>
          <ListItemIcon>
            <AddAdminIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add Admin" />
        </MenuItem>

        <MenuItem onClick={firebaseHandler.signOut}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>

      </Popover>
      <AddAdminDialog open={open} toggleOpen={toggleOpen} />
    </>
  );
};
