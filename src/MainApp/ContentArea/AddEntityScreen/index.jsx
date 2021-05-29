import React, { useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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
  phoneNo: '', name: '', role: '', canExit: false,
};

const roles = [
  'Doctor',
  'Distributor',
  'Supplier',
];

export default ({ firebaseHandler, showToast }) => {
  const classes = useStyles();
  const [entity, setEntity] = React.useState(defaultEntityState);
  const [phoneError, setPhoneError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [roleError, setRoleError] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(false);

  const onTextChange = (propName) => (event) => {
    setEntity({ ...entity, [propName]: event.target.value });
  };

  useEffect(() => {
    setEntity(defaultEntityState);
    setIsDisabled(false);
  }, []);

  const onSubmit = async () => {
    let error = false;
    if (entity.role === '') {
      setRoleError('You must select a role for the entity');
      error = true;
    } else {
      setRoleError('');
    }
    if (entity.name === '') {
      setNameError('Name cannot be empty');
      error = true;
    } else {
      setNameError('');
    }
    if (entity.phoneNo === '') {
      setPhoneError('Mobile Number cannot be empty');
      error = true;
    } else if (/^[0-9]{10}$/.test(entity.phoneNo) === false) {
      setPhoneError('Not a valid 10 digit mobile number');
      error = true;
    } else {
      setPhoneError('');
    }

    if (!error) {
      setIsDisabled(true);
      const { phoneNo, ...payload } = entity;
      payload.cylinders = [];
      const doesUserExist = await firebaseHandler.checkIfUserExist(phoneNo);
      if (doesUserExist) {
        setPhoneError('User with given phone number has already been added');
        setIsDisabled(false);
      } else {
        await firebaseHandler.addUser(phoneNo, payload);
        setIsDisabled(false);
        showToast(`User with mobile number ${phoneNo} has been added to the database`);
        setEntity(defaultEntityState);
      }
    }
  };

  return (
    <div style={{ width: '40%', minWidth: 300, margin: 'auto' }}>
      <img src={AddUser} alt="user" width="60%" style={{ margin: '16px 20%' }} />
      <Typography>Kuch text jisme batana hai ki yeh phone number se mobiel login hoga</Typography>
      <TextField
        className={classes.marginTop2}
        id="phoneno"
        label="Mobile Number"
        variant="outlined"
        value={entity.phoneNo}
        fullWidth
        placeholder="10 digit Mobile Number"
        onChange={onTextChange('phoneNo')}
        disabled={isDisabled}
        error={Boolean(phoneError)}
        helperText={phoneError}
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

      <FormControl
        variant="outlined"
        fullWidth
        className={classes.marginTop2}
        disabled={isDisabled}
        error={Boolean(roleError)}
      >
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          value={entity.role}
          onChange={onTextChange('role')}
          label="Role"
        >
          {roles.map((role) => (
            <MenuItem value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText id="role-helper-text">{roleError}</FormHelperText>
      </FormControl>
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
