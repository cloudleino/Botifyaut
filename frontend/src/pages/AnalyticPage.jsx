import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AnalyticsPage = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    // Hämta statistik från backend
    const fetchAnalytics = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/analytics/summary", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAnalytics(res.data.summary);
        } catch (err) {
            console.error("Error fetching analytics:", err);
            setAnalytics(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (loading) return <p className="page-wrap">Loading analytics...</p>;
    if (!analytics) return <p className="page-wrap">No analytics data available</p>;

    // Definiera kortdata med ikon + label + value
    const stats = [
        { label: "Total Orders", value: analytics.totalOrders, icon: "🧾" },
        { label: "Completed Orders", value: analytics.completedOrders, icon: "✅" },
        { label: "Total Robots", value: analytics.totalRobots, icon: "🤖" },
        { label: "Active Robots", value: analytics.activeRobots, icon: "⚡" },
        { label: "Avg Orders/Robot", value: analytics.avgOrdersPerRobot.toFixed(2), icon: "📊" },
    ];

    return (
        <div className="page-wrap fade-in">
            {/* HEADER */}
            <header className="user-hero">
                <div className="avatar glow" aria-hidden>
                    📊
                </div>
                <div>
                    <h1>Analytics Dashboard</h1>
                    <p>Overview of orders and robots — quick summary.</p>
                </div>
            </header>

            {/* STATS GRID */}
            <section className="stats-row">
                {stats.map((s, i) => (
                    <div key={i} className="stat">
                        <div className="stat-icon">{s.icon}</div>
                        <div className="stat-label">{s.label}</div>
                        <div className="stat-value">{s.value}</div>
                    </div>
                ))}
            </section>

            {/* Orders by Status Table */}
            <section className="card mt-4">
                <div className="card-head">
                    <h2>Orders by Status</h2>
                </div>
                <table className="table mt-2">
                    <thead>
                    <tr>
                        <th>Status</th>
                        <th>Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {analytics.ordersByStatus.map((status) => (
                        <tr key={status._id}>
                            <td>{status._id}</td>
                            <td>{status.count}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {/* Quick link */}
            <section className="mt-4">
                <Link to="/users" className="card-link">
                    👥 Go to User Dashboard
                </Link>
            </section>
        </div>
    );
};

export default AnalyticsPage;
