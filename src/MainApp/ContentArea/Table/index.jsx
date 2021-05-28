import React from 'react';
import TableUiDumb from './TableUiDumb';

export default ({
  rowArray, headCells, rowID, onRowClicked,
}) => (
  <TableUiDumb
    rows={rowArray}
    headCells={headCells}
    id={rowID}
    onRowClicked={onRowClicked}
  />
);
