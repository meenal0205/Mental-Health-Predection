import React, { useState } from 'react'
import { Line } from 'react-chartjs-2';

const LineChart = () => {
    const Data = [
        {
            id: 1,
            year: 2016,
            userGain: 80000,
            userLost: 823
        },
        {
            id: 2,
            year: 2017,
            userGain: 45677,
            userLost: 345
        },
        {
            id: 3,
            year: 2018,
            userGain: 78888,
            userLost: 555
        },
        {
            id: 4,
            year: 2019,
            userGain: 90000,
            userLost: 4555
        },
        {
            id: 5,
            year: 2020,
            userGain: 4300,
            userLost: 234
        }
    ];
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained ",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "#49325D",
                    "&quot;#573D7F",
                    "#7151A9",
                    "#916DD5",
                    "#AC8BEE"
                ],
                borderColor: "#7151A9",
                borderWidth: 2
            }
        ]
    });

    return (
        <Line
            data={chartData}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Users Gained between 2016-2020"
                    },
                    legend: {
                        display: false
                    }
                }
            }}
        />
    );
}

export default LineChart