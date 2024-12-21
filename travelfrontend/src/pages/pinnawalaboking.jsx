import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for routing
import pinnawala from "../images/pinnawala.jpeg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ele from "../videos/ele.mp4";
import pinna1 from "../images/pinna1.jpg";
import pinna2 from "../images/pinna2.jpg";
import pinna3 from "../images/pinna3.jpg";
import pinna4 from "../images/pinna4.jpg";
import pinna5 from "../images/pinna5.jpg";

const PinnawalaBooking = () => {
  const [partySize, setPartySize] = useState(1);
  const [tourDate, setTourDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [guidename, setGuidename] = useState("");
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();  // Hook for navigation

  const pricePerPerson = 100; // Price per person in USD
  const totalCost = partySize * pricePerPerson;

  // Increment and decrement party size
  const incrementPartySize = () => setPartySize(partySize + 1);
  const decrementPartySize = () => {
    if (partySize > 1) setPartySize(partySize - 1);
  };

  // Add a booking
  const handleBookingRequest = async () => {
    const bookingData = {
      total: totalCost,
      partysize: partySize,
      tourdate: tourDate,
      time: startTime,
      guidename: guidename,
    };

    try {
      const response = await fetch("http://localhost:8081/Guide/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        setBookingStatus("Booking added successfully!");
        setBookings([...bookings, result]); // Update the booking list
        console.log('Booking added with id:', result._id);
        navigate(`/bookingdetails/${result._id}`);  // Navigate to booking details page after success
      } else {
        setBookingStatus("Failed to add booking.");
        console.error("Add booking error:", response.statusText);
      }
    } catch (error) {
      setBookingStatus("An error occurred while adding the booking.");
      console.error("Error:", error);
    }
  };

  // Select a booking to update or delete
  const selectBooking = (id) => {
    setBookingId(id);
    const selectedBooking = bookings.find((booking) => booking._id === id);
    if (selectedBooking) {
      setPartySize(selectedBooking.partysize);
      setTourDate(selectedBooking.tourdate);
      setStartTime(selectedBooking.time);
      setGuidename(selectedBooking.guidename);
    }
  };

  return (
    
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Header/>
      {/* Pinnawala Booking Section */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
        <div style={{ flex: 2 }}>
        <video
  src={ele}
  alt="Pinnawala"
  style={{
    width: "100%",
    borderRadius: "12px",
    marginBottom: "20px",
    objectFit: "cover",
  }}
  controls
  autoplay
  loop
/>

          <h2 style={{ margin: "10px 0" }}>Pinnawala Elephant Orphanage</h2>
          <p>Explore the natural habitat of elephants and witness their routines in this 8-hour tour.</p>
        </div>

        <div
          style={{
            flex: 1,
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ color: "#28a745", marginBottom: "20px" }}>${totalCost} USD</h3>

          <label>Party Size:</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <button onClick={decrementPartySize} style={{ padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}>-</button>
            <span>{partySize}</span>
            <button onClick={incrementPartySize} style={{ padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}>+</button>
          </div>

          <label>Tour Date:</label>
          <input
            type="date"
            value={tourDate}
            onChange={(e) => setTourDate(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

<label>Choose a Guide:</label>
<select
  value={guidename}
  onChange={(e) => setGuidename(e.target.value)}
  style={{
    width: "100%",
    padding: "8px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  }}
>
  <option value="" disabled>
    Select a guide
  </option>
  <option value="Nimal D Rathnayaka">Nimal D Rathnayaka</option>
</select>

          <button
            onClick={handleBookingRequest}
            style={{
              width: "100%",
              background: "#28a745",
              color: "#fff",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "10px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Add Booking
          </button>
        </div>
      </div>

      {/* Booking List */}
      <div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                width: "250px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <p>Party Size: {booking.partysize}</p>
              <p>Tour Date: {booking.tourdate}</p>
              <p>Start Time: {booking.time}</p>
              <p>Guide Name:{booking.guidename}</p>
              <button
                onClick={() => selectBooking(booking._id)}
                style={{
                  background: "#007bff",
                  color: "#fff",
                  padding: "8px",
                  borderRadius: "4px",
                  width: "100%",
                  cursor: "pointer",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tour Overview Section */}
      <section style={{ fontFamily: "Arial, sans-serif", padding: "20px", color: "#333" }}>
        <h2 style={{ color: "#c9a063" }}>World's Largest Elephants Orphanage Visit - 6 Hours</h2>
        <p><strong>Overview of your Colombo tour:</strong></p>
        <p>Pinnawala Elephant Orphanage is a renowned orphanage, nursery, and captive breeding facility for wild Asian elephants, situated in Pinnawala Village, 13 kilometers northeast of Kegalle Town in the Sabaragamuwa Province of Sri Lanka. It is home to the world's largest herd of elephants kept as pets.</p>
        <p>This excursion is ideal for nature lovers, families, children, and youth who enjoy watching elephants. You will have the chance to visit this magnificent place, with a guided tour to create unforgettable memories.</p>
        <p>If you have any concerns before the tour, feel free to reach out to me. I offer customized excursions tailored to your preferences. We provide experienced drivers and comfortable vehicles for any group size.</p>
        
        <h3 style={{ color: "#c9a063" }}>Your Colombo tour itinerary</h3>
        <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
          <li><strong>Pick up from the Colombo Port</strong></li>
          <li><strong>Ride to Pinnawala Elephants Orphanage</strong></li>
          <li><strong>Elephants Bathing</strong></li>
          <li><strong>Elephants Feeding</strong></li>
          <li><strong>Traditional Lunch (Optional)</strong></li>
          <li><strong>Spices Gardens visit</strong></li>
          <li><strong>Gem and Jewelry Shopping (Optional)</strong></li>
          <li><strong>Drive back to Colombo</strong></li>
          <li><strong>Drop off at the port</strong></li>
        </ul>
        
        <p style={{ fontWeight: "bold" }}>Please contact me if you have any questions or if you'd like a fully customizable tour based on your needs.</p>
        
        
        <h3 style={{ color: "#c9a063" }}>Customize your tour</h3>
        <p>Contact your local guide to know more!</p>
        
        <h3 style={{ color: "#c9a063" }}>Transportation Details</h3>
        <p><strong>Type:</strong> Private Transportation / <strong>Category:</strong> Van</p>
        <p><strong>2 Pax:</strong> Luxury Car with AC</p>
        <p><strong>2-8 Pax:</strong> Luxury Car with AC</p>
        <p><strong>Above 8 Pax:</strong> Luxury Bus with AC</p>
        
        <h3 style={{ color: "#c9a063" }}>What's Included</h3>
        <ul>
          <li>Value of My time, Vehicle, and fuel</li>
          <li>Travel Insurance</li>
          <li>Private Guide</li>
          <li>Private Transportation</li>
          <li>Pinnawala Entry Ticket</li>
          <li>Private Transportation with Driver</li>
        </ul>
        
        <h3 style={{ color: "#c9a063" }}>What's Extra</h3>
        <ul>
          <li>Personal Expenses</li>
          <li>Food, Drinks, Snacks</li>
        </ul>
        
        <h3 style={{ color: "#c9a063" }}>Meeting Location</h3>
        <p>19 Chaithya Road, Colombo, Western Province, 00100 Sri Lanka (Cruise Port)</p>
        <p>You can request a different meeting location (e.g., your hotel) during the checkout process.</p>
        
        <h3 style={{ color: "#c9a063" }}>Other Details</h3>
        <p><strong>Tour Categories:</strong> Nature, Wildlife, Family</p>
        <p><strong>Languages:</strong> Fluent in English, Conversational in German, Basic Japanese</p>
      </section>
      <section style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" }}>
  <h2 style={{ color: "#c9a063", textAlign: "center", marginBottom: "20px" }}>Pinnawala Elephant Orphanage Gallery</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      justifyItems: "center",
      marginBottom: "40px",
    }}
  >
    {/* Image 1 */}
    <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
      <img
        src={pinna1} // replace with your image source
        alt="Pinnawala Elephant"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          borderRadius: "8px",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)") }
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: "0",
          transition: "opacity 0.3s ease-in-out",
        }}
        className="overlay"
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Elephants Bathing</p>
      </div>
    </div>

    {/* Image 2 */}
    <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
      <img
        src={pinna2} // replace with your image source
        alt="Pinnawala Elephant"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          borderRadius: "8px",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)") }
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: "0",
          transition: "opacity 0.3s ease-in-out",
        }}
        className="overlay"
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Elephants Feeding</p>
      </div>
    </div>

    {/* Image 3 */}
    <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
      <img
        src={pinna3} // replace with your image source
        alt="Pinnawala Elephant"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          borderRadius: "8px",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)") }
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: "0",
          transition: "opacity 0.3s ease-in-out",
        }}
        className="overlay"
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Elephants at Play</p>
      </div>
    </div>
    <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
      <img
        src={pinna4} // replace with your image source
        alt="Pinnawala Elephant"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          borderRadius: "8px",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)") }
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: "0",
          transition: "opacity 0.3s ease-in-out",
        }}
        className="overlay"
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Elephants Bathing</p>
      </div>
    </div>
    <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
      <img
        src={pinna5} // replace with your image source
        alt="Pinnawala Elephant"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          borderRadius: "8px",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)") }
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: "0",
          transition: "opacity 0.3s ease-in-out",
        }}
        className="overlay"
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Elephants at Play</p>
      </div>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default PinnawalaBooking;
