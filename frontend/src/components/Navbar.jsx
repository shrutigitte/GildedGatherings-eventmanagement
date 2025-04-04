import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className=" bg-[#d3af37] m-5 text-white rounded-2xl p-6 shadow-md">
      <div className="container  mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-monomakh scale-105 hover:text-teal-300 font-bold">
          Gilded Gatherings
        </h1>

        {/* Hamburger Menu for Small Screens */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-2xl">&#9776;</span>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link
              to="/"
              className={`hover:underline hover:text-teal-400 ${
                location.pathname === "/" ? "text-[#e30b5d] underline" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`hover:underline hover:text-teal-400 ${
                location.pathname === "/about" ? "text-[#e30b5d] underline" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`hover:underline hover:text-teal-400 ${
                location.pathname === "/contact"
                  ? "text-[#e30b5d] underline"
                  : ""
              }`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className={`hover:underline hover:text-teal-400 ${
                location.pathname === "/faq"
                  ? "text-[#e30b5d] underline"
                  : ""
              }`}
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-[#d3af37] p-4 rounded-lg mt-3">
          <ul className="flex flex-col space-y-3">
            <li>
              <Link
                to="/"
                className={`block hover:text-teal-300 ${
                  location.pathname === "/" ? "text-[#e30b5d] underline" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block hover:text-teal-300 ${
                  location.pathname === "/about" ? "text-[#e30b5d] underline" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block hover:text-teal-300 ${
                  location.pathname === "/contact"
                    ? "text-[#e30b5d] underline"
                    : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
