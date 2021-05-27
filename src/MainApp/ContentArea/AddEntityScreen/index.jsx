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

import AddUser from './add_user.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginBottom2: {
    marginBottom: theme.spacing(2),
  },
  marginTop4: {
    marginTop: theme.spacing(4),
  },
  actions: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const defaultEntityState = {
  phoneNo: '', name: '', role: '', canExit: false,
};

const roles = [
  { name: 'Doctor', canExit: true },
  { name: 'Distributor' },
  { name: 'Supplier' },
];

export default () => {
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

  const onSubmit = () => {
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
      const { phoneNo, ...payload } = entity;
      payload.canExit = !!roles.filter((val) => val.name === payload.role)[0].canExit;
      // console.log(phoneNo);
      // console.log(payload);
      // check karna hai ki kya firebase pe entity.phoneNumber exist karta hai
      // if nahi toh push kar do
      // else error set kar do
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
            <MenuItem value={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText id="role-helper-text">{roleError}</FormHelperText>
      </FormControl>
      <div style={{ display: 'flex', justifyContent: 'flexEnd' }}>
        <Button
          className={classes.marginTop4}
          variant="contained"
          color="secondary"
          disableElevation
          onClick={onSubmit}
        >
          Add Entity
        </Button>
      </div>

    </div>
  );
};
