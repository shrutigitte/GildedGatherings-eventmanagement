
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import eventsData from "../data/events"; // Import event data

const EventSectionGrid = () => {
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  // Filtering Logic
  const filteredEvents = eventsData.filter(event => {
    if (filter === "all") return true;
    if (filter === "upcoming") return new Date(event.date) > new Date();
    if (filter === "past") return new Date(event.date) < new Date();
    if (filter === "popular") return event.popularity > 7; // Example condition
    return true;
  });

  // Search Logic
  const searchedEvents = filteredEvents.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting Logic
  const sortedEvents = [...searchedEvents].sort((a, b) => {
    if (sortOrder === "date") return new Date(a.date) - new Date(b.date);
    if (sortOrder === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <section className="p-8 bg-black">
      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border placeholder-[#d3af37] border-gray-400 bg-black rounded-lg w-full md:w-1/3 text-[#d3af37]"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg">
            Clear
          </button>
        )}
      </div>

      {/* Filters & Sorting */}
      <div className="flex justify-between mb-4">
        {/* Filtering */}
        <div>
          <button onClick={() => setFilter("all")} className="px-4 py-2 m-1 bg-gray-700 text-[#d3af37] rounded-lg hover:bg-gray-500">All</button>
          <button onClick={() => setFilter("upcoming")} className="px-4 py-2 m-1 bg-gray-700 text-[#d3af37] rounded-lg hover:bg-gray-500">Upcoming</button>
          <button onClick={() => setFilter("past")} className="px-4 py-2 m-1 bg-gray-700 text-[#d3af37] rounded-lg hover:bg-gray-500">Past</button>
          <button onClick={() => setFilter("popular")} className="px-4 py-2 m-1 bg-gray-700 text-[#d3af37] rounded-lg hover:bg-gray-500">Popular</button>
        </div>

        {/* Sorting */}
        <select onChange={(e) => setSortOrder(e.target.value)} className="p-2 bg-[#d3af37] text-white rounded-lg">
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedEvents.length > 0 ? (
          sortedEvents.map(event => (
            <div key={event.id} className="bg-[#d3af37] text-black hover:text-[#d3af37] hover:bg-black p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <img src={event.image} alt={event.name} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-xl mt-2">{event.name}</h3>
              <p className="text-pink-600">{event.date}</p>
              <p className="mt-2">{event.description}</p>
            <a href={`/tickets/${event.id}`} className="block mt-3 px-4 py-2 text-center bg-black hover:bg-[#d3af37] hover:text-black text-[#d3af37] font-semibold rounded-lg hover:bg-[#b3912f] transition-all">
  Buy Tickets
</a>


            </div>
          ))
        ) : (
          <p className="text-center text-[#d3af37]">No events found</p>
        )}
      </div>
    </section>
  );
};

export default EventSectionGrid;
