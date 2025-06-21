import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const TicketPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <p className="text-center text-red-500 text-xl mt-10">Event not found</p>;
  }

  const handleBooking = (e) => {
    if (!agreeTerms) {
      e.preventDefault();
      alert("Please agree to the Terms and Conditions before booking.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg m-10 text-white">
      {event.image && (
        <img src={event.image} alt={event.name} className="w-full h-60 object-cover rounded-lg" />
      )}

      <h1 className="text-3xl font-bold mt-4">{event.name}</h1>
      <p className="text-gray-400">{new Date(event.date).toLocaleString()}</p>

      <p className="mt-4">{event.description}</p>

      {event.venue && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Venue</h2>
          <p>{event.venue}</p>
        </div>
      )}

      {event.sponsors && event.sponsors.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Sponsors</h2>
          <ul className="list-disc list-inside text-white">
            {event.sponsors.map((sponsor, index) => (
              <li key={index}>{sponsor}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Testimonials */}
      {event.testimonials && event.testimonials.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          {event.testimonials.map((testimonial, index) => (
            <blockquote key={index} className="italic border-l-4 pl-4 my-2">
              <p className="font-semibold">{testimonial.name}</p>
              <p>{testimonial.comment}</p>
            </blockquote>
          ))}
        </div>
      )}

      {event.cancellationPolicy && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Cancellation & Refund Policy</h2>
          <p className="text-gray-300 mt-2">{event.cancellationPolicy}</p>
        </div>
      )}

      <div className="mt-8">
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

        {event.ticketPrice === 0 ? (
          <p className="mt-3 text-lg font-bold text-green-400">🎉 Free Event!</p>
        ) : (
          <>
            <p className="mt-3 text-lg font-bold">Ticket Price: ₹{event.ticketPrice}</p>
            <p className="mt-3 text-lg font-bold">Total: ₹{ticketCount * event.ticketPrice}</p>
          </>
        )}

        <div className="mt-4">
          <a href="https://gildedgatherings.tawk.help/article/please-carefully-read-and-agree-to-the-following-terms-and-conditions-before-proceeding-with-your-ticket-purchase-for-gilded-gatherings-events" target="_blank" className="text-[#d3af47]"> Terms And Conditions Click Here</a> <br />
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="terms">I agree to the Terms and Conditions</label>
        </div>

        <Link
          to={`/payment/${event._id}`}
          state={{
            event,
            numberOfTickets: ticketCount,
          }}
          onClick={handleBooking}
          className="block mt-4 px-4 py-2 bg-[#d3af37] text-black rounded-lg hover:bg-[#b89a30]"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default TicketPage;

