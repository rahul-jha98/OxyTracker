import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Tooltip from '@material-ui/core/Tooltip';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import { ReactComponent as QR } from './qrCode.svg';

const useStyles = makeStyles((theme) => ({
  marginTop2: {
    marginTop: theme.spacing(3),
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: `${theme.spacing(3)} ${theme.spacing(1)}`,
    paddingRight: 12,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
});

const CustomDialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onQRDownloadClicked, ...other
  } = props;
  return (

    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.title} variant="h6">{children}</Typography>
      <Tooltip title="Download QR Image">
        <IconButton aria-label="qr" className={classes.icon} onClick={onQRDownloadClicked}>
          <SvgIcon>
            <QR />
          </SvgIcon>
        </IconButton>
      </Tooltip>

    </DialogTitle>

  );
});

export default ({
  cylinder, open, onClose, databaseHandler, firebaseHandler, showToast,
}) => {
  if (!cylinder) {
    return null;
  }
  const [history, setHistory] = React.useState([]);
  React.useEffect(() => {
    setHistory([]);
    databaseHandler.getHistoryFor(cylinder.cylinder_id).then((data) => {
      if (data) {
        setHistory(data);
      }
    });
  }, [cylinder, databaseHandler]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  const [url, setUrl] = React.useState('');
  const aRef = React.useRef();

  const downloadQR = async () => {
    try {
      const qrUrl = await firebaseHandler.getQRDownloadLink(cylinder.cylinder_id);
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = () => {
        const blob = xhr.response;
        const blobUrl = window.URL.createObjectURL(blob);
        setUrl(blobUrl);
        setTimeout(() => {
          aRef.current.click();
        }, 1000);
      };
      xhr.open('GET', qrUrl);
      xhr.send();
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
      <CustomDialogTitle onQRDownloadClicked={downloadQR}>
        Cylinder Details
      </CustomDialogTitle>
      <DialogContent>
        <a hidden ref={aRef} href={url} download={`QR-${cylinder.cylinder_id}.jpg`} target="_blank" rel="noreferrer">Hello</a>
        <Typography color="primary" variant="subtitle2">
          Cylinder ID
        </Typography>
        <Typography variant="body1" gutterBottom>
          {cylinder.cylinder_id}
        </Typography>
        <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
          Current Owner
        </Typography>
        <Typography variant="body1">
          {cylinder.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {cylinder.owner.phone}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {cylinder.role}
        </Typography>

        <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
          Last Updated
        </Typography>
        <Typography variant="body1" gutterBottom>
          {cylinder.date}
          {' '}
          -
          {' '}
          {cylinder.time}
        </Typography>

        <Typography className={classes.marginTop2} color="primary" variant="subtitle2">
          History
        </Typography>
        <Timeline>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" gutterBottom>
                {cylinder.date}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {cylinder.time}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body1">
                {cylinder.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {cylinder.owner.phone}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {cylinder.role}
              </Typography>
            </TimelineContent>
          </TimelineItem>

          {history.map((item) => (
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" gutterBottom>
                  {item.date}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {item.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent style={{ paddingBottom: 8 }}>
                <Typography variant="body1">
                  {item.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {item.owner.phone}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {item.role}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </DialogContent>
    </Dialog>
  );
};
