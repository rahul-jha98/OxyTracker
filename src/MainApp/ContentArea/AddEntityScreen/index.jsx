import React, { useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import AddUser from './add_user.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginTop4: {
    marginTop: theme.spacing(4),
  },
}));

const defaultEntityState = {
  name: '', canExit: false, canGenerateQR: false, cylinders: [], email: '',
};

export default ({ firebaseHandler, showToast }) => {
  const classes = useStyles();
  const [entity, setEntity] = React.useState(defaultEntityState);
  const [emailError, setEmailError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(false);

  const onTextChange = (propName) => (event) => {
    setEntity({ ...entity, [propName]: event.target.value });
  };
  useEffect(() => {
    setEntity(defaultEntityState);
    setIsDisabled(false);
    setNameError('');
    setEmailError('');
  }, []);

  const onSubmit = async () => {
    let error = false;
    if (entity.name === '') {
      setNameError('Name cannot be empty');
      error = true;
    } else {
      setNameError('');
    }

    if (entity.email === '') {
      setEmailError('Email cannot be empty');
      error = true;
    } else {
      setEmailError('');
    }

    if (!error) {
      setIsDisabled(true);
      const { email, ...payload } = entity;
      const doesUserExist = await firebaseHandler.checkIfUserExist(email);
      if (doesUserExist) {
        setNameError('User with given name already exists');
        setIsDisabled(false);
      } else {
        await firebaseHandler.addUser(email, payload);
        setIsDisabled(false);
        showToast(`${email} has been added to the database`);
      }
    }
  };

  return (
    <div style={{ width: '40%', minWidth: 300, margin: 'auto' }}>
      <img src={AddUser} alt="user" width="60%" style={{ margin: '16px 20%' }} />
      <TextField
        id="email"
        label="GMail Account"
        variant="outlined"
        value={entity.email}
        fullWidth
        placeholder="Gmail account ID"
        onChange={onTextChange('email')}
        disabled={isDisabled}
        error={Boolean(emailError)}
        helperText={emailError}
        type="email"
      />

      <TextField
        className={classes.marginTop4}
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

      <div style={{ display: 'flex', alignItems: 'center' }} className={classes.marginTop2}>
        <Typography style={{ flex: 1 }}>Can exit cylinders from system?</Typography>
        <Checkbox
          checked={entity.canExit}
          onChange={(ev) => setEntity({ ...entity, canExit: ev.target.checked })}
          name="Can Exit"
          color="primary"
          inputProps={{ 'aria-label': 'can exit checkbox' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }} className={classes.marginTop2}>
        <Typography style={{ flex: 1 }}>Can generate new QR codes?</Typography>
        <Checkbox
          checked={entity.canGenerateQR}
          onChange={(ev) => setEntity({ ...entity, canGenerateQR: ev.target.checked })}
          name="Can Generate"
          color="primary"
          inputProps={{ 'aria-label': 'can generate checkbox' }}
        />
      </div>

      <Button
        disabled={isDisabled}
        className={classes.marginTop4}
        variant="contained"
        color="secondary"
        disableElevation
        onClick={onSubmit}
      >
        Add Entity
      </Button>
    </div>
  );
};
