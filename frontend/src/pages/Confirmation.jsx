
// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";


// const Confirmation = () => {
  
//   const location = useLocation();
//   const { email, eventName } = location.state || {};

//   const [ticket, setTicket] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTicket = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5001/api/payment/ticket?email=${email}&eventName=${eventName}`);
//         setTicket(res.data.ticket);
//       } catch (err) {
//         console.error("Failed to fetch ticket:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (email && eventName) fetchTicket();
//   }, [email, eventName]);

//   if (loading) {
//     return <p className="text-center text-white">Loading your ticket...</p>;
//   }

//   if (!ticket) {
//     return <p className="text-center text-red-500">Ticket not found.</p>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      
//       <h1 className="text-3xl font-bold text-[#d3af37]">Payment Successful! 🎉</h1>
//       <p className="text-lg mt-4">Your ticket has been booked for:</p>
//       <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg text-center">
//         <h2 className="text-2xl font-semibold text-[#d3af37]">{ticket.eventName}</h2>
//         <p className="mt-2">📅 {ticket.eventDate}</p>
//         <p className="mt-1">📨 {ticket.email}</p>
//         <p className="mt-1">🎫 Tickets: {ticket.numberOfTickets}</p>
//         <p className="mt-4 text-sm text-[#d3af37] font-bold">Ticket ID: #{ticket.ticketId}</p>

//         {/* QR Code */}
//         <img
//           src={`data:image/png;base64,${ticket.qrCodeBase64}`}
//           alt="QR Code"
//           className="mt-4 w-40 mx-auto"
//         />

//         {/* Download PDF */}
//         <a
//           href={`http://localhost:5001/api/payment/pdf/${ticket.ticketId}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-4 inline-block px-4 py-2 bg-[#d3af47] text-black rounded-lg hover:bg-[#b08d2b]"
//         >
//           Download PDF Ticket
//         </a>
//       </div>

//       <Link
//         to="/"
//         className="mt-6 px-6 py-3 bg-[#d3af37] text-black rounded-lg hover:bg-[#b08d2b]"
//       >
//         Back to Home
//       </Link>
//     </div>
//   );
// };

// export default Confirmation;

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const Confirmation = () => {
  const location = useLocation();
  const { email, eventName } = location.state || {};
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [width, height] = useWindowSize();

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
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-6">
      {/* 🎉 Confetti */}
      <Confetti width={width} height={height} />

      {/* Ticket Success Card */}
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl text-center w-full max-w-lg">
        <h1 className="text-4xl font-bold text-[#d3af47] mb-4">
          🎉 Payment Successful!
        </h1>
        <p className="text-white text-lg mb-6">
          Thank you for booking with <span className="text-[#e30b5d] font-semibold">Gilded Gatherings</span>!
        </p>

        <div className="bg-gray-800 p-6 rounded-xl mb-6 text-left">
          <p className="text-[#d3af47]"><strong>Event:</strong> {ticket.eventName}</p>
          <p className="text-[#d3af47]"><strong>Date:</strong> {ticket.eventDate || "N/A"}</p>
          <p className="text-[#d3af47]"><strong>Email:</strong> {ticket.email}</p>
          <p className="text-[#d3af47]"><strong>Tickets:</strong> {ticket.numberOfTickets}</p>
          <p className="text-[#d3af47]"><strong>Ticket ID:</strong> #{ticket.ticketId}</p>

          {/* 🎟 QR Code */}
          <div className="flex justify-center mt-4">
            <img
              src={`data:image/png;base64,${ticket.qrCodeBase64}`}
              alt="QR Code"
              className="w-32 h-32"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href={`http://localhost:5001/api/payment/pdf/${ticket.ticketId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#d3af47] hover:bg-[#b3922f] text-black py-2 px-6 rounded-lg transition"
          >
            📄 Download PDF
          </a>

          <Link
            to="/"
            className="bg-[#e30b5d] hover:bg-[#c20b4f] text-white py-2 px-6 rounded-lg transition"
          >
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
