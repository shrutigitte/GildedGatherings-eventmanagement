import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import EventDetail from "./pages/EventDetails";
import TicketPage from "./pages/TicketsPage";
import PaymentPage from "./pages/PaymentPage";
import Confirmation from "./pages/Confirmation";
import FaQues from "./pages/faq";
import ContactUs from "./pages/Contact";
import Footer from "./components/Footer";
// import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/event/:id" element={<EventDetail/>} />
          <Route path="/tickets/:id" element={<TicketPage/>} />
          <Route path="/payment/:id" element={<PaymentPage/> }/>
          <Route path="/faq" element={<FaQues/> }/>
          <Route path="/confirmation" element={<Confirmation/> }/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
