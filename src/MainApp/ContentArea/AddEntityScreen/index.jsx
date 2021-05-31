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
  name: '', canExit: false, canGenerateQR: false, cylinders: [],
};

export default ({ firebaseHandler, showToast }) => {
  const classes = useStyles();
  const [entity, setEntity] = React.useState(defaultEntityState);
  const [nameError, setNameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const onTextChange = (propName) => (event) => {
    setEntity({ ...entity, [propName]: event.target.value });
  };

  const getRandomPassword = () => {
    let key = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 3; i += 1) {
      key += chars.charAt(Math.floor(Math.random() * 26));
    }

    const nums = '0123456789';
    for (let i = 0; i < 3; i += 1) {
      key += nums.charAt(Math.floor(Math.random() * 10));
    }

    return key;
  };
  useEffect(() => {
    setEntity({ ...defaultEntityState, password: getRandomPassword() });
    setIsDisabled(false);
    setNameError(false);
    setPasswordError(false);
  }, []);

  const onSubmit = async () => {
    let error = false;
    if (entity.name === '') {
      setNameError('Name cannot be empty');
      error = true;
    } else {
      setNameError('');
    }

    if (entity.password === '') {
      setPasswordError('Password cannot be empty');
      error = true;
    } else {
      setPasswordError('');
    }

    if (!error) {
      setIsDisabled(true);
      const { name } = entity;
      const doesUserExist = await firebaseHandler.checkIfUserExist(name);
      if (doesUserExist) {
        setNameError('User with given name already exists');
        setIsDisabled(false);
      } else {
        await firebaseHandler.addUser(name, entity);
        setIsDisabled(false);
        showToast(`${name} has been added to the database`);
        setEntity({ ...defaultEntityState, password: getRandomPassword() });
      }
    }
  };

  return (
    <div style={{ width: '40%', minWidth: 300, margin: 'auto' }}>
      <img src={AddUser} alt="user" width="60%" style={{ margin: '16px 20%' }} />
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

      <TextField
        className={classes.marginTop4}
        id="name"
        label="Password"
        variant="outlined"
        fullWidth
        value={entity.password}
        onChange={onTextChange('password')}
        disabled={isDisabled}
        error={Boolean(passwordError)}
        helperText={passwordError}
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
