
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
      // ✅ FREE EVENT LOGIC
      if (event.ticketPrice === 0) {
        await axios.post("http://localhost:5001/api/payment/confirm", {
          email: formData.email,
          eventName: event.name,
          numberOfTickets,
          eventDate: event.date,
        });

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

        return; // 🎉 No Razorpay for free event
      }

      // ✅ PAID EVENT LOGIC
      const amount = event.ticketPrice * numberOfTickets * 100; // paise

      // Step 1: Create Razorpay Order
      const { data } = await axios.post("http://localhost:5001/api/payment/create-order", { amount });

      const options = {
        key: "rzp_test_qc2V3ypSiJUJfD",
        amount: amount,
        currency: "INR",
        name: event.name,
        description: "Booking Event Tickets",
        order_id: data.orderId,
        handler: async function (response) {
          try {
            await axios.post("http://localhost:5001/api/payment/confirm", {
              email: formData.email,
              eventName: event.name,
              numberOfTickets,
              eventDate: event.date,
            });

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
          } catch (error) {
            alert("Payment succeeded but ticket generation failed.");
            console.error("❌ Ticket email error:", error);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: "#d3af47",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("❌ Payment error:", error);
      alert("Something went wrong creating payment order.");
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return <p className="text-center text-red-500 mt-10">Event not found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-4">Payment for {event.name}</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 space-y-4">
        <p className="text-[#d3af37] font-semibold">Tickets: {numberOfTickets}</p>
        <p className="text-[#d3af37] font-semibold">Price: ₹{event.ticketPrice} per ticket</p>
        <p className="text-[#d3af37] font-semibold">Total: ₹{event.ticketPrice * numberOfTickets}</p>

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

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-[#d3af47] text-black py-2 rounded-lg hover:bg-[#b38e2d]"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
