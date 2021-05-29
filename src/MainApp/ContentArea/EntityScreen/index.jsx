import React from 'react';
import Table from '../Table';

const cells = [
  {
    id: 'name', numeric: false, disablePadding: false, label: 'Name',
  },
  {
    id: 'role', numeric: false, disablePadding: false, label: 'Role',
  },
  {
    id: 'cylinderCount', numeric: true, disablePadding: true, label: 'Cylinders Owned',
  },
  {
    id: 'phone', numeric: true, disablePadding: true, label: 'Mobile No',
  },
];

export default ({ users, showToast }) => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    setData(Object.values(users));
  }, [users]);

  const onRowClicked = (id) => () => {
    showToast(`Now I will show the details of user ${id}`);
  };
  return (
    <Table
      rowArray={data}
      headCells={cells}
      rowID="phone"
      onRowClicked={onRowClicked}
    />
  );
};
