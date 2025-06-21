import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import EventDetail from "./pages/EventDetails";
import TicketPage from "./pages/TicketsPage";
import PaymentPage from "./pages/PaymentPage";
import Confirmation from "./pages/Confirmation";
import FaQues from "./pages/faq";
import ContactUs from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyTickets from "./pages/MyTickets";
import Footer from "./components/Footer";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoutes";
import CreateEvent from "./pages/admin/CreateEvents";

const App = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white">
      <Toaster position="top-center" reverseOrder={false} />
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
        <Route path="/admin/create-event" element={<CreateEvent />} />
          <Route path="/admin/dashboard" element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
