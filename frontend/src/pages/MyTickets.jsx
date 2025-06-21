

import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/payment/my", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
      toast.error('❌ Failed to fetch tickets.', {
        style: {
          background: '#ff4d4f',
          color: '#fff',
        },
      });
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get("token");
      if (urlToken) {
        localStorage.setItem("authToken", urlToken);
      } else {
        return navigate("/login");
      }
    }
    fetchTickets();
  }, [navigate]);

  const handleResend = async (ticket) => {
    try {
      await axios.post("http://localhost:5001/api/payment/confirm", {
        email: ticket.email,
        eventName: ticket.eventName,
        eventDate: ticket.eventDate,
        numberOfTickets: ticket.numberOfTickets,
      });

      toast.success('📩 Ticket email resent successfully!', {
        style: {
          background: '#333',
          color: '#d3af47',
          fontWeight: 'bold',
        },
      });
    } catch (err) {
      console.error("Resend email failed:", err);
      toast.error('❌ Failed to resend ticket email.', {
        style: {
          background: '#ff4d4f',
          color: '#fff',
        },
      });
    }
  };

  const handleCancel = async (ticketId) => {
    const confirm = window.confirm("Are you sure you want to cancel this ticket?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5001/api/payment/cancel/${ticketId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      toast.success('🎟️ Ticket canceled successfully!\nRefund details sent to your email.', {
        duration: 4000,
        style: {
          background: '#333',
          color: '#d3af47',
          fontWeight: 'bold',
        },
        iconTheme: {
          primary: '#d3af47',
          secondary: '#000',
        },
      });

      fetchTickets(); // Refresh tickets
    } catch (err) {
      console.error("Cancel ticket failed:", err);
      toast.error('❌ Failed to cancel ticket.', {
        style: {
          background: '#ff4d4f',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-[#d3af47]">My Tickets</h1>
        <button
          onClick={() => { logout(); navigate("/login"); }}
          className="mb-4 bg-[#e30b5d] px-4 py-2 rounded"
        >
          Logout
        </button>

        {tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <ul className="space-y-4">
            {tickets.map((ticket, i) => (
              <li key={i} className="bg-gray-800 p-4 rounded shadow">
                <h3 className="text-lg text-[#d3af47]">{ticket.eventName}</h3>
                <p>📅 {new Date(ticket.eventDate).toLocaleDateString()}</p>
                <p>🎟 Ticket ID: {ticket.ticketId}</p>

                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={`http://localhost:5001/api/payment/pdf/${ticket.ticketId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#d3af47] text-black rounded-md hover:bg-[#b08d2b] text-sm"
                  >
                    Download PDF Ticket
                  </a>

                  <button
                    onClick={() => handleResend(ticket)}
                    className="px-4 py-2 bg-[#e30b5d] text-white rounded-md hover:bg-[#c71a47] text-sm"
                  >
                    Resend Email
                  </button>

                  <button
                    onClick={() => handleCancel(ticket._id)}
                    className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-600 text-sm"
                  >
                    Cancel Ticket
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
