import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    role: "user",
  });
  const token = localStorage.getItem("token");
  console.log("🔑 Token being sent:", token);


  //Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching users");
    }
  };

  // Create a new user
  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/users", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(" User created successfully!");
      setNewUser({ username: "", fullname: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  // Update a user’s role
  const updateUserRole = async (id, role) => {
    try {
      await axios.put(
        `http://localhost:5001/api/users/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Error updating user role");
    }
  };

  //  Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
      alert("🗑️ User deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>👑 Admin Dashboard 👑</h1>
      <h2>As an Administrator, you have full control over the system.</h2>
      <h3>Manage Users</h3>

      {/* ➕ Create User Form */}
      <form
        onSubmit={createUser}
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "80%",
          background: "#f8f9fa",
        }}
      >
        <h4>Create New User</h4>
        <input
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          placeholder="Fullname"
          value={newUser.fullname}
          onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">user</option>
          <option value="manager">manager</option>
          <option value="robot">robot</option>
          <option value="cooker">cooker</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit" style={{ marginLeft: "10px" }}>
          ➕ Add User
        </button>
      </form>

      {/* 👥 Users Table */}
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead style={{ background: "#f1f1f1" }}>
          <tr>
            <th>Fullname</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.fullname}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => updateUserRole(u._id, e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="manager">manager</option>
                    <option value="robot">robot</option>
                    <option value="cooker">cooker</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => deleteUser(u._id)}
                    style={{
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
