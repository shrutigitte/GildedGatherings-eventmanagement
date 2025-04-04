
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";


const Confirmation = () => {
  
  const location = useLocation();
  const { email, eventName } = location.state || {};

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/payment/ticket?email=${email}&eventName=${eventName}`);
        setTicket(res.data.ticket);
      } catch (err) {
        console.error("Failed to fetch ticket:", err);
      } finally {
        setLoading(false);
      }
    };

    if (email && eventName) fetchTicket();
  }, [email, eventName]);

  if (loading) {
    return <p className="text-center text-white">Loading your ticket...</p>;
  }

  if (!ticket) {
    return <p className="text-center text-red-500">Ticket not found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      
      <h1 className="text-3xl font-bold text-[#d3af37]">Payment Successful! 🎉</h1>
      <p className="text-lg mt-4">Your ticket has been booked for:</p>
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-[#d3af37]">{ticket.eventName}</h2>
        <p className="mt-2">📅 {ticket.eventDate}</p>
        <p className="mt-1">📨 {ticket.email}</p>
        <p className="mt-1">🎫 Tickets: {ticket.numberOfTickets}</p>
        <p className="mt-4 text-sm text-[#d3af37] font-bold">Ticket ID: #{ticket.ticketId}</p>

        {/* QR Code */}
        <img
          src={`data:image/png;base64,${ticket.qrCodeBase64}`}
          alt="QR Code"
          className="mt-4 w-40 mx-auto"
        />

        {/* Download PDF */}
        <a
          href={`http://localhost:5001/api/payment/pdf/${ticket.ticketId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 bg-[#d3af47] text-black rounded-lg hover:bg-[#b08d2b]"
        >
          Download PDF Ticket
        </a>
      </div>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#d3af37] text-black rounded-lg hover:bg-[#b08d2b]"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Confirmation;
