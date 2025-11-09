// 📁 frontend/src/pages/Kitchen.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Connect Socket.IO to backend
const socket = io("http://localhost:5001");

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  // 🔹 Fetch all active orders for cooker
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/orders/cooker/orders",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update order status (pending → cooking → ready → served)
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5001/api/orders/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Order updated to ${newStatus}`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (err) {
      console.error("❌ Error updating order:", err);
      toast.error("Failed to update order.");
    }
  };

  // 🔹 Real-time Socket.IO updates
  useEffect(() => {
    fetchOrders();

    socket.on("newOrder", (newOrder) => {
      console.log("📦 New order received:", newOrder);
      setOrders((prev) => [...prev, newOrder]);
      toast.info("🍔 New order received!", { autoClose: 2000 });
    });

    socket.on("orderUpdated", (updatedOrder) => {
      console.log("🔄 Order updated:", updatedOrder);
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    return () => {
      socket.off("newOrder");
      socket.off("orderUpdated");
    };
  }, []);

  // 🔹 Loading or error states
  if (loading) return <p className="text-center mt-5">Loading orders...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="page-wrap mt-4">
      <ToastContainer />
      <h2 className="mb-3 text-brand-700">🍳 Cooker Dashboard</h2>
      <p>Hi Chef! Here are all active orders below:</p>

      {orders.length === 0 ? (
        <p className="text-light mt-4">No active orders right now.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card p-3 mb-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Order ID: {order._id}</h5>
              <span
                className={`badge ${
                  order.status === "pending"
                    ? "bg-warning text-dark"
                    : order.status === "cooking"
                    ? "bg-info text-dark"
                    : order.status === "ready"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {order.status}
              </span>
            </div>

            <ul className="mb-3">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} × {item.quantity} — {item.price} kr
                </li>
              ))}
            </ul>

            <div>
              <label className="me-2 fw-semibold">Change Status:</label>
              <select
                value={order.status}
                onChange={(e) =>
                  handleStatusChange(order._id, e.target.value)
                }
                className="form-select w-auto d-inline-block"
              >
                <option value="pending">Pending</option>
                <option value="cooking">Cooking</option>
                <option value="ready">Ready</option>
                <option value="served">Served</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
