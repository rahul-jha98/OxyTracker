import React from 'react';
import Table from '../Table';

const cells = [
  {
    id: 'cylinder_id', numeric: false, disablePadding: true, label: 'Cylinder ID',
  },
  {
    id: 'name', numeric: false, disablePadding: false, label: 'Name',
  },
  {
    id: 'role', numeric: false, disablePadding: false, label: 'Role',
  },
  {
    id: 'date', numeric: false, disablePadding: false, label: 'Timestamp',
  },
];

export default ({ cylinders, showToast }) => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    setData(Object.values(cylinders));
  }, [cylinders]);

  const onRowClicked = (id) => () => {
    showToast(`Now I will show the details of cylinder ${id}`);
  };
  return (
    <Table
      rowArray={data}
      headCells={cells}
      rowID="cylinder_id"
      onRowClicked={onRowClicked}
    />
  );
};
