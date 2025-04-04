
import { useState } from "react";
import { useParams } from "react-router-dom";
import eventsData from "../data/events.json";
import { Link } from "react-router-dom";

const TicketPage = () => {
  const { id } = useParams();
  const event = eventsData.find((e) => e.id === parseInt(id));

  const [ticketCount, setTicketCount] = useState(1);
  const ticketPrice = event ? 50 : 0; // Example price

  if (!event) {
    return <p className="text-center text-red-500 text-xl mt-10">Event not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg mt-10">
      <img src={event.image} alt={event.name} className="w-full h-60 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{event.name}</h1>
      <p className="text-gray-600">{event.date}</p>
      <p className="mt-2">{event.description}</p>

      <div className="mt-4">
        <label className="text-lg font-medium">Select Tickets:</label>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => setTicketCount((prev) => Math.max(1, prev - 1))}
            className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            -
          </button>
          <span className="text-xl text-[#d3af37]">{ticketCount}</span>
          <button
            onClick={() => setTicketCount((prev) => prev + 1)}
            className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            +
          </button>
        </div>
        <p className="mt-3 text-lg font-bold">Total: ${ticketCount * ticketPrice}</p>
        <Link
  to={`/payment/${event.id}`} state={{
    event,
    numberOfTickets: ticketCount,
  }}
  className="block mt-4 px-4 py-2 bg-[#d3af37] text-black rounded-lg hover:bg-[#b89a30]"
>
  Book Now
</Link>

      </div>
    </div>
  );
};

export default TicketPage;
