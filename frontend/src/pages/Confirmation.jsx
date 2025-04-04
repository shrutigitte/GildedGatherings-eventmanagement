import { Link, useLocation } from "react-router-dom";


const Confirmation = () => {
  const location = useLocation();
  const eventDetails = location.state || {};

  const ticketId = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      {/* <Confetti numberOfPieces={200} recycle={false} /> */}
      <h1 className="text-3xl font-bold text-[#d3af37]">Payment Successful! 🎉</h1>
      <p className="text-lg mt-4">Your ticket has been booked for:</p>
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-[#d3af37]">{eventDetails.name}</h2>
        <p className="mt-2">📅 {eventDetails.date}</p>
        <p className="mt-1">📍 {eventDetails.venue}</p>
        <p className="mt-4 text-sm text-gray-400">Ticket ID: #{ticketId}</p>
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
