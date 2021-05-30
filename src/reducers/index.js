import * as actionTypes from '../actions/types';

const initialDataState = {
  cylinders: {},
  users: {},
  citizens: {},
  roleCylindersMapping: null,
};

const data_reducer = (state = initialDataState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA_SOURCE:
      return action.payload;
    default:
      return state;
  }
};

export default data_reducer;
