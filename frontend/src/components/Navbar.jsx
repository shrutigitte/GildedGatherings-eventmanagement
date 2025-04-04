// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";

// const Navbar = () => {
//   const location = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className=" bg-[#d3af37] m-5 text-white rounded-2xl p-6 shadow-md">
//       <div className="container  mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-monomakh scale-105 hover:text-teal-300 font-bold">
//           Gilded Gatherings
//         </h1>

//         {/* Hamburger Menu for Small Screens */}
//         <button
//           className="md:hidden focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span className="text-2xl">&#9776;</span>
//         </button>

//         {/* Desktop Navigation */}
//         <ul className="hidden md:flex space-x-4">
//           <li>
//             <Link
//               to="/"
//               className={`hover:underline hover:text-teal-400 ${
//                 location.pathname === "/" ? "text-[#e30b5d] underline" : ""
//               }`}
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/about"
//               className={`hover:underline hover:text-teal-400 ${
//                 location.pathname === "/about" ? "text-[#e30b5d] underline" : ""
//               }`}
//             >
//               About
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contact"
//               className={`hover:underline hover:text-teal-400 ${
//                 location.pathname === "/contact"
//                   ? "text-[#e30b5d] underline"
//                   : ""
//               }`}
//             >
//               Contact
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/faq"
//               className={`hover:underline hover:text-teal-400 ${
//                 location.pathname === "/faq"
//                   ? "text-[#e30b5d] underline"
//                   : ""
//               }`}
//             >
//               FAQ
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Mobile Navigation */}
//       {menuOpen && (
//         <div className="md:hidden bg-[#d3af37] p-4 rounded-lg mt-3">
//           <ul className="flex flex-col space-y-3">
//             <li>
//               <Link
//                 to="/"
//                 className={`block hover:text-teal-300 ${
//                   location.pathname === "/" ? "text-[#e30b5d] underline" : ""
//                 }`}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about"
//                 className={`block hover:text-teal-300 ${
//                   location.pathname === "/about" ? "text-[#e30b5d] underline" : ""
//                 }`}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/contact"
//                 className={`block hover:text-teal-300 ${
//                   location.pathname === "/contact"
//                     ? "text-[#e30b5d] underline"
//                     : ""
//                 }`}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken, logout } from "../utils/auth";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-[#d3af47] m-5 text-white rounded-2xl p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-monomakh font-bold hover:scale-110 transition-transform">
          Gilded Gatherings
        </h1>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-2xl text-white">&#9776;</span>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-4 items-center">
          {[
            { to: "/", name: "Home" },
            { to: "/about", name: "About" },
            { to: "/contact", name: "Contact" },
            { to: "/faq", name: "FAQ" }
          ].map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`hover:underline hover:scale-110 transition ${
                  location.pathname === link.to ? "text-[#e30b5d] underline" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {isLoggedIn && (
            <li>
              <Link
                to="/my-tickets"
                className="bg-black text-[#d3af47] px-4 py-2 rounded hover:scale-110 hover:bg-[#e30b5d] hover:text-white transition"
              >
                My Tickets
              </Link>
            </li>
          )}

          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-black text-[#d3af47] px-4 py-2 rounded hover:scale-110 hover:bg-[#e30b5d] hover:text-white transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="bg-black text-[#d3af47] px-4 py-2 rounded hover:scale-110 hover:bg-[#e30b5d] hover:text-white transition"
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="bg-black text-[#d3af47] px-4 py-2 rounded hover:scale-110 hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-[#d3af47] p-4 rounded-lg mt-3">
          <ul className="flex flex-col space-y-3">
            {["/", "/about", "/contact", "/faq"].map((path, i) => {
              const names = ["Home", "About", "Contact", "FAQ"];
              return (
                <li key={path}>
                  <Link
                    to={path}
                    className={`block hover:text-[#e30b5d] hover:scale-110 transition ${
                      location.pathname === path ? "text-[#e30b5d] underline" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {names[i]}
                  </Link>
                </li>
              );
            })}

            {isLoggedIn && (
              <li>
                <Link
                  to="/my-tickets"
                  className="block bg-black text-[#d3af47] px-4 py-2 rounded hover:scale-110 hover:bg-[#e30b5d] hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  My Tickets
                </Link>
              </li>
            )}

            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block bg-black text-[#d3af47] px-4 py-2 lg:rounded-5xl  hover:bg-[#e30b5d] hover:text-white transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block bg-black text-[#d3af47] px-4 py-2 lg:rounded-5xl  hover:bg-[#e30b5d] hover:text-white transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left bg-black text-[#d3af47] px-4 py-2 rounded-2xl  hover:bg-red-600 hover:text-white transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
