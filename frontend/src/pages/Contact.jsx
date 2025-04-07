
import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/contact', formData);
      setResponseMessage(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setResponseMessage('Error sending message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Google Map Section */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14003.213198229799!2d77.04704792032432!3d28.591760299352556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b7f0e5b6ba9%3A0x69b6a4292a4ef7db!2sDwarka%20Sector%2013%2C%20New%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1692634802926!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>

        {/* Contact Form Section */}
        <div className="p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl text-[#e30b5d] font-monomakh font-bold mb-6">Contact Us</h2>
          {responseMessage && (
            <p className={`mb-4 ${responseMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {responseMessage}
            </p>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#e30b5d] text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full text-[#d3af47] placeholder-[#d3af47] p-3 border border-gray-300 rounded-lg"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-[#e30b5d] text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border text-[#d3af47] placeholder-[#d3af47] border-gray-300 rounded-lg"
                placeholder="Your Email"
                required
              />
            </div>

            <div>
              <label className="block text-[#e30b5d] text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border text-[#d3af47] placeholder-[#d3af47] border-gray-300 rounded-lg"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-[#d3af47] text-white py-3 rounded-lg hover:bg-[#e305bd] hover:scale-105 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
