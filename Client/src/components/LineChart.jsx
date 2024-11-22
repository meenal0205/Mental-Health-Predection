import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ LineData, title }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        if (LineData && LineData.length > 0) {
            setChartData({
                labels: LineData.map((data) => data.date),
                datasets: [
                    {
                        label: "Users Gained",
                        data: LineData.map((data) => data.score),
                        backgroundColor: [
                            "#49325D",
                            "#573D7F",
                            "#7151A9",
                            "#916DD5",
                            "#AC8BEE"
                        ],
                        borderColor: "#7151A9",
                        borderWidth: 2
                    }
                ]
            });
        }
    }, [LineData]);

    return (
        <Line
            data={chartData}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: title
                    },
                    legend: {
                        display: false
                    }
                }
            }}
        />
    );
};

export default LineChart;
