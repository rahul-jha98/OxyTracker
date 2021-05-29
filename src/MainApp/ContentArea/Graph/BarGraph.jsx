import React from 'react';
import { Bar } from 'react-chartjs-2';

export default ({
  data, heading, className, withAnimate,
}) => (
  <div className={className}>
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
        animation: {
          duration: withAnimate ? 1200 : 0,
        },
      }}
    />
  </div>
);
