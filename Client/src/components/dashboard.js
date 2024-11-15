import React from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from './LineChart';

Chart.register(CategoryScale);

function Dashboard() {
  return (
    <div className='bg-[#fffcf9]'>
      <div className='p-4 grid grid-cols-2 gap-4'>
        <div className='p-4 row-auto rounded-md shadow-lg bg-white'>
          <LineChart />
        </div>
        <div className='p-4 row-auto rounded-md shadow-lg bg-white'>
        </div>
        <div className='p-4 col-span-2 row-auto rounded-md shadow-lg bg-white'>
          <LineChart />
        </div>
      </div>
    </div>

  )
}

export default Dashboard