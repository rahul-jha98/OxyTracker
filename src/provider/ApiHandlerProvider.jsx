import React from 'react';
import ApiHandlerContext from './ApiHandlerContext';

const ApiHandlerProvider = (props) => {
  const {
    firebaseHandler, showToast, databaseHandler,
  } = props;

  return (
    <ApiHandlerContext.Provider
      value={{
        firebaseHandler, showToast, databaseHandler,
      }}
    >
      {props.children}
    </ApiHandlerContext.Provider>
  );
};

export default ApiHandlerProvider;
