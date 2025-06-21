import React, { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5001/api/subscribe", { email });
      setMessage(response.data.message);
      setEmail(""); // Clear email input
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <footer className="mt-auto bg-[#d3af47] w-full text-sm">
      <div className="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <div className="col-span-full lg:col-span-1">
            <a className="text-xl font-monomakh font-semibold text-black" href="#">Gilded Gatherings</a>
          </div>

          <div>
            <h4 className="font-semibold text-[#e30b5d]">Product</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="text-gray-800 hover:underline">Pricing</a></li>
              <li><a href="#" className="text-black hover:underline">Changelog</a></li>
              <li><a href="https://gildedgatherings.tawk.help" target="_blank" className="text-black hover:underline"> Help Docs <span className="ml-1 bg-[#e30b5d] text-white text-xs py-0.5 px-1.5 rounded">Every Help you need</span></a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#e30b5d]">Company</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="text-gray-800 hover:underline">About us</a></li>
              <li><a href="#" className="text-gray-800 hover:underline">Blog</a></li>
              <li><a href="#" className="text-gray-800 hover:underline">Careers <span className="ml-1 bg-[#e30b5d] text-white text-xs py-0.5 px-1.5 rounded">We're hiring</span></a></li>
              <li><a href="#" className="text-gray-800 hover:underline">Customers</a></li>
            </ul>
          </div>

          <div className="col-span-2">
            <h4 className="font-semibold text-gray-700">Stay up to date</h4>

            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-black rounded-lg p-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2.5 sm:py-3 px-4 w-full bg-black text-[#d3af47] placeholder-[#d3af47] border-transparent rounded-lg sm:text-sm focus:border-[#e30b5d] focus:ring-[#e30b5d]"
                  placeholder="Enter your email"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#d3af47] text-white font-medium rounded-lg hover:scale-110 hover:bg-[#e30b5d] transition"
                >
                  Subscribe
                </button>
              </div>
              {message && (
                <p className="text-center mt-2 text-sm text-[#e30b5d] font-semibold">{message}</p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-[#e30b5d]">© 2025 Gilded Gatherings</p>
          <div className="flex gap-3 mt-3 sm:mt-0">
            {/* Replace # with your actual social media links if needed */}
            {["facebook", "twitter", "instagram", "github"].map((platform, i) => (
              <a key={i} href="#" className="text-[#e30b5d] hover:scale-110 transition">
                <i className={`fab fa-${platform} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
