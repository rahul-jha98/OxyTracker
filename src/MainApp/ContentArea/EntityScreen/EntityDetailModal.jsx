import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  marginTop2: {
    marginTop: theme.spacing(3),
  },
  text: {
    flex: '1',
  },
}));

export default ({
  entity, open, onClose, databaseHandler,
}) => {
  if (!entity) {
    return null;
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  const [openChangeDialog, setOpenChangeDialog] = React.useState(0);
  const [openPasswordDialog, setOpenPasswordDialog] = React.useState(false);

  const [password, setPassword] = React.useState('');

  const switchAccess = (newValue) => async () => {
    if (openChangeDialog === 1) {
      if (newValue !== entity.canExit) {
        await databaseHandler.changeCanExit(entity.name, newValue);
        setOpenChangeDialog(0);
      } else {
        setOpenChangeDialog(0);
      }
    } else if (openChangeDialog === 2) {
      if (newValue !== entity.canGenerateQR) {
        await databaseHandler.changeCanGenerateQR(entity.name, newValue);
        setOpenChangeDialog(0);
      } else {
        setOpenChangeDialog(0);
      }
    }
  };

  const changePassword = async () => {
    if (password === '') {
      return;
    }
    if (password !== entity.password) {
      await databaseHandler.changePassword(entity.name, password);
      setOpenPasswordDialog(false);
    } else {
      setOpenPasswordDialog(false);
    }
  };

  React.useEffect(() => {
    setPassword(entity.password);
  }, [entity]);

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>
          Entity Details
        </DialogTitle>
        <DialogContent>
          <Typography color="primary" variant="subtitle2">
            Name
          </Typography>
          <Typography variant="body1">
            {entity.name}
          </Typography>

          <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
            Cylinders Owned
          </Typography>
          <Typography variant="body1" gutterBottom>
            {entity.cylinderCount}
          </Typography>

          <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
            Can Exit Cylinders?
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography variant="body1" className={classes.text}>
              {entity.canExit ? 'Yes' : 'No'}
            </Typography>
            <Button color="textSecondary" style={{ fontSize: 12, padding: '3px 4px' }} onClick={() => { setOpenChangeDialog(1); }}>Change</Button>
          </div>

          <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
            Can generate new QR codes?
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography variant="body1" className={classes.text}>
              {entity.canGenerateQR ? 'Yes' : 'No'}
            </Typography>
            <Button color="textSecondary" style={{ fontSize: 12, padding: '3px 4px' }} onClick={() => { setOpenChangeDialog(2); }}>Change</Button>
          </div>

          <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
            Password
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography variant="body1" className={classes.text}>
              {entity.password}
            </Typography>
            <Button color="textSecondary" style={{ fontSize: 12, padding: '3px 4px' }} onClick={() => { setOpenPasswordDialog(true); }}>Change</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openChangeDialog} onClose={() => setOpenChangeDialog(0)} maxWidth="xs">
        <DialogContent>
          {openChangeDialog === 1
            ? `Should ${entity.name} be allowed to exit cylinders?`
            : `Should ${entity.name} be allowed to generate new QR?`}

        </DialogContent>
        <DialogActions>
          <Button onClick={switchAccess(false)} color="primary">
            No
          </Button>
          <Button onClick={switchAccess(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPasswordDialog} onClose={() => { setOpenPasswordDialog(false); }} maxWidth="xs">
        <DialogTitle>
          Update Password
        </DialogTitle>
        <DialogContent>
          <TextField
            className={classes.marginTop4}
            id="name"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            error={password.length === 0}
            helperText={password.length ? '' : 'Cannot be empty'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenPasswordDialog(false); }} color="primary">
            Cancel
          </Button>
          <Button onClick={changePassword} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
