/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Graphs } from './Graph.styled';

const Graph: React.FC = () => {
  const state = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56],
        borderRadius: 2,
      },

      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 2,
      },
    ],
  };
  const options: any = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          drawTicks: false,
          drawOnChartArea: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            family: 'Now',
          },
        },
      },
      // drawTicks: false,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'Now',
          },
        },
      },
    },
  };
  return (
    <Graphs>
      <div>
        <Bar
          id="1"
          data={state}
          options={options}
          style={{
            width: '80%',
            height: '80%',
          }}
        />
      </div>
      <div>
        <p>another graphic</p>
      </div>
    </Graphs>
  );
};

export default Graph;
