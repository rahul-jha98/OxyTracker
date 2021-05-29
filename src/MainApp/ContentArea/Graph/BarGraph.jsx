import React from 'react';
import { Bar } from 'react-chartjs-2';

export default ({ data, heading }) => (
  <div>
    <Bar
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: heading,
          },
        },
      }}
    />
  </div>
);
