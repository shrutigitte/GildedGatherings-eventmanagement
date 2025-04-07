import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

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

    axios.get("http://localhost:5001/api/payment/my", {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(res => setTickets(res.data))
      .catch(err => console.error("Failed to fetch tickets", err));
  }, [navigate]);
  const handleResend = async (ticket) => {
    try {
      const res = await axios.post("http://localhost:5001/api/payment/confirm", {
        email: ticket.email,
        eventName: ticket.eventName,
        eventDate: ticket.eventDate,
        numberOfTickets: ticket.numberOfTickets,
      });
  
      alert("✅ Ticket email resent successfully!");
    } catch (err) {
      console.error("Resend email failed:", err);
      alert("❌ Failed to resend ticket email.");
    }
  };
  

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-[#d3af47]">My Tickets</h1>
        <button onClick={() => { logout(); navigate("/login"); }} className="mb-4 bg-[#e30b5d] px-4 py-2 rounded">
          Logout
        </button>
        {tickets.length === 0 ? <p>No tickets found.</p> : (
          <ul className="space-y-4">
            {tickets.map((ticket, i) => (
              <li key={i} className="bg-gray-800 p-4 rounded shadow">
                <h3 className="text-lg text-[#d3af47]">{ticket.eventName}</h3>
                <p>📅 {ticket.eventDate}</p>
                <p>🎟 Ticket ID: {ticket.ticketId}</p>

                <div className="mt-3 flex flex-wrap gap-3">
  
                  <a href={`http://localhost:5001/api/payment/pdf/${ticket.ticketId}`} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#d3af47] text-black rounded-md hover:bg-[#b08d2b] text-sm">
                    Download PDF Ticket
                  </a>

                  <button onClick={() => handleResend(ticket)} className="px-4 py-2 bg-[#e30b5d] text-white rounded-md hover:bg-[#c71a47] text-sm">
                    Resend Email
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