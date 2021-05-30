/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import OpenInNewOutlinedIcon from '@material-ui/icons/OpenInNewOutlined';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  marginTop2: {
    marginTop: theme.spacing(3),
  },
}));

export default ({
  citizen, open, onClose, firebaseHandler, showToast,
}) => {
  if (!citizen) {
    return null;
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  const [url, setUrl] = React.useState('');
  const aRef = React.useRef();

  const openPrescription = async (event) => {
    event.preventDefault();
    showToast('Opening prescription image...');
    try {
      const prescriptionUrl = await firebaseHandler
        .getPrescriptionLink(citizen.prescriptionFileName);

      setUrl(prescriptionUrl);
      setTimeout(() => {
        aRef.current.click();
      }, 1000);
    } catch (err) {
      switch (err.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          showToast("The QR file doesn't exist");
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          showToast('Access Denied');
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

          // ...

        default:
          // Unknown error occurred, inspect the server response
          showToast('Something went wrong. Try again later');
          break;
      }
    }
  };

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
        <a hidden ref={aRef} href={url} target="_blank" rel="noreferrer">Download</a>
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
          Prescription
        </Typography>
        <Typography variant="body1" gutterBottom>
          <Link href="#" onClick={openPrescription} color="inherit">
            View Prescription
          </Link>
          <OpenInNewOutlinedIcon style={{ fontSize: 16, marginBottom: -2, marginLeft: 4 }} />
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
