import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/admin/tickets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    
    <div className="p-6 text-white bg-black min-h-screen">
        <AdminNavbar/>
      <h1 className="text-3xl font-bold mb-6 text-[#d3af47]">🎟 Admin Dashboard</h1>

      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-600 rounded-lg">
            <thead>
              <tr className="bg-[#d3af47] text-black">
                <th className="px-4 py-2">Ticket ID</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Event</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Qty</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id} className="text-center border-t border-gray-600">
                  <td className="px-4 py-2">{ticket.ticketId}</td>
                  <td className="px-4 py-2">{ticket.email}</td>
                  <td className="px-4 py-2">{ticket.eventName}</td>
                  <td className="px-4 py-2">{ticket.eventDate || "N/A"}</td>
                  <td className="px-4 py-2">{ticket.numberOfTickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
