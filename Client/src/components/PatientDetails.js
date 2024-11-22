import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { getAllDiaryEntriesByUsername, getDashboardData } from '../services/services';
import DiaryEntry from './diary-components/diaryEntry';
import PieChart from './pieChart';
import { Pie } from 'react-chartjs-2';
import DashboardCalender from './dashboard-components/calender';
import { getUserdetails } from '../utils/session';


function PatientDetails() {
    const location = useLocation();
    const [DiaryEntries, setDiaryEntries] = useState([]);

    const [PieChartDataWeekly, setPieChartWeekly] = useState([])
    const [PieChartDataMonthly, setPieChartMonthly] = useState([])

    useEffect(() => {
        async function getPatientDetails(username) {
            const response = await getAllDiaryEntriesByUsername(username);
            const response2 = await getDashboardData(username);
            setPieChartMonthly(response2.data.monthly_report);
            setPieChartWeekly(response2.data.weekly_report);

            setDiaryEntries(response.data)
        }
        // console.log(DiaryEntries)
        // console.log(UserReport.monthly_report);

        getPatientDetails(location.state.name)


    }, [])

    return (
        <div>
            <div className='p-4 grid grid-cols-3 gap-4'>
                <div className='p-8 row-auto rounded-md shadow-lg bg-white flex flex-col items-center gap-4'>
                    <h2 className='font-semibold text-xl'>Weekly Report</h2>
                    <PieChart PieData={PieChartDataWeekly} />
                </div>
                <div className='p-8 row-auto rounded-md shadow-lg bg-white flex flex-col items-center gap-4'>
                    <h2 className='font-semibold text-xl'>Monthly Report</h2>
                    <PieChart PieData={PieChartDataMonthly} />
                </div>
                <div className='p-4 row-auto rounded-md shadow-lg bg-white flex flex-col items-center gap-4'>
                    <DashboardCalender username={location.state.name} />
                </div>
            </div>
            <div>
                {DiaryEntries.map((entry, index) => (
                    <div>

                        <DiaryEntry key={index} title={entry.title} content={entry.content} date={entry.created_at} sentiment={entry.sentiment} />

                    </div>
                ))}
            </div>

        </div>
    )
}

export default PatientDetails