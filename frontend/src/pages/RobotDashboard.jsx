import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import robotService from "../services/robotService";

const RobotDashboard = () => {
    const { user } = useAuth();
    const [robots, setRobots] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch robots
    const fetchRobots = async () => {
        try {
            const data = await robotService.getRobots();
            setRobots(data);
        } catch (err) {
            console.error("Failed to fetch robots:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRobots();
    }, []);

    // Add robot
    const handleAdd = async () => {
        const name = prompt("Enter robot name:");
        const location = prompt("Enter location (Kitchen / Serving):");
        if (!name || !location) return;

        try {
            const newRobot = await robotService.createRobot({ name, location, status: "Offline" });
            setRobots([...robots, newRobot]);
        } catch (err) {
            console.error("Failed to add robot:", err);
        }
    };

    // Update robot
    const handleUpdate = async (robot) => {
        const newStatus = prompt("Enter new status (Active / Paused / Offline):", robot.status);
        if (!newStatus) return;

        try {
            const updatedRobot = await robotService.updateRobot(robot._id, { status: newStatus });
            setRobots(robots.map(r => (r._id === robot._id ? updatedRobot : r)));
        } catch (err) {
            console.error("Failed to update robot:", err);
        }
    };

    // Delete robot
    const handleDelete = async (robotId) => {
        if (!window.confirm("Are you sure you want to delete this robot?")) return;
        try {
            await robotService.deleteRobot(robotId);
            setRobots(robots.filter(r => r._id !== robotId));
        } catch (err) {
            console.error("Failed to delete robot:", err);
        }
    };

    if (loading) return <p>Loading robots...</p>;

    return (
        <div style={{ padding: "40px" }}>
            <h1>🤖 Robot Dashboard</h1>
            <p>Hello {user?.fullname}, ready to handle automation tasks?</p>

            <button onClick={handleAdd} style={{ marginBottom: "20px" }}>➕ Add Robot</button>

            {robots.length === 0 ? (
                <p>No robots found. Add one to get started!</p>
            ) : (
                robots.map(robot => (
                    <div key={robot._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                        <h4>{robot.name}</h4>
                        <p>Location: {robot.location}</p>
                        <p>Status: {robot.status}</p>
                        <button onClick={() => handleUpdate(robot)} style={{ marginRight: "10px" }}>Update Status</button>
                        <button onClick={() => handleDelete(robot._id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default RobotDashboard;
