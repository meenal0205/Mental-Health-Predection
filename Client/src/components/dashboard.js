import React, { useEffect, useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from './LineChart';
import DashboardCalender from './dashboard-components/calender';
import { getDashboardData } from '../services/services';
import { getUserdetails } from '../utils/session';
import PieChart from './pieChart';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale);

function Dashboard() {

  const [LineChartDataWeek, setLineChartDataWeek] = useState([])
  const uniqueDatesWeekly = [...LineChartDataWeek];

  const [LineChartDataMonthly, setLineChartDataMonthly] = useState([])
  const uniqueDatesMonthly = [...LineChartDataMonthly];
  const [PieChartData, setPieChart] = useState([])


  useEffect(() => {
    async function getChartData(username) {
      let response = await getDashboardData(username)
      setPieChart(response.data.monthly_report);
      response.data.weekly_report.forEach(element => {
        const newEntry = {
          date: element.date + "/" + element.month + "/" + element.year,
          score: element.sentiment_score
        };

        if (!uniqueDatesWeekly.some(entry =>
          entry.date === newEntry.date && entry.score === newEntry.score)) {
          uniqueDatesWeekly.push(newEntry);
        }



      });

      response.data.monthly_report.forEach(element => {
        const newEntry = {
          date: element.date + "/" + element.month + "/" + element.year,
          score: element.sentiment_score
        };

        if (!uniqueDatesMonthly.some(entry =>
          entry.date === newEntry.date && entry.score === newEntry.score)) {
          uniqueDatesMonthly.push(newEntry);
        }
      });

      console.log("line chart data", LineChartDataWeek)
      setLineChartDataWeek(uniqueDatesWeekly);
      setLineChartDataMonthly(uniqueDatesMonthly);
    }
    getChartData(getUserdetails().username)
  }, [])

  return (
    <div className='p-4 grid grid-cols-5 gap-4'>
      <div className='p-4 col-span-3 row-auto rounded-md shadow-lg bg-white'>
        <LineChart LineData={LineChartDataWeek} title="Weeky Reports" />
      </div>
      <div className='p-4 col-span-2 row-auto rounded-md shadow-lg bg-white z-0 flex justify-center'>
        <DashboardCalender username={getUserdetails().username} />
      </div>
      <div className='p-8 col-span-2 row-auto rounded-md shadow-lg bg-white flex flex-col items-center '>
        <h2 className='font-semibold text-xs text-gray-600'>Weekly Report</h2>
        <PieChart PieData={PieChartData} />
      </div>
      <div className='p-4 col-span-3 row-auto rounded-md shadow-lg bg-white'>
        <LineChart LineData={LineChartDataMonthly} title="Monthly Reports" />
      </div>
    </div>
  )
}

export default Dashboard;