import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ApiHandlerContext from '../../provider/ApiHandlerContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop3: {
    marginTop: theme.spacing(3),
  },
  actions: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const defaultAdminState = {
  name: '', email: '',
};

export default ({ open, toggleOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const { firebaseHandler } = React.useContext(ApiHandlerContext);

  const classes = useStyles();
  const [entity, setEntity] = React.useState(defaultAdminState);
  const [mailError, setMailError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(false);

  const onTextChange = (propName) => (event) => {
    setEntity({ ...entity, [propName]: event.target.value });
  };

  const closeDialog = () => {
    // First call toggle open to hide the dialog
    toggleOpen();
    // Wait for 300ms for close animation to finish and
    // then reset the fields to initialCategoryFields for
    // next time
    setTimeout(() => {
      setEntity(defaultAdminState);
      setIsDisabled(false);
    }, 300);
  };

  const onSubmit = async () => {
    let error = false;
    if (entity.name === '') {
      setNameError('Name cannot be empty');
      error = true;
    } else {
      setNameError('');
    }
    if (entity.email === '') {
      setMailError('Email cannot be empty');
      error = true;
    } else {
      setMailError('');
    }

    if (!error) {
      setIsDisabled(true);
      const doesUserExist = await firebaseHandler.checkIfAdminExist(entity.email);
      if (doesUserExist) {
        setMailError('Admin with this email has already been added');
        setIsDisabled(false);
      } else {
        await firebaseHandler.addAdmin(entity.email, entity);
        setIsDisabled(false);
        closeDialog();
      }
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={toggleOpen}
      aria-labelledby="responsive-dialog-title"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle>Add New Admin</DialogTitle>
      <DialogContent>
        <TextField
          id="email"
          label="GMail Account"
          variant="outlined"
          value={entity.email}
          fullWidth
          placeholder="Gmail account ID"
          onChange={onTextChange('email')}
          disabled={isDisabled}
          error={Boolean(mailError)}
          helperText={mailError}
          type="email"
        />

        <TextField
          className={classes.marginTop3}
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          value={entity.name}
          onChange={onTextChange('name')}
          disabled={isDisabled}
          error={Boolean(nameError)}
          helperText={nameError}
        />
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button autoFocus onClick={closeDialog} color="primary" disabled={isDisabled}>
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained" autoFocus disabled={isDisabled}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
