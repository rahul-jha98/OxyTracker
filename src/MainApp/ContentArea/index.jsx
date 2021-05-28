import React from 'react';

import AddEntityScreen from './AddEntityScreen';
import CylinderTableScreen from './CylinderTableScreen';
import ApiHandlerContext from '../../provider/ApiHandlerContext';

export default ({ selectedTab }) => {
  const { firebaseHandler, databaseHandler, showToast } = React.useContext(ApiHandlerContext);
  if (selectedTab === 1) {
    return <CylinderTableScreen databaseHandler={databaseHandler} showToast={showToast} />;
  }
  if (selectedTab === 3) {
    return <AddEntityScreen firebaseHandler={firebaseHandler} showToast={showToast} />;
  }
  return null;
};
