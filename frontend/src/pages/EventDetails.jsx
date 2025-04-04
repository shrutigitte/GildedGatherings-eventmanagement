import { useParams, useNavigate } from "react-router-dom";
import eventsData from "../data/events";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find(e => e.id === parseInt(id));

  if (!event) return <p className="text-center text-red-500">Event not found.</p>;

  return (
    <div className="p-8">
      <img src={event.image} alt={event.name} className="w-full h-96 object-cover rounded-lg" />
      <h1 className="text-3xl mt-4">{event.name}</h1>
      <p className="text-gray-700 mt-2">{event.date} | {event.location}</p>
      <p className="mt-4">{event.description}</p>

      {/* Ticket Pricing */}
      <div className="mt-6">
        <h2 className="text-2xl">Tickets</h2>
        <ul className="mt-2">
          <li className="flex justify-between border-b py-2">
            <span>General Admission</span> <span>$20</span>
          </li>
          <li className="flex justify-between border-b py-2">
            <span>VIP</span> <span>$50</span>
          </li>
        </ul>
      </div>

      {/* Buy Ticket Button */}
      <button
        onClick={() => navigate("/tickets")}
        className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500"
      >
        Buy Ticket
      </button>
    </div>
  );
};

export default EventDetail;
