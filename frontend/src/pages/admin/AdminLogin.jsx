import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg space-y-4 w-80">
        <h2 className="text-2xl text-[#d3af47] font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
          required
        />
        <button className="w-full bg-[#d3af47] text-black py-2 rounded hover:bg-[#b28e2b]">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
