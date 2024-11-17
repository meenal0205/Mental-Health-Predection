import React, { useState } from 'react'
import { Line } from 'react-chartjs-2';

const LineChart = () => {
    const Data = [
        {
            id: 1,
            year: "5/11/2024",
            userGain: 0,
            userLost: 823
        },
        {
            id: 2,
            year: "6/11/2024",
            userGain: 1,
            userLost: 345
        },
        {
            id: 3,
            year: "7/11/2024",
            userGain: 3,
            userLost: 555
        },
        {
            id: 4,
            year:" 8/11/2024",
            userGain: 2,
            userLost: 4555
        },
        {
            id: 5,
            year: "9/11/2024",
            userGain: 3,
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
                        text: "User Reports"
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