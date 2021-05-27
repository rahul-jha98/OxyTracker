import React from 'react';
import ApiHandlerContext from './ApiHandlerContext';

const ApiHandlerProvider = (props) => {
  const {
    firebaseHandler, showToast,
  } = props;

  return (
    <ApiHandlerContext.Provider
      value={{
        firebaseHandler, showToast,
      }}
    >
      {props.children}
    </ApiHandlerContext.Provider>
  );
};

export default ApiHandlerProvider;
