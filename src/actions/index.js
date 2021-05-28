import * as actionTypes from './types';

export const setDataSource = (cylinders, users, citizens) => ({
  type: actionTypes.SET_DATA_SOURCE,
  payload: {
    cylinders,
    users,
    citizens,
  },
});

export default setDataSource;
