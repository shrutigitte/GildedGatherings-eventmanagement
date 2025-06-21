
// import { useState } from "react";
// import axios from "axios";
// import AdminNavbar from "../../components/AdminNavbar";

// const CreateEvents = () => {
//   const [eventData, setEventData] = useState({
//     name: "",
//     date: "",
//     venue: "",
//     description: "",
//     image: "",
//     sponsors: [""],
//     testimonials: [{ name: "", comment: "" }],
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setEventData({ ...eventData, [e.target.name]: e.target.value });
//   };

//   const handleSponsorChange = (index, value) => {
//     const newSponsors = [...eventData.sponsors];
//     newSponsors[index] = value;
//     setEventData({ ...eventData, sponsors: newSponsors });
//   };

//   const handleTestimonialChange = (index, field, value) => {
//     const newTestimonials = [...eventData.testimonials];
//     newTestimonials[index][field] = value;
//     setEventData({ ...eventData, testimonials: newTestimonials });
//   };

//   const addSponsor = () => {
//     setEventData({ ...eventData, sponsors: [...eventData.sponsors, ""] });
//   };

//   const addTestimonial = () => {
//     setEventData({ ...eventData, testimonials: [...eventData.testimonials, { name: "", comment: "" }] });
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post("http://localhost:5001/api/admin/create-event", eventData);
//       alert("Event created successfully!");
//       setEventData({
//         name: "",
//         date: "",
//         venue: "",
//         description: "",
//         image: "",
//         sponsors: [""],
//         testimonials: [{ name: "", comment: "" }],
//       });
//     } catch (error) {
//       console.error("Error creating event:", error);
//       alert("Error creating event!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-black min-h-screen text-white">
//       <AdminNavbar />
//       <h1 className="text-3xl font-bold text-[#d3af47] mb-6">📅 Create New Event</h1>

//       <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleSubmit}>
//         <input type="text" name="name" value={eventData.name} onChange={handleChange} placeholder="Event Name" className="w-full p-3 rounded bg-gray-800 border border-gray-600" required />

//         <input type="date" name="date" value={eventData.date} onChange={handleChange} className="w-full p-3 rounded bg-gray-800 border border-gray-600" required />

//         <input type="text" name="venue" value={eventData.venue} onChange={handleChange} placeholder="Venue" className="w-full p-3 rounded bg-gray-800 border border-gray-600" required />

//         <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Event Description" className="w-full p-3 rounded bg-gray-800 border border-gray-600" rows="4" required />

//         <input type="text" name="image" value={eventData.image} onChange={handleChange} placeholder="Event Image URL" className="w-full p-3 rounded bg-gray-800 border border-gray-600" required />

//         <div>
//           <h3 className="text-lg font-bold mb-2">Sponsors</h3>
//           {eventData.sponsors.map((sponsor, index) => (
//             <input
//               key={index}
//               type="text"
//               value={sponsor}
//               onChange={(e) => handleSponsorChange(index, e.target.value)}
//               placeholder={`Sponsor ${index + 1}`}
//               className="w-full mb-2 p-3 rounded bg-gray-800 border border-gray-600"
//             />
//           ))}
//           <button type="button" onClick={addSponsor} className="bg-[#d3af47] text-black py-2 px-4 rounded hover:bg-[#b3912f]">
//             ➕ Add Sponsor
//           </button>
//         </div>

//         <div>
//           <h3 className="text-lg font-bold mb-2">Testimonials</h3>
//           {eventData.testimonials.map((testimonial, index) => (
//             <div key={index} className="space-y-2 mb-4">
//               <input
//                 type="text"
//                 value={testimonial.name}
//                 onChange={(e) => handleTestimonialChange(index, "name", e.target.value)}
//                 placeholder="Name"
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-600"
//               />
//               <textarea
//                 value={testimonial.comment}
//                 onChange={(e) => handleTestimonialChange(index, "comment", e.target.value)}
//                 placeholder="Comment"
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-600"
//               />
//             </div>
//           ))}
//           <button type="button" onClick={addTestimonial} className="bg-[#d3af47] text-black py-2 px-4 rounded hover:bg-[#b3912f]">
//             ➕ Add Testimonial
//           </button>
//         </div>

//         <button type="submit" disabled={loading} className="bg-[#d3af47] hover:bg-[#b3912f] text-black py-3 px-6 rounded-lg">
//           {loading ? "Creating..." : "Create Event"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEvents;

import { useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

const CreateEvents = () => {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    venue: "",
    description: "",
    image: "",
    ticketPrice: "",
    sponsors: [""],
    testimonials: [{ name: "", comment: "" }],
    cancellationPolicy: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSponsorChange = (index, value) => {
    const newSponsors = [...eventData.sponsors];
    newSponsors[index] = value;
    setEventData({ ...eventData, sponsors: newSponsors });
  };

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...eventData.testimonials];
    newTestimonials[index][field] = value;
    setEventData({ ...eventData, testimonials: newTestimonials });
  };

  const addSponsor = () => {
    setEventData({ ...eventData, sponsors: [...eventData.sponsors, ""] });
  };

  const addTestimonial = () => {
    setEventData({ ...eventData, testimonials: [...eventData.testimonials, { name: "", comment: "" }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Ticket Price Value:", eventData.ticketPrice);
      console.log("Whole eventData:", eventData);

      const actualTicketPrice = eventData.ticketPrice ? Number(eventData.ticketPrice) : 0; // default 0 if empty
      console.log("Submitting eventData:", eventData);

      await axios.post("http://localhost:5001/api/admin/create-event", {
        ...eventData,
        ticketPrice: actualTicketPrice,
      });
      
      alert("Event created successfully!");
      setEventData({
        name: "",
        date: "",
        venue: "",
        description: "",
        image: "",
        ticketPrice: "",
        sponsors: [""],
        testimonials: [{ name: "", comment: "" }],
        cancellationPolicy: "",
      });
    } 
    catch (error) {
      console.error("Error creating event:", error.response?.data || error.message || error);
      alert("Error creating event!");
      // catch (error) {
        //   console.error("Error creating event:", error);
        //   alert("Error creating event!");
        // } 
    }
    
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <AdminNavbar />
      <h1 className="text-3xl font-bold text-[#d3af47] mb-6">📅 Create New Event</h1>

      <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleSubmit}>
        
        {/* Event Name */}
        <input
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          placeholder="Event Name"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          required
        />

        {/* Event Date */}
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          required
        />

        {/* Venue */}
        <input
          type="text"
          name="venue"
          value={eventData.venue}
          onChange={handleChange}
          placeholder="Venue"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          required
        />

        {/* Ticket Price */}
        <input
          type="number"
          name="ticketPrice"
          min="0" 
          value={eventData.ticketPrice}
          onChange={handleChange}
          placeholder="Ticket Price (in ₹)"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          rows="4"
          required
        ></textarea>

        {/* Image */}
        <input
          type="text"
          name="image"
          value={eventData.image}
          onChange={handleChange}
          placeholder="Event Image URL"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          required
        />

        {/* Sponsors */}
        <div>
          <h3 className="text-lg font-bold mb-2">Sponsors</h3>
          {eventData.sponsors.map((sponsor, index) => (
            <input
              key={index}
              type="text"
              value={sponsor}
              onChange={(e) => handleSponsorChange(index, e.target.value)}
              placeholder={`Sponsor ${index + 1}`}
              className="w-full mb-2 p-3 rounded bg-gray-800 border border-gray-600"
            />
          ))}
          <button
            type="button"
            onClick={addSponsor}
            className="bg-[#d3af47] text-black py-2 px-4 rounded hover:bg-[#b3912f]"
          >
            ➕ Add Sponsor
          </button>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-lg font-bold mb-2">Testimonials</h3>
          {eventData.testimonials.map((testimonial, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                type="text"
                value={testimonial.name}
                onChange={(e) => handleTestimonialChange(index, "name", e.target.value)}
                placeholder="Testimonial Name"
                className="w-full p-3 rounded bg-gray-800 border border-gray-600"
              />
              <textarea
                value={testimonial.comment}
                onChange={(e) => handleTestimonialChange(index, "comment", e.target.value)}
                placeholder="Testimonial Comment"
                className="w-full p-3 rounded bg-gray-800 border border-gray-600"
              ></textarea>
            </div>
          ))}
          <button
            type="button"
            onClick={addTestimonial}
            className="bg-[#d3af47] text-black py-2 px-4 rounded hover:bg-[#b3912f]"
          >
            ➕ Add Testimonial
          </button>
        </div>

        {/* Cancellation and Refund Policy */}
        <textarea
          name="cancellationPolicy"
          value={eventData.cancellationPolicy}
          onChange={handleChange}
          placeholder="Cancellation and Refund Policy"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          rows="3"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#d3af47] hover:bg-[#b3912f] text-black py-3 px-6 rounded-lg"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvents;

