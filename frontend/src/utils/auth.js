export const logout = async () => {
  try {
    // optional: notify backend
    await fetch("http://localhost:5001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    // 🧹 Remove all auth info from storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");

    // ✅ Redirect to login page
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout error:", err);
  }
};
