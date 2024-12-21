import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import TravelHome from "./pages/travelhome";
import ColomboDay from "./pages/colomboday";
import Negombolagoontour from "./pages/negombolagoontour";
import Sigiriya from "./pages/sigiriya";
import Yala from "./pages/yala";
import GuideCard from "./pages/bookguide";
import PinnawalaBooking from "./pages/pinnawalaboking";
import BookingDetailsPage from "./pages/bokkingdetais";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TravelHome />} />
        <Route path="/colomboday" element={< ColomboDay  />} />
        <Route path="/negombolagoontour" element={< Negombolagoontour />} />
        <Route path="/sigiriya" element={< Sigiriya />} />
        <Route path="/yala" element={< Yala />} />
        <Route path="/bookguide" element={<  GuideCard />} />
        <Route path="/pinnawalaboking" element={<  PinnawalaBooking />} />
        <Route path="/bookingdetails/:id" element={<BookingDetailsPage />} />


      </Routes>
    </Router>
  );
}

export default App;
