import React from 'react';
import Table from '../Table';
import DetailModal from './EntityDetailModal';

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

export default ({ users, databaseHandler }) => {
  const [data, setData] = React.useState([]);
  const [dialogOpen, setDialogOpenValue] = React.useState(false);
  const [selectedEntity, setSelectedEntity] = React.useState('');

  React.useEffect(() => {
    setData(Object.values(users));
  }, [users]);

  const setDialogOpen = (val) => {
    if (val) {
      window.location.hash = '#entity';
    } else {
      window.history.back();
    }
  };

  React.useEffect(() => {
    if (window.location.hash === '#entity') {
      window.history.back();
    }
    const onHashChange = () => setDialogOpenValue(window.location.hash === '#entity');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const onRowClicked = (id) => () => {
    setSelectedEntity(id);
    setDialogOpen(true);
  };
  return (
    <>
      <Table
        rowArray={data}
        headCells={cells}
        rowID="phone"
        onRowClicked={onRowClicked}
      />
      <DetailModal
        entity={users[selectedEntity]}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        databaseHandler={databaseHandler}
      />
    </>
  );
};
