import React from 'react';
import Table from '../Table';
import DetailModal from './CitizenDetailModal';

const cells = [
  {
    id: 'name', numeric: false, disablePadding: false, label: 'Name',
  },
  {
    id: 'phone', numeric: true, disablePadding: true, label: 'Mobile No',
  },
  {
    id: 'cylinder_id', numeric: true, disablePadding: true, label: 'Cylinder Owned',
  },
];

export default ({ citizens }) => {
  const [data, setData] = React.useState([]);
  const [dialogOpen, setDialogOpenValue] = React.useState(false);
  const [selectedEntity, setSelectedEntity] = React.useState('');

  React.useEffect(() => {
    setData(Object.values(citizens));
  }, [citizens]);

  const setDialogOpen = (val) => {
    if (val) {
      window.location.hash = '#citizens';
    } else {
      window.history.back();
    }
  };

  React.useEffect(() => {
    if (window.location.hash === '#citizens') {
      window.history.back();
    }
    const onHashChange = () => setDialogOpenValue(window.location.hash === '#citizens');
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
        rowID="citizen_id"
        onRowClicked={onRowClicked}
      />
      <DetailModal
        citizen={citizens[selectedEntity]}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};
