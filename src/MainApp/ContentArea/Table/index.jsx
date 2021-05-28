import React from 'react';
import TableUiDumb from './TableUiDumb';

export default ({
  className, rowArray, headCells, rowID, onRowClicked,
}) => (
  <div className={className}>
    <TableUiDumb
      rows={rowArray}
      headCells={headCells}
      id={rowID}
      onRowClicked={onRowClicked}
    />
  </div>
);
