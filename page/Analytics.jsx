import React, { useEffect, useState } from "react";
import SummaryCards from "../components/SummaryCards";
import AnalyticsChart from "../components/AnalyticsChart";

const Analytics = () => {
    const [summary, setSummary] = useState({});
    const [timeseries, setTimeseries] = useState([]);
    const [range, setRange] = useState("7d");

    useEffect(() => {
        fetch("http://localhost:5000/analytics/summary")
            .then(res => res.json())
            .then(setSummary);

        fetch(`http://localhost:5000/analytics/timeseries?range=${range}`)
            .then(res => res.json())
            .then(setTimeseries);
    }, [range]);

    return (
        <div className="container mt-4">
            <h2>📊 Analytics Dashboard</h2>

            <SummaryCards data={summary} />

            <div className="d-flex justify-content-end mb-2">
                <select
                    className="form-select w-auto"
                    value={range}
                    onChange={e => setRange(e.target.value)}
                >
                    <option value="7d">Senaste 7 dagar</option>
                    <option value="30d">Senaste 30 dagar</option>
                </select>
            </div>

            <AnalyticsChart data={timeseries} />
        </div>
    );
};

export default Analytics;