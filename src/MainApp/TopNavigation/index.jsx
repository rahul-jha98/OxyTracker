import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import AppBarPopoverMenu from './AppBarPopoverMenu';
import Tabs from './Tabs';

import ApiHandlerContext from '../../provider/ApiHandlerContext';

import AppLogo from '../../Logo.svg';

const useStyles = makeStyles((theme) => ({
  appBar: {
    color: '#37474F',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
  },
  title: {
    flexGrow: 1,

    paddingLeft: 8,

  },
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  logoImg: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: 200,
      marginTop: 4,
    },
  },
}));

export default (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { firebaseHandler } = React.useContext(ApiHandlerContext);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar className="container" disableGutters>
          <div className={classes.title}>
            <img src={AppLogo} alt="logo" className={classes.logoImg} />
          </div>
          <IconButton
            aria-label="about"
            aria-controls="menu-appbar"
            color="inherit"
            aria-owns={anchorEl ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onClick={handlePopoverOpen}
          >
            <Avatar className={classes.small} src={firebaseHandler.getUser().avatarUrl} />
          </IconButton>
        </Toolbar>
        <Tabs {...props} />
      </AppBar>

      <AppBarPopoverMenu
        {...{ handlePopoverClose, anchorEl, firebaseHandler }}
      />
    </>
  );
};
