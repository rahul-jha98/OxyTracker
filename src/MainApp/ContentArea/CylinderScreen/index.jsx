import React from 'react';
import Table from '../Table';

import DetailModal from './CylinderDetailModal';

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
    id: 'date', numeric: false, disablePadding: false, label: 'Last Updated',
  },
];

export default ({ cylinders, databaseHandler }) => {
  const [data, setData] = React.useState([]);
  const [dialogOpen, setDialogOpenValue] = React.useState(false);
  const [selectedCylinder, setSelectedCylinder] = React.useState('');

  React.useEffect(() => {
    setData(Object.values(cylinders));
  }, [cylinders]);

  const setDialogOpen = (val) => {
    if (val) {
      window.location.hash = '#cylinder';
    } else {
      window.history.back();
    }
  };

  React.useEffect(() => {
    if (window.location.hash === '#cylinder') {
      window.history.back();
    }
    const onHashChange = () => setDialogOpenValue(window.location.hash === '#cylinder');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const onRowClicked = (id) => () => {
    setSelectedCylinder(id);
    setDialogOpen(true);
  };
  return (
    <>
      <Table
        rowArray={data}
        headCells={cells}
        rowID="cylinder_id"
        onRowClicked={onRowClicked}
      />
      <DetailModal
        cylinder={cylinders[selectedCylinder]}
        databaseHandler={databaseHandler}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};
