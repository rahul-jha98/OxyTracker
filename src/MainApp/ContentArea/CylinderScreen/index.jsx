import React from 'react';
import BarGraph from '../Graph/BarGraph';
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
    id: 'phone', numeric: false, disablePadding: false, label: 'Mobile No',
  },
  {
    id: 'date', numeric: false, disablePadding: false, label: 'Last Updated',
  },
];
const heading = 'Cylinder Distribution Graph';
const convertRoleCylinderData = (roleCylindersMapping) => ({
  labels: Object.keys(roleCylindersMapping),
  datasets: [
    {
      label: 'Cylinders',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: Object.values(roleCylindersMapping),

    },
  ],
});

export default ({ cylinders, roleCylindersMapping, databaseHandler }) => {
  const [data, setData] = React.useState([]);
  const [roleCylindersData, setRoleCylinderMapping] = React.useState({});
  const [dialogOpen, setDialogOpenValue] = React.useState(false);
  const [selectedCylinder, setSelectedCylinder] = React.useState('');

  React.useEffect(() => {
    setData(Object.values(cylinders));
  }, [cylinders]);

  React.useEffect(() => {
    const roleCylinderData = convertRoleCylinderData(roleCylindersMapping);
    setRoleCylinderMapping(roleCylinderData);
  }, [roleCylindersMapping]);

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
      <BarGraph
        data={roleCylindersData}
        heading={heading}
      />
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
