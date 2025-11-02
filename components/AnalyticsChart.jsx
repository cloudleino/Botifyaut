import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const AnalyticsChart = ({ data }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const ctx = canvasRef.current.getContext("2d");
        const chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: data.map(d => d._id),
                datasets: [
                    {
                        label: "Revenue per day",
                        data: data.map(d => d.value),
                        borderWidth: 2,
                        borderColor: "#007bff",
                        backgroundColor: "rgba(0, 123, 255, 0.2)",
                        tension: 0.3,
                    },
                ],
            },
            options: { responsive: true, maintainAspectRatio: false },
        });

        return () => chart.destroy();
    }, [data]);

    return (
        <div style={{ height: "300px" }}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default AnalyticsChart;
