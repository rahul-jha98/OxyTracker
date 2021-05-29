import * as actionTypes from './types';

export const setDataSource = (cylinders, users, citizens, roleCylindersMapping) => ({
  type: actionTypes.SET_DATA_SOURCE,
  payload: {
    cylinders,
    users,
    citizens,
    roleCylindersMapping,
  },
});

export default setDataSource;
