import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


function PieChart({ PieData }) {
    const [ChartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        const initialChartData = [0, 0, 0, 0, 0, 0, 0];

        PieData.forEach(element => {
            const score = +element.sentiment_score;
            initialChartData[score] = (initialChartData[score] || 0) + 1;
        });

        setChartData(initialChartData);

    }, [PieData]);


    const data = {
        labels: ['Normal', 'Stress', 'Anxiety', 'Personality disorder', 'Depression', 'Bipolar', 'Suicidal'],
        datasets: [
            {
                data: ChartData,
                backgroundColor: [
                    'rgba(74, 222, 128, 0.5)',
                    'rgba(248, 113, 113, 0.4)',
                    'rgba(96, 165, 250, 0.4)',
                    'rgba(251, 191, 36, 0.4)',
                    'rgba(156, 163, 175, 0.4)',
                    'rgba(192, 132, 252, 0.4)',
                    'rgba(55, 65, 81, 0.4)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (

        <Pie data={data} />
    )
}

export default PieChart