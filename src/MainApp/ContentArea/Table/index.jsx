import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import TableUiDumb from './TableUiDumb';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  select: {
    minWidth: 100,
    color: '#8a8a8a',
  },
}));

export default ({
  className, rowArray, headCells, rowID, onRowClicked,
}) => {
  const classes = useStyles();
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [searchColumn, setSearchColumn] = React.useState(0);
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    if (searchText === '') {
      setFilteredRows(rowArray);
    } else {
      const searchColumnName = headCells[searchColumn].id;
      setFilteredRows(rowArray
        .filter((val) => (val[searchColumnName] || '').includes(searchText)));
    }
  }, [rowArray, searchColumn, searchText, headCells]);
  return (
    <div className={className}>
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          value={searchText}
          onChange={(ev) => setSearchText(ev.target.value)}
          placeholder="Search Table"
          inputProps={{ 'aria-label': 'search table' }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <Select
          disableUnderline
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchColumn}
          onChange={(ev) => setSearchColumn(ev.target.value)}
          className={classes.select}
          renderValue={(val) => `in ${headCells[val].label} Column`}
        >
          {headCells.map((head, idx) => <MenuItem value={idx}>{head.label}</MenuItem>)}
        </Select>
      </Paper>
      <TableUiDumb
        rows={filteredRows}
        headCells={headCells}
        id={rowID}
        onRowClicked={onRowClicked}
      />
    </div>
  );
};
