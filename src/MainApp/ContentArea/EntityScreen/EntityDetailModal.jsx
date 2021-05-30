import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

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
  const [openChangeDialog, setOpenChangeDialog] = React.useState(false);

  const switchAccess = (newValue) => async () => {
    if (newValue !== entity.canExit) {
      await databaseHandler.changeCanExit(entity.phone, newValue);
      setOpenChangeDialog(false);
    } else {
      setOpenChangeDialog(false);
    }
  };
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
            Details
          </Typography>
          <Typography variant="body1">
            {entity.name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {entity.role}
          </Typography>

          <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
            Mobile Number
          </Typography>
          <Typography variant="body1" gutterBottom>
            {entity.phone}
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
            <Button color="textSecondary" style={{ fontSize: 12, padding: '3px 4px' }} onClick={() => { setOpenChangeDialog(true); }}>Change</Button>
          </div>

          <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
            Added By
          </Typography>
          <Typography variant="body1" gutterBottom>
            {entity.adder_admin || '-'}
          </Typography>
        </DialogContent>
      </Dialog>

      <Dialog open={openChangeDialog} onClose={() => setOpenChangeDialog(false)} maxWidth="xs">
        <DialogContent>
          {`Should ${entity.name} be allowed to exit cylinders?`}
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
    </>
  );
};
