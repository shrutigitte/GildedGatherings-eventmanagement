import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/signup", form);
      saveToken(res.data.token);
      navigate("/my-tickets");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg space-y-4 w-96">
        <h2 className="text-2xl font-bold text-[#d3af47]">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 bg-gray-700 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="w-full p-2 bg-gray-700 rounded" required />
        <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" className="w-full p-2 bg-gray-700 rounded" required />
        <button type="submit" className="w-full bg-[#d3af47] py-2 rounded hover:bg-[#b3912f]">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
