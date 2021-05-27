import React from 'react';

import Popover from '@material-ui/core/Popover';
import CardHeader from '@material-ui/core/CardHeader';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

export default ({
  anchorEl, handlePopoverClose, firebaseHandler,
}) => {
  const user = firebaseHandler.getUser();
  return (
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

      <MenuItem onClick={handlePopoverClose}>
        <ListItemText primary="Add Admin" />
      </MenuItem>

      <MenuItem onClick={firebaseHandler.signOut}>
        <ListItemText primary="Logout" />
      </MenuItem>

    </Popover>
  );
};
