import React from 'react';

import Popover from '@material-ui/core/Popover';
import CardHeader from '@material-ui/core/CardHeader';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

export default ({
  anchorEl, handlePopoverClose,
}) => (

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
        <Avatar aria-label="recipe" src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" />
      }
      title="Rahul Jha"
      subheader="jharahul1998@gmail.com"
    />

    <MenuItem onClick={handlePopoverClose}>
      <ListItemText primary="Add Admin" />
    </MenuItem>

    <MenuItem>
      <ListItemText primary="Logout" />
    </MenuItem>

  </Popover>
);
