import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  const navItemClass = (path) =>
    `px-4 py-2 rounded hover:bg-[#d3af47] hover:text-black ${
      location.pathname === path ? "bg-[#d3af47] text-black" : ""
    }`;

  return (
    <nav className="bg-black text-[#d3af47] p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="flex space-x-4">
        <Link to="/admin/dashboard" className={navItemClass("/admin/dashboard")}>
          Dashboard
        </Link>
        <Link to="/admin/create-event" className={navItemClass("/admin/create-event")}>
          Create Event
        </Link>
        <button onClick={handleLogout} className="px-4 py-2 rounded bg-[#e30b5d] text-white hover:bg-[#c20b4f]">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
