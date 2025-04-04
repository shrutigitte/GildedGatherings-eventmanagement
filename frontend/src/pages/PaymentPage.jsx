import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { event, numberOfTickets } = state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email) {
      alert("Please enter your name and email.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("${import.meta.env.VITE_BACKEND_URL}/api/payment/confirm", {
        email: formData.email,
        eventName: event.name,
        numberOfTickets,
        eventDate: event.date,
      });

      setTimeout(() => {
        navigate("/confirmation", {
          state: {
            email: formData.email,
            eventName: event.name,
            venue: event.venue,
            date: event.date,
            numberOfTickets,
            userName: formData.name,
          },
        });
      }, 1000);
    } catch (error) {
      console.error("❌ Email error:", error);
      alert("Payment went through, but email failed.");
    }
  };

  if (!event) {
    return <p className="text-center text-red-500 mt-10">Event not found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-4">Payment for {event.name}</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 space-y-4">
        <p className="text-[#d3af37]">Tickets: {numberOfTickets}</p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="text"
          placeholder="Card Number"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="text"
          placeholder="Expiry Date"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="text"
          placeholder="CVV"
          className="w-full p-2 rounded bg-gray-700"
        />
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-[#d3af37] text-black py-2 rounded-lg hover:bg-[#b38e2d]"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
