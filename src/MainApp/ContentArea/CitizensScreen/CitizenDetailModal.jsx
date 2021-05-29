import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  marginTop2: {
    marginTop: theme.spacing(3),
  },
}));

export default ({
  citizen, open, onClose,
}) => {
  if (!citizen) {
    return null;
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle>
        Citizen Details
      </DialogTitle>
      <DialogContent>
        <Typography color="primary" variant="subtitle2">
          Name
        </Typography>
        <Typography variant="body1">
          {citizen.name}
        </Typography>

        <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
          Mobile Number
        </Typography>
        <Typography variant="body1" gutterBottom>
          {citizen.phone}
        </Typography>

        <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
          Address
        </Typography>
        <Typography variant="body1" gutterBottom>
          {citizen.address}
        </Typography>

        <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
          Cylinder Owned
        </Typography>
        <Typography variant="body1" gutterBottom>
          {citizen.cylinder_id}
        </Typography>

        <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
          Cylinder Received On
        </Typography>
        <Typography variant="body1" gutterBottom>
          {citizen.date}
          {' '}
          {citizen.time}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
