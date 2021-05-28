import React from 'react';
import { connect } from 'react-redux';

import AddEntityScreen from './AddEntityScreen';
import CylinderTableScreen from './CylinderTableScreen';
import ApiHandlerContext from '../../provider/ApiHandlerContext';

const ContentArea = ({ selectedTab, cylinders }) => {
  const { firebaseHandler, showToast } = React.useContext(ApiHandlerContext);
  if (selectedTab === 1) {
    return <CylinderTableScreen cylinders={cylinders} showToast={showToast} />;
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
