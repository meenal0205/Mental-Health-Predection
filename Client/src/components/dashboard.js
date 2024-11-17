import React from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from './LineChart';
import DashboardCalender from './dashboard-components/calender';

Chart.register(CategoryScale);

function Dashboard() {
  return (
      <div className='p-4 grid grid-cols-5 gap-4'>
        <div className='p-4 col-span-3 row-auto rounded-md shadow-lg bg-white'>
          <LineChart />
        </div>
        <div className='p-4 col-span-2 row-auto rounded-md shadow-lg bg-white z-0 flex justify-center'>
          <DashboardCalender />
        </div>
        <div className='p-4 col-span-5 row-auto rounded-md shadow-lg bg-white'>
          <LineChart />
        </div>
      </div>

  )
}

export default Dashboard