import React from 'react';
import { connect } from 'react-redux';

import AddEntityScreen from './AddEntityScreen';
import EntityScreen from './EntityScreen';
import CitizensScreen from './CitizensScreen';
import CylinderScreen from './CylinderScreen';

import ApiHandlerContext from '../../provider/ApiHandlerContext';

const ContentArea = ({
  selectedTab, cylinders, users, citizens,
}) => {
  const { firebaseHandler, showToast, databaseHandler } = React.useContext(ApiHandlerContext);
  if (selectedTab === 0) {
    return <EntityScreen users={users} showToast={showToast} />;
  }
  if (selectedTab === 1) {
    return (
      <CylinderScreen
        cylinders={cylinders}
        databaseHandler={databaseHandler}
        showToast={showToast}
      />
    );
  }
  if (selectedTab === 2) {
    return (
      <CitizensScreen
        citizens={citizens}
        showToast={showToast}
      />
    );
  }
  if (selectedTab === 3) {
    return <AddEntityScreen firebaseHandler={firebaseHandler} showToast={showToast} />;
  }
  return null;
};

const mapStateToProps = (state) => ({
  cylinders: state.cylinders,
  users: state.users,
  citizens: state.citizens,
});

export default connect(mapStateToProps)(ContentArea);
