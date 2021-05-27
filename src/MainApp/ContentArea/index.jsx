import React from 'react';

import AddEntityScreen from './AddEntityScreen';
import ApiHandlerContext from '../../provider/ApiHandlerContext';

export default ({ selectedTab }) => {
  const { firebaseHandler } = React.useContext(ApiHandlerContext);
  if (selectedTab === 2) {
    return <AddEntityScreen firebaseHandler={firebaseHandler} />;
  }
  return null;
};
