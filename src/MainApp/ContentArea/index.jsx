import React from 'react';

import AddEntityScreen from './AddEntityScreen';

export default ({ selectedTab }) => {
  if (selectedTab === 2) {
    return <AddEntityScreen />;
  }
  return null;
};
