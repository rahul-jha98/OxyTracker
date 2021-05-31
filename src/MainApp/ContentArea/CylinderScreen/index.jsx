import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    id: 'date', numeric: false, disablePadding: false, label: 'Last Updated',
  },
];
const heading = 'Cylinder Distribution Graph';
const convertRoleCylinderData = (cylinderData, citizens) => ({
  labels: [...Object.keys(cylinderData), 'Citizens'],
  datasets: [
    {
      label: 'Cylinders',
      backgroundColor: '#FECFCE',
      borderColor: '#FF6863',
      borderWidth: 2,
      data: [...Object.values(cylinderData).map((data) => data.cylinderCount),
        Object.keys(citizens).length],
    },
  ],
});

const useStyles = makeStyles((theme) => ({
  graph: {
    margin: 'auto',
    width: '85%',
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

export default ({
  cylinders, users, citizens, databaseHandler, firebaseHandler, showToast,
}) => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [roleCylindersData, setRoleCylinderMapping] = React.useState({});
  const [dialogOpen, setDialogOpenValue] = React.useState(false);
  const [selectedCylinder, setSelectedCylinder] = React.useState('');
  const [animate, setAnimate] = React.useState(true);

  React.useEffect(() => {
    setData(Object.values(cylinders));
  }, [cylinders]);

  React.useEffect(() => {
    const userCylinderData = convertRoleCylinderData(users, citizens);
    setAnimate(true);
    setRoleCylinderMapping(userCylinderData);
    setTimeout(() => {
      setAnimate(false);
    }, 1400);
  }, [users, citizens]);

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
        className={classes.graph}
        withAnimate={animate}
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
        firebaseHandler={firebaseHandler}
        open={dialogOpen}
        showToast={showToast}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};
